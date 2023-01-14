const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const modalOverlay = document.getElementById('overlay')

/**
 * Start modal listeners at page load.
 */
function startModals () {
  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
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
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

// Wait for the DOM to finish loading, then run the initial system
document.addEventListener("DOMContentLoaded", startModals);
