const BOARD_SIZE = 8;
const LEVEL_GOAL = 200;

let boardBusy = false;
let score = 0;

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
    
    score = 0;
    boardBusy = false;

    const gameOverlay = document.createElement("div");
    gameOverlay.className = "game-overlay";

    gameOverlay.innerHTML = `
        <div class="game-window">
            <div class="game-header">
                <div>
                    <h2>
                        Level ${page.level}
                    </h2>

                    <p class="game-progress">
                        Elements: 0 / ${LEVEL_GOAL}
                    </p>
                </div>
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
        swapCells(board, previousCell, cell);
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
    const columnDifference =
        Math.abs(firstColumn - secondColumn);
    const horizontal =
        rowDifference === 0 &&
        columnDifference === 1;
    const vertical =
        rowDifference === 1 &&
        columnDifference === 0;

        return horizontal || vertical;
}

function findMatches(board){
    const matchedCells = new Set();

    for (let row = 0; row < BOARD_SIZE; row++){
        let currentType = null;
        let currentCells = [];

        for (let column = 0; column < BOARD_SIZE; column++){
            const cell =
                board.querySelector(
                    `[data-row="${row}"][data-column="${column}"]`
                );
            const element =
                cell.dataset.element;

            if (element === currentType){
                currentCells.push(cell);
            } else {
                if (currentCells.length >= 3){
                    currentCells.forEach(
                        match => matchedCells.add(match)
                    );
                }
                currentType = element;
                currentCells = [cell];
            }
        }

        if (currentCells.length >= 3){
            currentCells.forEach(
                match => matchedCells.add(match)
            );
        }
    }

    for (let column = 0; column < BOARD_SIZE; column++){
        let currentType = null;
        let currentCells = [];

        for (let row = 0; row < BOARD_SIZE; row++){
            const cell =
                board.querySelector(
                    `[data-row="${row}"][data-column="${column}"]`
                );
            const element =
                cell.dataset.element;

            if (element === currentType){
                currentCells.push(cell);
            } else {
                if (currentCells.length >= 3){
                    currentCells.forEach(
                        match => matchedCells.add(match)
                    );
                }
                currentType = element;
                currentCells = [cell];
            }
        }

        if (currentCells.length >= 3){
            currentCells.forEach(
                match => matchedCells.add(match)
            );
        }
    }
    return matchedCells;
}

function removeMatches(board, matches){

    if (matches.size === 0){
        return;
    }

    score += matches.size;

    const progress =
        board.closest(".game-window")
            .querySelector(".game-progress");

    progress.textContent =
        `Elements: ${Math.min(score, LEVEL_GOAL)} / ${LEVEL_GOAL}`;

    if (score >= LEVEL_GOAL){
        setTimeout(() => {
            completeLevel(board);
        }, 400);
    }

    matches.forEach(cell => {
        cell.classList.add("match-removing");
    });

    setTimeout(() => {
        matches.forEach(cell => {
            const image =
                cell.querySelector(".game-piece");

            if (image){
                image.remove();
            }

            delete cell.dataset.element;
            cell.classList.remove("match-removing");
        });
        collapseBoard(board);
        refillBoard(board);
    }, 180);
}

function completeLevel(board){
    boardBusy = true;

    const gameWindow =
        board.closest(".game-window");

    const gameArea =
        gameWindow.querySelector(".game-area");

    gameArea.innerHTML = `
        <div class="level-complete">
            <h2>
                Level Complete!
            </h2>

            <p>
                You Cleared enough elements.
            </p>
            
            <button
                class="continue-button"
                type="button">
                Continue
            </button>
        </div>
    `;

    const continueButton =
        gameArea.querySelector(".continue-button");

    continueButton.addEventListener(
        "click", () => {
            gameWindow
                .closest(".game-overlay")
                .remove();
        }
    )
            
}

function collapseBoard(board){
    for (let column = 0; column < BOARD_SIZE; column++){
        let emptyRow = BOARD_SIZE - 1;

        for (let row = BOARD_SIZE - 1; row >= 0; row--){
            const cell =
                board.querySelector(
                    `[data-row="${row}"][data-column="${column}"]`);
            
            if (!cell.dataset.element){
                continue;
            }

            const targetCell =
                board.querySelector(`[data-row="${emptyRow}"][data-column="${column}"]`);

            if (targetCell !== cell){
                const image =
                    cell.querySelector(".game-piece");
                targetCell.dataset.element =
                    cell.dataset.element;
                targetCell.appendChild(image);
                
                delete cell.dataset.element;

                image.classList.add("falling");

                setTimeout(() => {
                    image.classList.remove("falling");
                }, 180);
            }
            emptyRow--;
        }
    }
}

function refillBoard(board){
    for (let row =0; row < BOARD_SIZE; row++){
        for ( let column = 0; column < BOARD_SIZE; column++){
            const cell =
                board.querySelector(`[data-row="${row}"][data-column="${column}"]`);

            if (cell.dataset.element){
                continue;
            }

            const element =
                getRandomElement();

            const image =
                document.createElement("img");

            image.src =
                element.image;
            image.alt =
                element.name;
            image.className =
                "game-piece";

            cell.dataset.element =
                element.id;

            cell.appendChild(image);

            image.classList.add("new-piece");

            setTimeout(() => {
                image.classList.remove("new-piece");
            }, 180);
        }
    }
}

function swapCells(board, firstCell, secondCell) {
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

        const matches =
            findMatches(board);

        console.log(
            "Matches found:",
            matches.size);

        removeMatches(board, matches);

        setTimeout(() => {
            boardBusy = false;
        }, 180);
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