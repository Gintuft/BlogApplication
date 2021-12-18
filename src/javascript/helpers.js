function resetForm (formElement) {
  formElement.reset()
  const inputsHiddenElements = [...formElement.querySelectorAll('[type = "hidden"]')]
  inputsHiddenElements.forEach(inputelement => { inputelement.value = '' })
}

export { resetForm }
