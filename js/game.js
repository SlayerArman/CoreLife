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
    if(previousCell){
        previousCell.classList.remove("selected");
    }
    cell.classList.add("selected")
}

function getRandomElement(){
    const randomIndex =
        Math.floor(Math.random() * elements.length);
        return elements[randomIndex];
}