function selectBox(element) {
    // Find the parent container of the clicked element
    const parentContainer = element.parentNode;

    // Remove 'selected' class from all options within the same container
    parentContainer.querySelectorAll('.collection-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add 'selected' class to the clicked option
    element.classList.add('selected');
}

function selectImage(element) {
    // Similar functionality as selectBox for images
    const parentContainer = element.parentNode;

    parentContainer.querySelectorAll('.image-option').forEach(option => {
        option.classList.remove('selected');
    });

    element.classList.add('selected');
}

function submitForm() {
    // Check if all collections have at least one selected option
    const collections = ['place-collection', 'flowers-collection', 'week-collection', 'month-collection'];
    let allSelected = true;

    collections.forEach(collectionId => {
        const collection = document.getElementById(collectionId);
        if (!collection.querySelector('.selected')) {
            allSelected = false;
        }
    });

    if (!allSelected) {
        alert('Выбери по одному варианту в каждом вопросе');
        return;
    }

    // Gather selected options
    const formData = {};

    collections.forEach(collectionId => {
        const collection = document.getElementById(collectionId);
        const selectedOption = collection.querySelector('.selected');
        formData[collectionId] = selectedOption.textContent.trim();
    });

    // Prepare the data for Formspree
    const data = new URLSearchParams(formData);

    // Send data to Formspree
    fetch('https://formspree.io/f/mwpezvwd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
    })
    .then(response => {
        console.log('Response:', response);
        if (response.ok) {
            alert('Ура *dancing minion*');
        } else {
            alert('Чзх что то сломалось');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Чзх что то сломалось');
    });
}
