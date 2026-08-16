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

export function unlockNextPage(level){
    console.log("Unlocking page after level:", level);

    const nextPage = pages.find(
            page => page.level === level + 1);

    if (!nextPage){
        console.log("No next page found.");
        return;
    }

    nextPage.unlocked = true;

    const progress =
        JSON.parse(localStorage.getItem("coreLifeProgress")) || {};

    progress[nextPage.level] = true;
    localStorage.setItem("coreLifeProgress",
        JSON.stringify(progress));

    console.log("Unlocked:",
        nextPage.title,
        nextPage.unlocked);
}