let openModalButtons = document.querySelectorAll('[data-modal-target]')
let closeModalButtons = document.querySelectorAll('[data-close-button]')
let modalOverlay = document.getElementById('overlay')

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  modalOverlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  modalOverlay.classList.remove('active')
}

function addOpenModalListener() {
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      let modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })
}

function addCloseModalListener() {
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      let modal = button.closest('.modal')
      closeModal(modal)
    })
  })
}

function addCloseModalOverlayListener() {
  modalOverlay.addEventListener('click', () => {
    let modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })
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
