let popup = document.getElementById("confirmationPopup");

    function openPopup() {
        popup.classList.add("open-popup");
    }

    function closePopup() {
        popup.classList.remove("open-popup");
    }

    function submitContactForm() {
        const form = document.getElementById("contactForm");
        const formData = new FormData(form);

        fetch('/submit-form', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); 
            openPopup(); 
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error sending message'); 
        });
    }
