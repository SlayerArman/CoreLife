import {pages} from "./pages.js"

export function createLevelNavigation(onPageSelect, onLockedPage) {
    const levelList = document.getElementById("level-list");
    levelList.innerHTML = "";

    for (const page of pages) {
        const button = document.createElement("button");
        button.className = "level-item";

        if (page.unlocked) {
            button.classList.add("unlocked");
            button.textContent = page.title;
            button.addEventListener("click", () => {
                onPageSelect(page);
            });
        } else {
            button.classList.add("locked");
            button.innerHTML = `
                <img src="assets/ui/lock.png" alt="">
                <span>${page.title}</span>
            `;
                button.addEventListener("click", () => {
                    onLockedPage(page);
                });
        }
        levelList.appendChild(button);
    }
}