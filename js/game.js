const BOARD_SIZE = 8;

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
            board.appendChild(cell);
        }
    }
}