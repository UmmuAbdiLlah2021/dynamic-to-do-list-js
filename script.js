document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add task function; "save" param controls saving to Local Storage
    function addTask(taskText, save = true) {
        if (!taskText || taskText.trim() === '') {
            if (save) alert('Please enter a task.');
            return;
        }

        taskText = taskText.trim();

        // Create li element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove task event
        removeBtn.onclick = function() {
            taskList.removeChild(taskItem);
            updateLocalStorage();
        };

        taskItem.appendChild(removeBtn);
        taskList.appendChild(taskItem);

        // Clear input if task is added by user interaction
        if (save) {
            taskInput.value = '';
            updateLocalStorage();
        }
    }

    // Update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // li.textContent includes "Remove" button text, so remove it:
            const text = li.firstChild.textContent || li.textContent;
            tasks.push(text.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks on page load
    loadTasks();
});
