const comicView = document.getElementById("comic-view");

export function showPage(page){
    comicView.innerHTML = `
        <div class="comic-reader">
            <img 
                src="${page.image}"
                alt="Comic Page ${page.id}">
        </div>
    `;
}