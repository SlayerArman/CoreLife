export function showLockedPageOverlay(page, requiredLevel, onPlay){
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    overlay.innerHTML = `
        <div class="overlay-panel">
            <button class="overlay-close" type="button">
                ×
            </button>

            <h2>${page.title}</h2>
            
            <p>
                Complete Level ${requiredLevel}
                to unlock this page.
            </p>
            
            <button 
                class="overlay-play"
                type="button">
                Play Level ${requiredLevel}
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeButton =
        overlay.querySelector(".overlay-close");
    
        closeButton.addEventListener("click", () => {
            overlay.remove();
        });

        const playButton =
            overlay.querySelector(".overlay-play");
        
            playButton.addEventListener("click", () => {
                overlay.remove();

                if (typeof onPlay === "function"){
                    onPlay();
                }
            });
}