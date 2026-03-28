// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to light mode
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

// Notes functionality
function addNote(event) {
    event.preventDefault();
    
    const titleInput = document.getElementById("noteTitle");
    const textInput = document.getElementById("noteInput");
    const notesList = document.getElementById("notesList");

    if (titleInput.value.trim() === "" || textInput.value.trim() === "") return;

    const li = document.createElement("li");
    
    // Create title element
    const title = document.createElement("div");
    title.className = "note-title";
    title.textContent = titleInput.value;
    
    // Create content element
    const content = document.createElement("div");
    content.className = "note-content";
    content.textContent = textInput.value;
    
    // Add delete button to each note
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveNotes();
    });
    
    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);

    titleInput.value = "";
    textInput.value = "";
    titleInput.focus();
    
    // Save notes to localStorage
    saveNotes();
}

// Save notes to localStorage
function saveNotes() {
    const notesList = document.getElementById("notesList");
    const notes = [];
    
    notesList.querySelectorAll("li").forEach(li => {
        const title = li.querySelector(".note-title").textContent;
        const content = li.querySelector(".note-content").textContent;
        notes.push({ title, content });
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage on page load
function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
        const notes = JSON.parse(saved);
        notes.forEach(note => {
            const notesList = document.getElementById("notesList");
            
            const li = document.createElement("li");
            
            const title = document.createElement("div");
            title.className = "note-title";
            title.textContent = note.title;
            
            const content = document.createElement("div");
            content.className = "note-content";
            content.textContent = note.content;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", () => {
                li.remove();
                saveNotes();
            });
            
            li.appendChild(title);
            li.appendChild(content);
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }
}

// Load notes when page loads
document.addEventListener("DOMContentLoaded", loadNotes);
