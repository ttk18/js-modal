const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const showModal = $$(".show-modal");
const modalBackdrop = $$(".modal-backdrop");
const closeModal = $$(".close");

{
    /* <div class="modal-backdrop">
<div class="modal-container">
    <div class="modal-header">
        <button class="close">&times;</button>
    </div>
    <div class="modal-body">Modal 1</div>
</div>
</div> */
}

showModal.forEach((btn) => {
    btn.onclick = function () {
        const modal = $(this.dataset.modal);
        if (modal) {
            modal.classList.add("show");
            currentModal = modal;
        }
    };
});

closeModal.forEach((close) => {
    close.onclick = function () {
        const modal = this.closest(".modal-backdrop");
        if (modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    };
});

modalBackdrop.forEach((modal) => {
    modal.onclick = function (e) {
        if (e.target === this) {
            modal.classList.remove("show");
            currentModal = null;
        }
    };
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && currentModal) {
        currentModal.classList.remove("show");
    }
});
