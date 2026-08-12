import { createLevelNavigation } from "./menu.js";
import{ showPage } from "./comic.js";

function handlePageSelect(page){
    showPage(page);
}

function handleLockedPage(page){
    console.log(
        `${page.title} is locked. Complete Level ${page.level} to unlock it.`
    );
}
createLevelNavigation(handlePageSelect, handleLockedPage);