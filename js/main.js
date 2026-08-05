const TOTAL_PAGES = 20;

const LevelList = document.getElementById("level-list");

function createLevelNavigation() {
    for (let page = 1; page <= TOTAL_PAGES; page++) {
        const button = document.createElement("button");
        button.className = "level-item";

        if (page === 1) {
            button.classList.add("unlocked");
            button.textContent = `Page ${page}`;
        } else {
            button.classList.add("locked");
            button.innerHTML = `
                <img src='assets/ui/lock.png" alt="">
                <span>Page ${Page}</span>
                `;
        }
        levelList.appendChild(button);
    }
}

createLevelNavigation();