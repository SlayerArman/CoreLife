const BOARD_SIZE = 8;

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
    const previousCell =
        board.querySelector(".selected");
    if(!previousCell){
        cell.classList.add("selected");
        return;
    }
    if (areAdjacent(previousCell, cell)){
        swapCells(previousCell, cell);
    }
    else {
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

function swapCells(firstCell, secondCell){
    const firstImage =
        firstCell.querySelector(".game-piece");
    const secondImage =
        secondCell.querySelector(".game-piece");
    const firstRow =
        Number(firstCell.dataset.row);
    const firstColumn =
        Number(firstCell.dataset.column);
    const secondRow =
        Number(secondCell.dataset.row);
    const secondColumn =
        Number(secondCell.dataset.column);
    const rowDifference =
        secondRow - firstRow;
    const columnDifference =
        secondColumn - firstColumn;

    if (columnDifference === 1){
        firstImage.classList.add("swap-right");
        secondImage.classList.add("swap-left");
    }

    else if (columnDifference === -1){
        firstImage.classList.add("swap-left");
        secondImage.classList.add("swap-right");
    }

    else if (rowDifference === 1){
        firstImage.classLoist.add("swap-down");
        secondImage.classList.add("swap-up");
    }

    else if (rowDifference === -1){
        firstImage.classList.add("swap-up");
        secondImage.classList.add("swap-down")
    }

    setTimeout(() => {
        const firstElement =
            firstCell.dataset.element;
        const firstSrc =
            firstImage.src;
        const firstAlt =
            firstImage.alt;
        const secondElement =
            secondCell.dataset.element;
        const secondSrc =
            secondCell.Image.src;
        const secondAlt =
            secondImage.alt;

        firstCell.dataset.element =
            secondElement;
        secondCell.dataset.element =
            firstElement;

        firstImage.src = secondSrc;
        firstImage.alt = secondAlt;
        secondImage.src = firstSrc;
        secondImage.alt = firstAlt;

        firstImage.classList.remove(
            "swap-left",
            "swap-right",
            "swap-up",
            "swap-down"
        );

        secondImage.classList.remove(
            "swap-left",
            "swap-right",
            "swap-up",
            "swap-down"
        );

        firstCell.classList.remove("selected");
        secondCell.classList.remove("selected")
    },  160);
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