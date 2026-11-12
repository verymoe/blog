// Enhance the server-rendered calendar; every record remains reachable without JS.
function initJournalCalendar() {
    const calendar = document.querySelector<HTMLElement>('[data-journal-calendar]');
    if (!calendar || calendar.dataset.initialized) return;
    const years = [...calendar.querySelectorAll<HTMLElement>('[data-journal-year]')];
    const yearLinks = [...calendar.querySelectorAll<HTMLAnchorElement>('[data-journal-year-link]')];
    const records = [...calendar.querySelectorAll<HTMLElement>('[data-journal-records]')];
    const dialog = calendar.querySelector<HTMLDialogElement>('[data-journal-dialog]')!;
    const content = dialog.querySelector<HTMLElement>('[data-journal-dialog-content]')!;
    const hover = calendar.querySelector<HTMLElement>('[data-journal-hover]')!;
    let hoverDate = '';
    let hoverTimer: number | undefined;
    const hideHover = () => {
        clearTimeout(hoverTimer);
        if (typeof hover.hidePopover === 'function' && hover.matches(':popover-open')) hover.hidePopover();
        hover.hidden = true;
        hoverDate = '';
    };
    const deferHideHover = () => { hoverTimer = window.setTimeout(hideHover, 180); };
    const positionHover = (anchor: DOMRect) => {
        const gap = 10, edge = 12;
        const rect = hover.getBoundingClientRect();
        const width = document.documentElement.clientWidth;
        const left = anchor.left + anchor.width / 2 - rect.width / 2;
        const top = anchor.bottom + gap + rect.height > innerHeight - edge
            ? anchor.top - rect.height - gap : anchor.bottom + gap;
        hover.style.left = `${Math.max(edge, Math.min(left, width - rect.width - edge))}px`;
        hover.style.top = `${Math.max(edge, Math.min(top, innerHeight - rect.height - edge))}px`;
    };
    const showHover = (date: string, event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || dialog.open) return;
        clearTimeout(hoverTimer);
        const source = records.find(section => section.dataset.journalRecords === date);
        if (!source) return;
        if (hoverDate !== date) {
            hover.replaceChildren(...Array.from(source.children, child => child.cloneNode(true)));
            hoverDate = date;
        }
        hover.hidden = false;
        if (typeof hover.showPopover === 'function' && !hover.matches(':popover-open')) hover.showPopover();
        positionHover((event.currentTarget as HTMLElement).getBoundingClientRect());
    };
    hover.addEventListener('pointerenter', () => clearTimeout(hoverTimer));
    hover.addEventListener('pointerleave', deferHideHover);
    hover.addEventListener('focusin', () => clearTimeout(hoverTimer));
    hover.addEventListener('focusout', event => {
        if (!hover.contains(event.relatedTarget as Node)) deferHideHover();
    });
    const selectYear = (year: string) => {
        hideHover();
        if (!years.some(section => section.dataset.journalYear === year)) return;
        years.forEach(section => { section.hidden = section.dataset.journalYear !== year; });
        yearLinks.forEach(link => {
            if (link.dataset.journalYearLink === year) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    };
    const showRecords = (date: string) => {
        const source = records.find(section => section.dataset.journalRecords === date);
        if (!source || typeof dialog.showModal !== 'function') return false;
        selectYear(date.slice(0, 4));
        content.replaceChildren(...Array.from(source.children, child => child.cloneNode(true)));
        content.querySelector('h2')!.id = 'journal-dialog-date';
        if (!dialog.open) dialog.showModal();
        return true;
    };
    yearLinks.forEach(link => link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (dialog.open) dialog.close();
        selectYear(link.dataset.journalYearLink!);
        history.replaceState(null, '', link.hash);
    }));
    calendar.querySelectorAll<HTMLAnchorElement>('[data-journal-day]').forEach(link => {
        link.addEventListener('pointerenter', event => showHover(link.dataset.journalDay!, event));
        link.addEventListener('pointerleave', deferHideHover);
        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            if (showRecords(link.dataset.journalDay!)) {
                event.preventDefault();
                history.replaceState(null, '', link.hash);
            }
        });
    });
    dialog.querySelector('[data-journal-close]')!.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
        if (dialog.open || !/^#journal-date-/.test(location.hash)) return;
        const active = years.find(section => !section.hidden)!;
        history.replaceState(null, '', `#journal-year-${active.dataset.journalYear}`);
    });
    const followHash = () => {
        const hash = location.hash;
        const year = /^#journal-year-(\d{4})$/.exec(hash);
        const date = /^#journal-date-(\d{4}-\d{2}-\d{2})$/.exec(hash);
        if (date && showRecords(date[1])) return;
        if (dialog.open) dialog.close();
        if (year) selectYear(year[1]);
    };
    selectYear(years[0].dataset.journalYear!);
    calendar.classList.add('is-ready');
    // Older browsers keep the anchor-to-record fallback instead of hiding it.
    if (typeof dialog.showModal === 'function') records.forEach(section => { section.hidden = true; });
    calendar.dataset.initialized = 'true';
    window.addEventListener('hashchange', followHash);
    window.addEventListener('resize', hideHover);
    window.addEventListener('scroll', hideHover, { passive: true });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') hideHover();
    });
    followHash();
    yearLinks.find(link => link.hasAttribute('aria-current'))?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initJournalCalendar, { once: true });
else initJournalCalendar();
export {};
