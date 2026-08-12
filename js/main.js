import { createLevelNavigation } from "./menu.js";
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
        startGame(page);
}

createLevelNavigation(handlePageSelect, handleLockedPage);