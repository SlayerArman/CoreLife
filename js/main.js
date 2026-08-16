import { createLevelNavigation, unlockNextPage } from "./menu.js";
import{ showPage } from "./comic.js";
import { showLockedPageOverlay } from "./overlay.js";
import { startGame } from "./game.js";
import { pages } from "./pages.js";

function handlePageSelect(page){
    showPage(page);
}

function handleLockedPage(page){
    const requiredLevel = page.level - 1;
    const levelPage = pages.find(item => item.level === requiredLevel);

    if (!levelPage){
        console.error("required level not found:", requiredLevel);
        return;
    }

   showLockedPageOverlay(
    page,
    requiredLevel,
    () => {
        startGame(
            levelPage,
            handleLevelComplete);
        }
   );
}

function handlePlayLevel(page){
    console.log("Complete Level:", page.level);

    unlockNextPage(page.level);

    createLevelNavigation(handlePageSelect, handleLockedPage);
}

createLevelNavigation(handlePageSelect, handleLockedPage)

function handleLevelComplete(page){
    console.log(
        "Complete level:",
        page.level
    );
    unlockNextPage(page.level);

    createLevelNavigation(handlePageSelect, handleLockedPage);
}

createLevelNavigation(handlePageSelect, handleLockedPage);