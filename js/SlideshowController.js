class SlideshowController {
    /**
     * @param {HTMLElement} container
     */
    constructor(container) {
        this.container = container;
        this.itemContainer = /** @type {HTMLElement} */ (container.querySelector('.presentation-item-container'));
        this.ongoing = false;
    }

    onNext() {
        if (this.ongoing) {
            return;
        }

        this.ongoing = true;
        const [firstChild, secondChild] = /** @type {HTMLElement[]} */ (this.itemContainer.children);

        const callback = () => {
            // Remove listener
            firstChild.removeEventListener('animationend', callback);

            // End animation
            firstChild.style.animation = null;
            secondChild.style.animation = null;

            // Unblock for next animation
            this.ongoing = false;

            // Swap children around
            this.itemContainer.removeChild(firstChild);
            this.itemContainer.appendChild(firstChild);
        };

        // Add listener
        firstChild.addEventListener('animationend', callback);

        // Start animations
        firstChild.style.animation = '1s ease-in-out presentation-next-first-item';
        secondChild.style.animation = '1s ease-in-out presentation-next-second-item';
    }

    onPrev() {
        if (this.ongoing) {
            return;
        }

        this.ongoing = true;
        const firstChild = /** @type {HTMLElement} */ (this.itemContainer.children[0]);
        const lastChild = /** @type {HTMLElement} */ (this.itemContainer.children[this.itemContainer.children.length - 1]);

        const callback = () => {
            // Remove listener
            firstChild.removeEventListener('animationend', callback);

            // End animation
            firstChild.style.animation = null;
            lastChild.style.animation = null;
            lastChild.style.display = null;

            // Unblock for next animation
            this.ongoing = false;

            // Swap children around
            this.itemContainer.removeChild(lastChild);
            this.itemContainer.prepend(lastChild);
        };

        // Add event listener
        firstChild.addEventListener('animationend', callback);

        // Start animations
        firstChild.style.animation = '1s ease-in-out presentation-prev-first-item';
        lastChild.style.animation = '1s ease-in-out presentation-prev-last-item';
        lastChild.style.display = 'flex';
    }
}