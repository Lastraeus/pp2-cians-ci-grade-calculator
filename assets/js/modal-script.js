let openModalButtons = document.querySelectorAll('[data-modal-target]');
let closeModalButtons = document.querySelectorAll('[data-close-button]');
let modalOverlay = document.getElementById('overlay');

/**
 * Adds the "active" class to the passed Node value, to show the modal and modal overlay.
 * @param {Node} modal 
 * @returns undefined if no/null parameter is passed.
 */
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  modalOverlay.classList.add('active');
}

/**
 * Removes the "active" class to the passed Node value, to show the modal and modal overlay.
 * @param {Node} modal 
 * @returns undefined if no/null parameter is passed.
 */
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
}

/**
 * For each element with the correct data target (any modal opening buttons), iterate through an array of each,
 * Add a unique click listener to each,
 * A detected click will result in running the openModal() func on the correct modal.
 */
function addOpenModalListener() {
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      let modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });
}

/**
 * For each element with the correct data target (any modal close buttons), iterate through an array of each,
 * Add a unique click listener to each,
 * A detected click will result in running the closeModal() func on the active modal.
 */
function addCloseModalListener() {
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      let modal = button.closest('.modal');
      closeModal(modal);
    });
  });
}

/**
 * Add a click listener to any overlay
 * A detected click will result in any active modals running the closeModal() func on the active modal.
 */
function addCloseModalOverlayListener() {
  modalOverlay.addEventListener('click', () => {
    let modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    });
  });
}

/**
 * Start modal listeners at page load.
 */
function startModalListeners () {
  addOpenModalListener();
  addCloseModalListener();
  addCloseModalOverlayListener();
}

document.addEventListener("DOMContentLoaded", startModalListeners);