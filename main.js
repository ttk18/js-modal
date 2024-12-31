const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function Model() {
    function getScrollBarWidth() {
        if (getScrollBarWidth.value !== undefined) {
            return getScrollBarWidth.value;
        }

        const div = document.createElement("div");

        Object.assign(div.style, {
            overflow: "scroll",
            position: "absolute",
            top: "-9999px",
        });

        document.body.appendChild(div);

        const barWidth = div.clientWidth - div.offsetWidth;

        getScrollBarWidth.value = barWidth;

        document.body.removeChild(div);

        return barWidth;
    }

    this.openModal = (opitions = {}) => {
        const { templateId, allowBackdropClose = true } = opitions;
        const template = $(`#${templateId}`);

        if (!template) {
            console.error(`#${templateId} does't exist`);
            return;
        }

        const content = template.content.cloneNode(true);
        const modalBackdrop = document.createElement("div");
        modalBackdrop.classList.add("modal-backdrop");

        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");

        const modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");

        const buttonClose = document.createElement("button");
        buttonClose.classList.add("close");
        buttonClose.innerHTML = "&times;";

        const modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");
        modalBody.append(content);

        modalHeader.appendChild(buttonClose);
        modalContainer.append(modalHeader, modalBody);
        modalBackdrop.appendChild(modalContainer);
        document.body.append(modalBackdrop);

        document.body.style.paddingRight = `${getScrollBarWidth()} px`;

        setTimeout(() => {
            modalBackdrop.classList.add("show");
        }, 0);

        buttonClose.onclick = () => {
            this.closeModal(modalBackdrop);
        };

        if (allowBackdropClose) {
            modalBackdrop.onclick = (e) => {
                if (e.target === modalBackdrop) {
                    this.closeModal(modalBackdrop);
                }
            };
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeModal(modalBackdrop);
            }
        });

        document.body.classList.add("no-scroll");

        return modalBackdrop;
    };

    this.closeModal = (nodalElement) => {
        nodalElement.classList.remove("show");
        nodalElement.ontransitionend = () => {
            nodalElement.remove();
            document.body.classList.remove("no-scroll");
        };
        document.body.style.paddingRight = ``;
    };
}

const modal = new Model();

$("#open-modal-1").onclick = function () {
    modal.openModal({
        templateId: "modal-1",
    });
};

$("#open-modal-2").onclick = function () {
    const backdrop = modal.openModal({
        templateId: "modal-2",
        allowBackdropClose: false,
    });

    const form = backdrop.querySelector("form");

    if (!form) {
        return;
    }

    form.onsubmit = (e) => {
        e.preventDefault();

        const formData = {
            userName: form.querySelector("#username").value,
            password: form.querySelector("#password").value,
        };

        console.log(formData);
    };
};
