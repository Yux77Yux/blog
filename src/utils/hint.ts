export const hintMerge = (message: string) => {
    const globalHint = document.querySelector(".globalHint") as HTMLSpanElement;
    if (!globalHint) return;
    globalHint.style.visibility = "visible";
    globalHint.style.opacity = "1";

    (globalHint.children[0] as HTMLElement).textContent = message;
    const interval = setTimeout(() => {
        clearTimeout(interval);
        globalHint.style.visibility = "hidden";
        globalHint.style.opacity = "0";
        setTimeout(() => {
            (globalHint.children[0] as HTMLElement).textContent = "";
        }, 100);
    }, 1200);
}