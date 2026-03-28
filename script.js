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
    
    const input = document.getElementById("noteInput");
    const notesList = document.getElementById("notesList");

    if (input.value.trim() === "") return;

    const li = document.createElement("li");
    li.textContent = input.value;
    
    // Add delete button to each note
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => li.remove());
    
    li.appendChild(deleteBtn);
    notesList.appendChild(li);

    input.value = "";
    input.focus();
    
    // Save notes to localStorage
    saveNotes();
}

// Save notes to localStorage
function saveNotes() {
    const notesList = document.getElementById("notesList");
    const notes = [];
    
    notesList.querySelectorAll("li").forEach(li => {
        // Get text without the delete button
        const text = li.textContent.replace("Delete", "").trim();
        notes.push(text);
    });
    
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage on page load
function loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
        const notes = JSON.parse(saved);
        notes.forEach(noteText => {
            const input = document.getElementById("noteInput");
            const notesList = document.getElementById("notesList");
            
            const li = document.createElement("li");
            li.textContent = noteText;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", () => {
                li.remove();
                saveNotes();
            });
            
            li.appendChild(deleteBtn);
            notesList.appendChild(li);
        });
    }
}

// Load notes when page loads
document.addEventListener("DOMContentLoaded", loadNotes);
