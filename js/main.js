import { createLevelNavigation, unlockNextPage } from "./menu.js";
import{ showPage } from "./comic.js";
import { showLockedPageOverlay } from "./overlay.js";
import { startGame } from "./game.js";

function handlePageSelect(page){
    showPage(page);
}

function handleLockedPage(page){
   showLockedPageOverlay(
    page,
    handlePlayLevel
    );
}

function handlePlayLevel(page){
        startGame(page, handleLevelComplete);
}

function handleLevelComplete(page){
    console.log(
        "Complete level:",
        page.level
    );
    unlockNextPage(page.level)

    createLevelNavigation(handlePageSelect, handleLockedPage);
}

createLevelNavigation(handlePageSelect, handleLockedPage);