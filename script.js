const button = document.querySelector('.notes__top-btn')
const textarea = document.querySelector('.notes__popup-textarea')
const popup = document.querySelector('.notes__popup')
const addBtn = document.querySelector('.notes__popup-bottom-add')
const cancelBtn = document.querySelector('.notes__popup-bottom-cancel')
const error = document.querySelector('.notes__popup-bottom-error')
const list = document.querySelector('.notes__bottom-list')
const editPopup = document.querySelector('.notes__editPopup')
const editPopupTextArea = document.querySelector('.notes__editPopup-textarea')
const editPopupApproveBtn = document.querySelector(
	'.notes__editPopup-bottom-approve'
)
const editPopupCancelBtn = document.querySelector(
	'.notes__editPopup-bottom-cancel'
)

let noteToEdit

const showPopup = () => {
	clearStuff()
	popup.classList.toggle('notes__popup--show')
}

const cancelNote = () => {
	clearStuff()
	popup.classList.remove('notes__popup--show')
}

const addNote = () => {
	if (textarea.value == '') {
		error.style.opacity = 1
	} else {
		error.style.opacty = 0
		const note = textarea.value
		createNote(note)
	}
}

const clearStuff = () => {
	textarea.value = ''
	error.style.opacity = 0
}

const createNote = (note) => {
	const li = document.createElement('li')
	li.classList.add('notes__bottom-list-item')

	const text = document.createElement('p')
	text.classList.add('notes__bottom-list-item-note')
	text.textContent = note

	const editBtn = document.createElement('button')
	editBtn.classList.add('notes__bottom-list-item-button')
	editBtn.classList.add('notes__bottom-list-item-edit')
	editBtn.textContent = 'Edytuj'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('notes__bottom-list-item-button')
	deleteBtn.classList.add('notes__bottom-list-item-delete')
	deleteBtn.textContent = 'Usuń'

	li.append(text, editBtn, deleteBtn)
	list.append(li)
	popup.classList.remove('notes__popup--show')
}

const checkClick = (e) => {
	if (e.target.matches('.notes__bottom-list-item-delete')) {
		e.target.closest('li').remove()
	} else if (e.target.matches('.notes__bottom-list-item-edit')) {
		editPopup.classList.toggle('notes__editPopup--show')
		editPopupTextArea.value = e.target.previousElementSibling.textContent
		noteToEdit = e.target
	}
}

const closeEditPopup = () => {
	editPopup.classList.remove('notes__editPopup--show')
}

const approveNote = () => {
	if (editPopupTextArea.value == '') {
		noteToEdit.closest('li').remove()
	} else {
		noteToEdit.previousElementSibling.textContent = editPopupTextArea.value
	}
    editPopup.classList.remove('notes__editPopup--show')
}

addBtn.addEventListener('click', addNote)
cancelBtn.addEventListener('click', cancelNote)
button.addEventListener('click', showPopup)

list.addEventListener('click', checkClick)
editPopupCancelBtn.addEventListener('click', closeEditPopup)
editPopupApproveBtn.addEventListener('click', approveNote)
