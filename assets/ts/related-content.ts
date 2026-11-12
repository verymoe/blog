// Progressive enhancement: the native scroll area remains usable without JS.
function initRelatedContent() {
    const root = document.querySelector<HTMLElement>('[data-related-content]');
    if (!root || root.dataset.initialized) return;
    const track = root.querySelector<HTMLElement>('[data-related-scroll]')!;
    const controls = root.querySelector<HTMLElement>('.related-content-controls')!;
    const previous = root.querySelector<HTMLButtonElement>('[data-related-previous]')!;
    const next = root.querySelector<HTMLButtonElement>('[data-related-next]')!;
    const cards = [...track.querySelectorAll<HTMLElement>('article')];
    const update = () => {
        const maximum = track.scrollWidth - track.clientWidth;
        controls.hidden = maximum <= 2;
        previous.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= maximum - 2;
    };
    const move = (direction: number) => {
        const step = cards.length > 1
            ? cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left
            : track.clientWidth;
        track.scrollBy({
            left: direction * step,
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
        });
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', update, { passive: true });
    track.addEventListener('keydown', event => {
        if (event.target !== track || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
        }
    });
    root.classList.add('is-enhanced');
    root.dataset.initialized = 'true';
    update();
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(update).observe(track);
    else window.addEventListener('resize', update);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initRelatedContent, { once: true });
else initRelatedContent();
export {};
