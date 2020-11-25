class GalleryController {
    /** @arg {string[]} images */
    constructor(images) {
        this.imageURLs = images;

        // start loading images
        this.images = images.map((image) => {
            let img = new Image();
            img.src = image;
            return img;
        });

        this.dialog = /** @type {HTMLDialogElement | null} */(null);
    }

    createDialog() {
        let dialog = document.createElement('dialog');
        dialog.style.display = "flex";
        dialog.style.width = "80%";
        dialog.style.height = "80%";

        dialog.innerHTML = `
            <div class="flex-column flex-full-w flex-center-h flex-1">
                <div class="flex-column flex-full-w flex-center-h flex-center-v flex-1 gallery-image-container">
                </div>
                <div class="flex-row flex-center-v flex-full-w flex-h-start gallery-preview-container">
                </div>
            </div>
        `;

        let previewContainer = dialog.querySelector('.gallery-preview-container');
        let imgContainer = dialog.querySelector('.gallery-image-container');

        // Append image previews
        this.images.forEach((img) => {
            // 
            let container = document.createElement('div');
            container.appendChild(img);

            container.addEventListener('click', () => {
                imgContainer.innerHTML = '';
                imgContainer.appendChild(img.cloneNode());
                
                previewContainer.childNodes.forEach((x) => x.id = (x.id || '').replaceAll('selected', ''));
                container.setAttribute('id', 'selected');
            });

            previewContainer.appendChild(container);
        });

        // Select first element
        previewContainer.firstElementChild.click();

        imgContainer.addEventListener('mousemove', (e) => {
            let img = imgContainer.firstElementChild;

            let percX = Math.min(25, Math.max(-25, ((1 - (e.clientX / imgContainer.clientWidth)) * 100) - 50));
            let percY = Math.min(25, Math.max(-25, ((1 - (e.clientY / imgContainer.clientHeight)) * 100) - 50));

            img.style.transform = `translate(${percX}%, ${percY}%)`;
        });

        imgContainer.addEventListener('mouseleave', () => {
            if (!imgContainer.firstElementChild)
                return;

            let img = imgContainer.firstElementChild;
            img.style.transform = '';
        });

        return dialog;
    }

    onClose() {
        this.dialog.close();
        document.body.removeChild(this.dialog);
        this.dialog = null;
    }

    onOpen() {
        this.dialog = this.createDialog();
        document.body.appendChild(this.dialog);

        this.dialog.showModal();
        this.dialog.addEventListener('click', this.onClose.bind(this));
        this.dialog.firstElementChild.addEventListener('click', (e) => {
            //e.stopPropagation();
            e.stopImmediatePropagation();
        });
    }
}