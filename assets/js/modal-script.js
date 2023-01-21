let openModalButtons = document.querySelectorAll('[data-modal-target]')
let closeModalButtons = document.querySelectorAll('[data-close-button]')
let modalOverlay = document.getElementById('overlay')

/**
 * Start modal listeners at page load.
 */
function startModals () {
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      let modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      let modal = button.closest('.modal')
      closeModal(modal)
    })
  })
}

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

modalOverlay.addEventListener('click', () => {
  let modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

// Wait for the DOM to finish loading, then run the initial system
document.addEventListener("DOMContentLoaded", startModals);
