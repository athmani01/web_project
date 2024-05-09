let popup = document.getElementById("confirmationPopup");

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

function submitContactForm(event) {
    console.log("Form submited");
    event.preventDefault();
    const form = document.getElementById("contactForm");
    const formData = new FormData(form);

    fetch('/contact', {
        method: 'POST',
        body: formData
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error sending message'); // Fallback error handling
    });

}

function openPopup() {
    let popup = document.getElementById("confirmationPopup"); 
    popup.classList.add("open-popup");
}

// ... (Rest of your functions like closePopup) ...

// On page load, check for the success indicator and trigger the popup
window.addEventListener('DOMContentLoaded', () => { 
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');

    if (success === 'true') {
        openPopup();
    }
});

