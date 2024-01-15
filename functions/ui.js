const addButtonsToUserPopup = (popupElement, username) => {
  const button = document.createElement("button");
  button.classList.add("btn", "mv-button");
  button.innerText = "Bloquear usuario";
  button.onclick = () => addUserToBlockedList(username);
  popupElement.appendChild(button);
};
