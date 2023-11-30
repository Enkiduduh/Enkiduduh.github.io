function displayModal() {
    const modal = document.getElementById("contact_modal");
	  modal.style.display = "block";
    const firstname = document.getElementById("firstname");
    firstname.focus();

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
