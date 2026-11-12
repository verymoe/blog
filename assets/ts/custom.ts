import "./journal";
import "./related-content";

// Stack v4.0.3 custom entry. Native port of Moedog's waifu controls; no jQuery.
interface Live2DVariant { name: string; path: string }
interface Live2DModel { id: string; name: string; variants: Live2DVariant[] }
interface Live2DManifest { version: number; models: Live2DModel[] }
interface Live2DPosition { x: number; y: number }
interface Live2DPreference { model?: string; variant?: number; hidden?: boolean; position?: Live2DPosition }

function initLive2D() {
    const root = document.querySelector<HTMLElement>('#shiro-live2d');
    if (!root || root.dataset.initialized) return;
    root.dataset.initialized = 'true';
    const widget = root.querySelector<HTMLElement>('.shiro-live2d__widget')!;
    const stage = root.querySelector<HTMLElement>('.shiro-live2d__stage')!;
    const interact = root.querySelector<HTMLButtonElement>('.shiro-live2d__interact')!;
    const message = root.querySelector<HTMLElement>('.shiro-live2d__message')!;
    const restore = root.querySelector<HTMLButtonElement>('[data-action="restore"]')!;
    const picker = root.querySelector<HTMLElement>('.shiro-live2d__picker')!;
    const pickerButton = root.querySelector<HTMLButtonElement>('[data-action="models"]')!;
    const modelSelect = root.querySelector<HTMLSelectElement>('#live2d-model')!;
    const outfitSelect = root.querySelector<HTMLSelectElement>('#live2d-outfit')!;
    const outfitButton = root.querySelector<HTMLButtonElement>('[data-action="outfit"]')!;
    const captureButton = root.querySelector<HTMLButtonElement>('[data-action="capture"]')!;
    const base = new URL(root.dataset.assetBase!);
    const home = new URL(root.dataset.home || '/', document.baseURI);
    const desktop = matchMedia(`(min-width: ${Number(root.dataset.minWidth) || 1280}px) and (min-height: 600px) and (hover: hover) and (pointer: fine)`);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const preferenceKey = 'shiro-live2d-v1';
    let preference: Live2DPreference = {};
    try { preference = JSON.parse(localStorage.getItem(preferenceKey) || '{}') || {}; } catch { /* Optional site preferences. */ }
    let hidden = reducedMotion.matches || preference.hidden === true;
    const savedPosition = preference.position;
    let floating: Live2DPosition | undefined = savedPosition && Number.isFinite(savedPosition.x) && Number.isFinite(savedPosition.y)
        ? { x: Math.max(0, Math.min(1, savedPosition.x)), y: Math.max(0, Math.min(1, savedPosition.y)) } : undefined;
    let models: Live2DModel[] = [];
    let current: Live2DModel | undefined;
    let variant = 0;
    let frame: HTMLIFrameElement | undefined;
    let loadTimer = 0, messageTimer = 0, resizeTimer = 0, quoteTimer = 0, captureTimer = 0, closeTimer = 0, roamTimer = 0;
    let generation = 0, captureId = 0, activeCapture = 0, taps = 0;
    let pending: Promise<void> | undefined;
    let quoteRequest: AbortController | undefined;
    let scheduled = false, hasSpace = false, failed = false;
    let announcement = '', lastSpeech = 0;
    let drag: { id: number; x: number; y: number; left: number; top: number; moved: boolean } | undefined;
    const pick = (items: string[]) => items[Math.floor(Math.random() * items.length)];
    const save = () => {
        try { localStorage.setItem(preferenceKey, JSON.stringify({ model: current?.id || preference.model, variant, hidden, position: floating })); } catch { /* Private mode can deny storage. */ }
    };
    const say = (text: string, duration = 6000) => {
        clearTimeout(messageTimer);
        message.getAnimations().forEach(animation => animation.cancel());
        message.textContent = text;
        message.hidden = false;
        lastSpeech = Date.now();
        if (!reducedMotion.matches) message.animate([{ opacity: 1 }, { opacity: 1, offset: .75 }, { opacity: 0 }], { duration, fill: 'forwards' });
        messageTimer = window.setTimeout(() => { message.hidden = true; }, duration);
    };
    const closePicker = () => {
        picker.hidden = true;
        pickerButton.setAttribute('aria-expanded', 'false');
    };
    const stopQuotes = () => {
        clearTimeout(quoteTimer);
        quoteRequest?.abort();
        quoteRequest = undefined;
    };
    const endDrag = () => {
        const previous = drag;
        drag = undefined;
        delete root.dataset.dragging;
        if (previous && interact.hasPointerCapture(previous.id)) interact.releasePointerCapture(previous.id);
        if (previous?.moved) save();
    };
    const destroyFrame = () => {
        generation++;
        clearTimeout(loadTimer);
        clearTimeout(captureTimer);
        activeCapture = 0;
        captureButton.disabled = true;
        stopQuotes();
        endDrag();
        frame?.remove();
        frame = undefined;
        stage.removeAttribute('aria-busy');
    };
    // Keep the bubble, canvas and tools in the viewport. Store a viewport-relative position.
    // Chromium can include Stack's stable scrollbar gutter in clientWidth.
    const viewport = () => ({ width: Math.min(document.documentElement.clientWidth, document.documentElement.getBoundingClientRect().width), height: document.documentElement.clientHeight });
    const bounds = () => ({ x: Math.max(4, viewport().width - root.offsetWidth - 4), y: Math.max(24, viewport().height - root.offsetHeight - 8) });
    const place = (left: number, top: number, remember = false) => {
        const limit = bounds();
        left = Math.max(4, Math.min(limit.x, left));
        top = Math.max(24, Math.min(limit.y, top));
        root.style.setProperty('--live2d-left', `${left}px`);
        root.style.setProperty('--live2d-top', `${top}px`);
        root.style.setProperty('--live2d-picker-left', left + root.offsetWidth + 240 > viewport().width ? '-240px' : 'calc(100% + 10px)');
        if (!picker.hidden) picker.style.bottom = `${Math.min(0, top + root.offsetHeight - picker.offsetHeight - 8)}px`;
        if (remember) floating = { x: (left - 4) / (limit.x - 4 || 1), y: (top - 24) / (limit.y - 24 || 1) };
    };
    const position = () => {
        const sidebar = document.querySelector<HTMLElement>('.left-sidebar');
        const menu = [...document.querySelectorAll<HTMLElement>('#main-menu > li:not(.menu-bottom-section)')];
        const bottom = document.querySelector<HTMLElement>('.menu-bottom-section')?.getBoundingClientRect();
        const rail = sidebar?.getBoundingClientRect();
        const ceiling = Math.max(menu.at(-1)?.getBoundingClientRect().bottom ?? 0, sidebar?.querySelector('header')?.getBoundingClientRect().bottom ?? 0);
        const floor = Math.min(bottom?.top ?? innerHeight - 16, innerHeight - 16);
        const height = floating ? Math.min(250, innerHeight - 100) : Math.min(250, floor - ceiling - 64);
        hasSpace = height >= 155 && !!rail && rail.left >= 0;
        if (!hasSpace || !rail) return;
        root.style.setProperty('--live2d-height', `${height}px`);
        root.style.setProperty('--live2d-width', `${height * .88}px`);
        const limit = bounds();
        if (floating) place(4 + floating.x * (limit.x - 4), 24 + floating.y * (limit.y - 24));
        else place(Math.max(4, rail.left + (rail.width - height * .88 - 10) / 2), floor - height - 32);
    };
    const canShow = () => desktop.matches && hasSpace && !document.hidden;
    const post = (data: object) => frame?.contentWindow?.postMessage(data, base.origin);
    const greeting = () => {
        if (location.pathname.replace(/\/$/, '') !== home.pathname.replace(/\/$/, '')) {
            const title = (root.dataset.pageTitle || document.title).slice(0, 90);
            let from = '';
            try { const referrer = new URL(document.referrer); if (referrer.hostname !== location.hostname) from = `来自 ${referrer.hostname} 的朋友，`; } catch { /* Direct visit. */ }
            return `${from}欢迎阅读「${title}」。`;
        }
        const hour = new Date().getHours();
        if (hour < 6) return '夜深了，记得早点休息。明天也会是美好的一天～';
        if (hour < 9) return '早上好！一日之计在于晨，美好的一天就要开始了。';
        if (hour < 12) return '上午好！不要久坐，多起来走动走动哦！';
        if (hour < 14) return '中午了，忙了一个上午，记得好好吃午饭！';
        if (hour < 18) return '下午好！来杯茶，休息一下再继续吧～';
        if (hour < 22) return '晚上好，今天过得怎么样？';
        return '已经这么晚了呀，早点休息吧，晚安～';
    };
    const showHitokoto = async (manual = true) => {
        if (!canShow() || hidden || !frame || quoteRequest) return;
        if (!manual && (Date.now() - lastSpeech < 8000 || !picker.hidden || drag)) return;
        const controller = new AbortController();
        quoteRequest = controller;
        const timeout = window.setTimeout(() => controller.abort(), 8000);
        if (manual) say('让我想想，这次说些什么好呢？');
        try {
            const response = await fetch(root.dataset.hitokoto!, { signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
            if (!response.ok) throw new Error('Hitokoto unavailable');
            const text = (await response.text()).trim();
            if (!text || text.startsWith('<')) throw new Error('Invalid Hitokoto response');
            if (quoteRequest === controller && canShow() && !hidden) say(text.slice(0, 160), 10000);
        } catch {
            if (quoteRequest === controller && canShow() && !hidden) say(pick(['一言暂时没连上，不过我会在这里陪你。', '今天也要记得抬头看看天空呀。', '慢慢来，总会遇到让你开心的小事。']), 6000);
        } finally {
            clearTimeout(timeout);
            if (quoteRequest === controller) quoteRequest = undefined;
        }
    };
    const scheduleQuote = () => {
        clearTimeout(quoteTimer);
        quoteTimer = window.setTimeout(async () => {
            await showHitokoto(false);
            if (frame && !hidden && canShow()) scheduleQuote();
        }, 25000);
    };
    const loadManifest = async () => {
        if (models.length) return;
        if (!pending) pending = (async () => {
            const response = await fetch(new URL('manifest.json', base));
            if (!response.ok) throw new Error(`Manifest: ${response.status}`);
            const manifest: Live2DManifest = await response.json();
            if (manifest.version !== 1 || !Array.isArray(manifest.models)) throw new Error('Invalid Live2D manifest');
            models = manifest.models.filter(m => m.id && m.name && Array.isArray(m.variants) && m.variants.length);
            if (!models.length) throw new Error('No Live2D models');
            modelSelect.replaceChildren(...models.map(m => new Option(m.name, m.id)));
            root.querySelector('.shiro-live2d__count')!.textContent = `${models.length} 个角色`;
            current = models.find(m => m.id === preference.model) || models.find(m => m.id === root.dataset.defaultModel) || models[0];
            const savedVariant = Number(preference.variant);
            variant = Number.isInteger(savedVariant) && savedVariant >= 0 && savedVariant < current.variants.length ? savedVariant : 0;
            updateSelects();
        })().finally(() => { pending = undefined; });
        await pending;
    };
    const updateSelects = () => {
        if (!current) return;
        modelSelect.value = current.id;
        outfitSelect.replaceChildren(...current.variants.map((v, i) => new Option(v.name, String(i))));
        outfitSelect.value = String(variant);
        outfitSelect.disabled = outfitButton.disabled = current.variants.length < 2;
    };
    const showFailure = () => {
        failed = true;
        destroyFrame();
        widget.hidden = !current;
        root.dataset.failed = 'true';
        if (current) say('这个角色暂时加载失败，可以换一个角色或点击右侧重试。', 12000);
        restore.hidden = !desktop.matches;
        restore.title = restore.ariaLabel = '重试看板娘';
    };
    const render = (text = greeting()) => {
        if (!current || hidden || !canShow()) return;
        destroyFrame();
        announcement = text;
        failed = false;
        delete root.dataset.failed;
        widget.hidden = false;
        restore.hidden = true;
        stage.setAttribute('aria-busy', 'true');
        const url = new URL('renderer.html', base);
        url.searchParams.set('model', current.variants[variant].path);
        url.searchParams.set('parent', location.origin);
        frame = document.createElement('iframe');
        frame.title = `${current.name} Live2D`;
        frame.tabIndex = -1;
        frame.setAttribute('aria-hidden', 'true');
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.src = url.href;
        frame.addEventListener('error', showFailure, { once: true });
        stage.replaceChildren(frame);
        loadTimer = window.setTimeout(showFailure, 25000);
        save();
    };
    const activate = async () => {
        const ticket = generation;
        try {
            await loadManifest();
            if (ticket === generation && !hidden && canShow() && !frame) render();
        } catch (error) {
            console.warn('[Live2D] Unable to load model list', error);
            if (ticket === generation) showFailure();
        }
    };
    const refresh = () => {
        root.hidden = !desktop.matches;
        position();
        root.hidden = !desktop.matches || !hasSpace;
        if (!canShow() || hidden) {
            destroyFrame();
            widget.hidden = true;
            restore.hidden = !desktop.matches;
            restore.title = restore.ariaLabel = hidden ? '显示看板娘' : '展开看板娘';
            closePicker();
            return;
        }
        restore.hidden = failed ? false : true;
        if (!failed && !frame) void activate();
    };
    const resetPosition = () => {
        delete root.dataset.roaming;
        clearTimeout(roamTimer);
        floating = undefined;
        position();
        save();
        say('我回到左栏啦，需要时可以再把我拖出来～');
    };
    const tap = (x = .5, y = .5) => {
        if (!frame || hidden || stage.hasAttribute('aria-busy') || failed) return;
        post({ type: 'live2d:tap', x, y });
        taps++;
        closePicker();
        say(taps > 6 ? pick([`你已经点了我 ${taps} 次啦～`, '我跑呀跑，你找得到我吗？', '休息一下，看看新文章吧～']) : pick(['是……不小心碰到了吧？', '我跑呀跑呀跑～', '喵喵喵？', '来和我一起逛逛博客吧！']));
        if (!reducedMotion.matches) {
            root.getBoundingClientRect();
            root.dataset.roaming = 'true';
            const limit = bounds();
            place(4 + limit.x * (.1 + Math.random() * .8), 24 + (limit.y - 24) * (.1 + Math.random() * .8), true);
            save();
            clearTimeout(roamTimer);
            roamTimer = window.setTimeout(() => { delete root.dataset.roaming; }, 550);
        }
    };
    interact.addEventListener('pointerdown', event => {
        if (event.button !== 0 || !event.isPrimary || hidden) return;
        const rect = root.getBoundingClientRect();
        clearTimeout(roamTimer);
        delete root.dataset.roaming;
        place(rect.left, rect.top);
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, moved: false };
        interact.setPointerCapture(event.pointerId);
    });
    interact.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (!drag.moved && Math.hypot(dx, dy) < 5) return;
        drag.moved = true;
        root.dataset.dragging = 'true';
        closePicker();
        place(drag.left + dx, drag.top + dy, true);
    });
    interact.addEventListener('pointerup', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const moved = drag.moved;
        const rect = interact.getBoundingClientRect();
        endDrag();
        if (!moved) tap((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height);
    });
    interact.addEventListener('pointercancel', endDrag);
    interact.addEventListener('lostpointercapture', endDrag);
    interact.addEventListener('click', event => { if (event.detail === 0) tap(); });
    interact.addEventListener('keydown', event => {
        const delta = event.shiftKey ? 30 : 10;
        const offsets: Record<string, [number, number]> = { ArrowLeft: [-delta, 0], ArrowRight: [delta, 0], ArrowUp: [0, -delta], ArrowDown: [0, delta] };
        if (event.key === 'Home') { event.preventDefault(); resetPosition(); }
        if (!offsets[event.key]) return;
        event.preventDefault();
        delete root.dataset.roaming;
        const rect = root.getBoundingClientRect(), [x, y] = offsets[event.key];
        place(rect.left + x, rect.top + y, true);
        save();
    });
    root.addEventListener('click', event => {
        const action = (event.target as Element).closest<HTMLElement>('[data-action]')?.dataset.action;
        if (!action) return;
        if (action === 'close') {
            hidden = true;
            save();
            stopQuotes();
            closePicker();
            say('愿你有一天能与重要的人重逢。', 2000);
            clearTimeout(closeTimer);
            closeTimer = window.setTimeout(() => { refresh(); restore.focus({ preventScroll: true }); }, 1000);
        }
        if (action === 'restore') { clearTimeout(closeTimer); hidden = false; failed = false; save(); refresh(); say('你的小可爱突然出现～'); }
        if (action === 'dismiss') { closePicker(); pickerButton.focus(); }
        if (action === 'models' && !hidden) {
            picker.hidden = !picker.hidden;
            pickerButton.setAttribute('aria-expanded', String(!picker.hidden));
            if (!picker.hidden) { const rect = root.getBoundingClientRect(); place(rect.left, rect.top); modelSelect.focus(); }
        }
        if (action === 'reset') resetPosition();
        if (action === 'quote') void showHitokoto();
        if (action === 'capture' && frame && !captureButton.disabled) {
            activeCapture = ++captureId;
            captureButton.disabled = true;
            post({ type: 'live2d:capture', id: activeCapture });
            clearTimeout(captureTimer);
            captureTimer = window.setTimeout(() => { activeCapture = 0; captureButton.disabled = false; say('照片暂时没有拍好，请再试一次。'); }, 8000);
        }
        if (action === 'outfit' && current) { variant = (variant + 1) % current.variants.length; updateSelects(); render('我的新衣服好看吗？'); }
        if (action === 'random' && models.length > 1) {
            const other = models.filter(m => m !== current);
            current = other[Math.floor(Math.random() * other.length)];
            variant = 0; updateSelects(); render(`我又回来了～我是 ${current.name}。`);
        }
    });
    modelSelect.addEventListener('change', () => {
        current = models.find(m => m.id === modelSelect.value)!;
        variant = 0; updateSelects(); render(`我又回来了～我是 ${current.name}。`);
    });
    outfitSelect.addEventListener('change', () => { variant = Number(outfitSelect.value); render('我的新衣服好看吗？'); });
    document.addEventListener('click', event => { if (!root.contains(event.target as Node)) closePicker(); });
    root.addEventListener('keydown', event => { if (event.key === 'Escape' && !picker.hidden) { closePicker(); pickerButton.focus(); } });
    window.addEventListener('message', event => {
        if (!frame || event.source !== frame.contentWindow || event.origin !== base.origin) return;
        const data = event.data;
        if (data?.type === 'live2d:ready') {
            clearTimeout(loadTimer);
            stage.removeAttribute('aria-busy');
            captureButton.disabled = false;
            say(announcement, 8000);
            scheduleQuote();
        } else if (data?.type === 'live2d:error') showFailure();
        else if (data?.type === 'live2d:capture' && activeCapture && data.id === activeCapture) {
            clearTimeout(captureTimer);
            activeCapture = 0;
            captureButton.disabled = false;
            if (typeof data.png !== 'string' || !data.png.startsWith('data:image/png;base64,') || data.png.length > 12000000) { say('照片暂时没有拍好，请再试一次。'); return; }
            const link = document.createElement('a');
            link.href = data.png;
            link.download = `${current?.id || 'live2d'}-${variant + 1}.png`;
            document.body.append(link);
            link.click();
            link.remove();
            say('照好了，是不是很可爱呢？');
        } else if (data?.type === 'live2d:capture-error' && data.id === activeCapture) {
            clearTimeout(captureTimer);
            activeCapture = 0;
            captureButton.disabled = false;
            say('照片暂时没有拍好，请再试一次。');
        }
    });
    let pointerQueued = false;
    document.addEventListener('pointermove', event => {
        if (!frame || pointerQueued || reducedMotion.matches || drag) return;
        pointerQueued = true;
        requestAnimationFrame(() => {
            pointerQueued = false;
            if (!frame) return;
            const rect = interact.getBoundingClientRect();
            post({ type: 'live2d:pointer', x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height });
        });
    }, { passive: true });
    // Adapt the original theme-specific prompts to Stack and Twikoo.
    const hint = (target: Element) => {
        const tool = target.closest<HTMLElement>('[data-tip]');
        if (tool) return tool.dataset.tip;
        if (target.closest('.shiro-live2d__interact')) return pick(['你要干嘛呀？', '喵喵喵？', '按住我就可以拖动啦～']);
        const title = target.closest<HTMLElement>('.article-title a');
        if (title) return `要看看「${title.textContent?.trim().slice(0, 60)}」吗？`;
        if (target.closest('.search-form, #search-input')) return '找不到想要的？试试搜索吧！';
        if (target.closest('#main-menu a')) return '想去哪里逛逛呢？';
        if (target.closest('#dark-mode-toggle')) return '换个明暗模式，照顾好眼睛哦。';
        if (target.closest('.article-content a')) return '要去这个链接看看吗？';
        if (target.closest('.pagination a')) return '继续看看下一页的故事吧～';
        if (target.closest('.tk-submit, .tk-send')) return '要说点什么吗？记得认真填写哦～';
        if (target.closest('.site-footer a')) return '这里还有更多关于博客的信息哦。';
        return undefined;
    };
    let lastHintTarget: Element | null = null;
    document.addEventListener('pointerover', event => {
        if (!frame || hidden || drag || !picker.hidden || !(event.target instanceof Element)) return;
        const target = event.target.closest('[data-tip], .shiro-live2d__interact, .article-title a, .search-form, #search-input, #main-menu a, #dark-mode-toggle, .article-content a, .pagination a, .tk-submit, .tk-send, .site-footer a');
        if (!target || target === lastHintTarget) return;
        lastHintTarget = target;
        const text = hint(target);
        if (text) say(text);
    });
    document.addEventListener('pointerout', event => {
        if (lastHintTarget && (!(event.relatedTarget instanceof Node) || !lastHintTarget.contains(event.relatedTarget))) lastHintTarget = null;
    });
    document.addEventListener('focusin', event => {
        if (!frame || hidden || !(event.target instanceof Element)) return;
        const target = event.target;
        if (target.matches('input[type="search"], #search-input')) say('输入想搜索的关键词，按 Enter 键就可以搜索啦！');
        else if (target.matches('.tk-input textarea, .tk-content textarea')) say('把想说的话写在这里吧～');
        else if (target.closest('[data-tip]')) { const text = hint(target); if (text) say(text); }
    });
    document.addEventListener('copy', () => { if (frame && !hidden) say('你都复制了些什么呀，转载要记得加上出处哦。', 8000); });
    window.addEventListener('blur', endDrag);
    window.addEventListener('resize', () => { endDrag(); clearTimeout(resizeTimer); resizeTimer = window.setTimeout(refresh, 150); });
    desktop.addEventListener('change', refresh);
    reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) { hidden = true; refresh(); } });
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('pagehide', () => { clearTimeout(closeTimer); clearTimeout(roamTimer); destroyFrame(); });
    window.addEventListener('pageshow', event => { if (event.persisted) refresh(); });
    const schedule = () => {
        if (scheduled) return;
        scheduled = true;
        window.setTimeout(() => { void document.fonts.ready.then(refresh); }, 800);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
}
initLive2D();
