import { createLevelNavigation } from "./menu.js";
import{ showPage } from "./comic.js";

function handlePageSelect(page){
    showPage(page);
}

createLevelNavigation(handlePageSelect);