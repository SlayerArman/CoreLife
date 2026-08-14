const BOARD_SIZE = 8;
let boardBusy = false;

const elements = [
    {
        id: "fire",
        name: "Fire",
        image: "assets/game/elements/fire.png"
    },
    {
        id: "water",
        name: "Water",
        image: "assets/game/elements/water.png"
    },
    {
        id: "earth",
        name: "Earth",
        image: "assets/game/elements/earth.png"
    },
    {
        id: "air",
        name: "Air",
        image: "assets/game/elements/air.png"
    },
    {
        id: "light",
        name: "Light",
        image: "assets/game/elements/light.png"
    },
    {
        id: "shadow",
        name: "Shadow",
        image: "assets/game/elements/shadow.png"
    }
];

export function startGame(page){
    const gameOverlay = document.createElement("div");
    gameOverlay.className = "game-overlay";

    gameOverlay.innerHTML = `
        <div class="game-window">
            <div class="game-header">
                <h2>
                    Level ${page.level}
                </h2>
                
                <button
                    class="game-exit"
                    type="button">
                    ×
                </button>
            </div>
            
            <div class="game-area">
                <div class="match-board">
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(gameOverlay);

    const board =
        gameOverlay.querySelector(".match-board");

    createBoard(board);

    const exitButton =
        gameOverlay.querySelector(".game-exit");

    exitButton.addEventListener("click", () => {
            gameOverlay.remove();
    });
}

function createBoard(board){
    for (let row = 0; row < BOARD_SIZE; row++){
        for (let column = 0; column < BOARD_SIZE; column++){
            const cell = document.createElement("div");
            cell.className = "board-cell";
            cell.dataset.row = row;
            cell.dataset.column = column;
            const element = getRandomElement();
            const image = document.createElement("img");
            image.src = element.image;
            image.alt = element.name;
            image.className = "game-piece";
            cell.dataset.element = element.id;
            cell.appendChild(image);
            cell.addEventListener("click", () => {
                selectCell(board, cell);
            });
            board.appendChild(cell);
        }
    }
}

function selectCell(board, cell){
    if (boardBusy){
        return;
    }

    const previousCell =
        board.querySelector(".selected");
    
    if (!previousCell){
        cell.classList.add("selected");
        return;
    }

    if (previousCell === cell){
        cell.classList.remove("selected");
        return;
    }

    if (areAdjacent(previousCell, cell)){
        swapCells(previousCell, cell);
    } else {
        previousCell.classList.remove("selected");
        cell.classList.add("selected");
    }
}

function areAdjacent(firstCell, secondCell){
    const firstRow =
        Number(firstCell.dataset.row);
    const firstColumn =
        Number(firstCell.dataset.column);
    const secondRow =
        Number(secondCell.dataset.row);
    const secondColumn =
        Number(secondCell.dataset.column);
    const rowDifference =
        Math.abs(firstRow - secondRow);
    const coliumnDifference =
        Math.abs(firstColumn - secondColumn);
    const horizontal =
        rowDifference === 0 &&
        coliumnDifference === 1;
    const vertical =
        rowDifference === 1 &&
        coliumnDifference === 0;

        return horizontal || vertical;
}

function swapCells(firstCell, secondCell) {
    boardBusy = true;

    firstCell.classList.remove("selected");
    secondCell.classList.remove("selected");

    const firstImage =
        firstCell.querySelector(".game-piece");
    const secondImage =
        secondCell.querySelector(".game-piece");
    const firstRect =
        firstCell.getBoundingClientRect();
    const secondRect =
        secondCell.getBoundingClientRect();

    const xDistance =
        secondRect.left - firstRect.left;
    const yDistance =
        secondRect.top - firstRect.top;

    firstImage.style.transform =
        "translate(0, 0)";
    secondImage.style.transform =
        "translate(0, 0)";

    firstImage.offsetWidth;

    firstImage.style.transform =
        `translate(${xDistance}px, ${yDistance}px)`;
    secondImage.style.transform =
        `translate(${-xDistance}px, ${-yDistance}px)`;

    setTimeout(() => {
        const firstElement =
            firstCell.dataset.element;
        const secondElement =
            secondCell.dataset.element;

        firstCell.dataset.element =
            secondElement;
        secondCell.dataset.element =
            firstElement;

        firstCell.appendChild(secondImage);
        secondCell.appendChild(firstImage);

        firstImage.style.transform = "";
        secondImage.style.transform = "";

        boardBusy = false;
    }, 180);
}

function getRandomElement(){
    const randomIndex =
        Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
}

function getElementImage(elementId){
    const element = 
        elements.find(
                item => item.id === elementId
        );
        return element.image;
}