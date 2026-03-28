// script.js

// Character Count Feature
const characterCount = document.querySelector('#characterCount');

function updateCharacterCount() {
    const textArea = document.querySelector('#textArea');
    characterCount.textContent = `Characters: ${textArea.value.length}`;
}

textArea.addEventListener('input', updateCharacterCount);

// Search Feature
const searchInput = document.querySelector('#searchInput');
const resultsContainer = document.querySelector('#results');

function searchFunction() {
    const query = searchInput.value.toLowerCase();
    const items = Array.from(resultsContainer.children);
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', searchFunction);

// Edit Feature
const editButton = document.querySelector('#editButton');
const saveButton = document.querySelector('#saveButton');

function enableEdit() {
    textArea.disabled = false;
    saveButton.style.display = 'block';
}

function saveEdit() {
    textArea.disabled = true;
    saveButton.style.display = 'none';
}

editButton.addEventListener('click', enableEdit);
saveButton.addEventListener('click', saveEdit);

// Timestamps Feature
const timestampDisplay = document.querySelector('#timestamp');
function updateTimestamp() {
    timestampDisplay.textContent = `Last edited: ${new Date().toISOString()}`;
}

saveButton.addEventListener('click', updateTimestamp);

// Empty State Feature
const emptyStateMessage = document.querySelector('#emptyState');
function checkEmptyState() {
    if (!textArea.value) {
        emptyStateMessage.style.display = 'block';
    } else {
        emptyStateMessage.style.display = 'none';
    }
}

textArea.addEventListener('input', checkEmptyState);

// Initial check
checkEmptyState();
