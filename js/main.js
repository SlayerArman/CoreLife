import { createLevelNavigation } from "./menu.js";
import{ showPage } from "./comic.js";
import { showLockedPageOverlay } from "./overlay.js";

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
    console.log(
        `Starting Level ${page.level}`
    );
}
createLevelNavigation(handlePageSelect, handleLockedPage);