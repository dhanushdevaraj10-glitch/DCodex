import { projectsData, leaderboardData } from './mock_data.js';

let editor;
let pyodideInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Initialize Monaco Editor
    // The Monaco script sets window.monaco when ready. We have to wait for it.
    const checkMonaco = setInterval(() => {
        if (window.monaco) {
            clearInterval(checkMonaco);
            initEditor();
        }
    }, 100);

    // 2. Render Projects
    renderProjects();

    // 4. Initialize Pyodide
    initPyodide();

    // 5. Setup Listeners
    setupListeners();
});

function initEditor() {
    editor = window.monaco.editor.create(document.getElementById('monaco-container'), {
        value: "print('Welcome to DCodex!')\n# Write your Python code here...",
        language: 'python',
        theme: 'vs-light',
        automaticLayout: true,
        fontSize: 16,
        minimap: { enabled: false }
    });
}

async function initPyodide() {
    const consoleOut = document.getElementById('console-output');
    try {
        pyodideInstance = await loadPyodide({
            stdout: (msg) => {
                consoleOut.innerHTML += msg + "\\n";
                scrollToBottom();
            },
            stderr: (msg) => {
                consoleOut.innerHTML += `<span style="color: red;">${msg}</span>\\n`;
                scrollToBottom();
            }
        });

        // Patch input() to use browser prompt
        await pyodideInstance.runPythonAsync(`
import js
import builtins

def custom_input(prompt=""):
    # Print the prompt to stdout first
    if prompt:
        print(prompt, end="")
    # Use JS prompt blocking
    res = js.prompt(prompt)
    if res is None:
        raise EOFError("User cancelled input")
    # Print what the user typed to simulate terminal
    print(res)
    return res

builtins.input = custom_input
        `);

        consoleOut.innerHTML = "Python environment ready! 🚀\\n\\n";
    } catch (err) {
        consoleOut.innerHTML = "Error loading Python environment.\\n";
        console.error(err);
    }
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = "";

    for (const [key, project] of Object.entries(projectsData)) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <button class="btn btn-primary" onclick="loadProject('${key}')">Run Project</button>
        `;
        container.appendChild(card);
    }
}

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = "";
    
    leaderboardData.sort((a, b) => b.points - a.points).forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${student.rank}</td>
            <td>${student.name}</td>
            <td>${student.points} pts</td>
        `;
        tbody.appendChild(tr);
    });
}

// Attach to window so onclick works
window.loadProject = function(key) {
    if (!editor) return;
    const proj = projectsData[key];
    document.getElementById('current-project-title').innerText = proj.title;
    editor.setValue(proj.code);
    
    // Scroll to editor
    document.getElementById('editor-section').scrollIntoView({ behavior: 'smooth' });
}

function setupListeners() {
    const runBtn = document.getElementById('run-btn');
    const uploadInput = document.getElementById('upload-code');
    const consoleOut = document.getElementById('console-output');

    // Run Python Code
    runBtn.addEventListener('click', async () => {
        if (!pyodideInstance) {
            alert("Python environment is still loading. Please wait.");
            return;
        }

        const code = editor.getValue();
        consoleOut.innerHTML = ""; // Clear console
        
        try {
            await pyodideInstance.runPythonAsync(code);
        } catch (err) {
            consoleOut.innerHTML += `<span style="color: red;">${err}</span>\\n`;
        }
    });

    // Upload Code
    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (editor) {
                editor.setValue(evt.target.result);
                document.getElementById('current-project-title').innerText = file.name;
            }
        };
        reader.readAsText(file);
    });
}

function scrollToBottom() {
    const box = document.querySelector('.console-box');
    box.scrollTop = box.scrollHeight;
}
