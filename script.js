// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Character count
const noteInput = document.getElementById("noteInput");
const charCount = document.getElementById("charCount");

if (noteInput) {
    noteInput.addEventListener("input", () => {
        charCount.textContent = noteInput.value.length;
    });
}

// Search functionality
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", filterNotes);
}

function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll("#notesList li");
    
    notes.forEach(note => {
        const title = note.querySelector(".note-title").textContent.toLowerCase();
        const content = note.querySelector(".note-content").textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
}

// Add note function
function addNote(event) {
    event.preventDefault();
    
    const titleInput = document.getElementById("noteTitle");
    const textInput = document.getElementById("noteInput");
    const notesList = document.getElementById("notesList");

    if (titleInput.value.trim() === "" || textInput.value.trim() === "") return;

    const li = document.createElement("li");
    
    // Create header with title and date
    const header = document.createElement("div");
    header.className = "note-header";
    
    const title = document.createElement("div");
    title.className = "note-title";
    title.textContent = titleInput.value;
    
    const date = document.createElement("div");
    date.className = "note-date";
    date.textContent = formatDate(new Date());
    
    header.appendChild(title);
    header.appendChild(date);
    
    // Create content element
    const content = document.createElement("div");
    content.className = "note-content";
    content.textContent = textInput.value;
    
    // Create action buttons
    const actions = document.createElement("div");
    actions.className = "note-actions";
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => editNote(li));
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveNotes();
        updateEmptyState();
    });
    
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    li.appendChild(header);
    li.appendChild(content);
    li.appendChild(actions);
    notesList.appendChild(li);

    titleInput.value = "";
    textInput.value = "";
    charCount.textContent = "0";
    titleInput.focus();
    
    saveNotes();
    updateEmptyState();
}

// Edit note function
function editNote(liElement) {
    const titleEl = liElement.querySelector(".note-title");
    const contentEl = liElement.querySelector(".note-content");
    const actionsEl = liElement.querySelector(".note-actions");
    
    const currentTitle = titleEl.textContent;
    const currentContent = contentEl.textContent;
    
    titleEl.classList.add("hidden");
    contentEl.classList.add("hidden");
    actionsEl.classList.add("hidden");
    
    const editForm = document.createElement("div");
    editForm.className = "edit-form";
    
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = currentTitle;
    titleInput.placeholder = "Edit title...";
    
    const contentInput = document.createElement("textarea");
    contentInput.value = currentContent;
    contentInput.placeholder = "Edit content...";
    
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
        if (titleInput.value.trim() === "" || contentInput.value.trim() === "") return;
        
        titleEl.textContent = titleInput.value;
        contentEl.textContent = contentInput.value;
        
        titleEl.classList.remove("hidden");
        contentEl.classList.remove("hidden");
        actionsEl.classList.remove("hidden");
        editForm.remove();
        
        saveNotes();
    });
    
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-btn";
    cancelBtn.addEventListener("click", () => {
        titleEl.classList.remove("hidden");
        contentEl.classList.remove("hidden");
        actionsEl.classList.remove("hidden");
        editForm.remove();
    });
    
    editForm.appendChild(titleInput);
    editForm.appendChild(contentInput);
    editForm.appendChild(saveBtn);
    editForm.appendChild(cancelBtn);
    
    liElement.insertBefore(editForm, actionsEl.nextSibling);
    titleInput.focus();
}

// Format date
function formatDate(date) {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

// Update empty state
function updateEmptyState() {
    const notesList = document.getElementById("notesList");
    const emptyState = document.getElementById("emptyState");
    
    if (notesList.children.length === 0) {
        emptyState.classList.add("show");
    } else {
        emptyState.classList.remove("show");
    }
}

// Save notes to localStorage
function saveNotes() {
    const notesList = document.getElementById("notesList");
    const notes = [];
    
    notesList.querySelectorAll("li").forEach(li => {
        const title = li.querySelector(".note-title").textContent;
        const content = li.querySelector(".note-content").textContent;
        const date = li.querySelector(".note-date").textContent;
        notes.push({ title, content, date });
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
        const notes = JSON.parse(saved);
        const notesList = document.getElementById("notesList");
        
        notes.forEach(note => {
            const li = document.createElement("li");
            
            const header = document.createElement("div");
            header.className = "note-header";
            
            const title = document.createElement("div");
            title.className = "note-title";
            title.textContent = note.title;
            
            const date = document.createElement("div");
            date.className = "note-date";
            date.textContent = note.date;
            
            header.appendChild(title);
            header.appendChild(date);
            
            const content = document.createElement("div");
            content.className = "note-content";
            content.textContent = note.content;
            
            const actions = document.createElement("div");
            actions.className = "note-actions";
            
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-btn";
            editBtn.addEventListener("click", () => editNote(li));
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", () => {
                li.remove();
                saveNotes();
                updateEmptyState();
            });
            
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            li.appendChild(header);
            li.appendChild(content);
            li.appendChild(actions);
            notesList.appendChild(li);
        });
    }
    
    updateEmptyState();
}

// Load on page ready
document.addEventListener("DOMContentLoaded", loadNotes);

// Updated script.js with character count, search, edit, timestamps, and dark mode functionality

let notes = [];

function displayNotes() {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `<p>${note.content}</p>\n                        <small>Last edited: ${note.timestamp}</small>\n                        <button onclick='editNote(${index})'>Edit</button>`;
        notesContainer.appendChild(noteDiv);
    });
    updateCharacterCount();
}

function addNote(content) {
    const timestamp = new Date().toISOString();
    notes.push({ content, timestamp });
    displayNotes();
}

function editNote(index) {
    const newContent = prompt('Edit your note:', notes[index].content);
    if (newContent !== null) {
        notes[index].content = newContent;
        notes[index].timestamp = new Date().toISOString();
        displayNotes();
    }
}

function searchNotes(query) {
    return notes.filter(note => note.content.toLowerCase().includes(query.toLowerCase()));
}

function updateCharacterCount() {
    const totalChars = notes.reduce((total, note) => total + note.content.length, 0);
    document.getElementById('charCount').innerText = `Total Characters: ${totalChars}`;
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

document.getElementById('addNoteBtn').addEventListener('click', () => {
    const noteContent = document.getElementById('noteText').value;
    addNote(noteContent);
    document.getElementById('noteText').value = '';
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    const results = searchNotes(e.target.value);
    displayResults(results);
});

function displayResults(results) {
    // logic to display search results
}

// Initial call to display notes on load
displayNotes();

// Dark mode styles
const darkModeStyles = `body.dark-mode { background-color: #333; color: white; }`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = darkModeStyles;
document.head.appendChild(styleSheet);

// script.js

// Dark mode functionality
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

// Add a note
const addNote = (text) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(text);
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Delete a note
const deleteNote = (index) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Load notes from localStorage
const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        // Assuming there's a function to render notes on the UI
        renderNoteOnUI(note, index);
    });
};

// Event listener for dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Load notes on page load
document.addEventListener('DOMContentLoaded', loadNotes);
