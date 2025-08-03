document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new li element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        // Use classList.add to add the class
        removeBtn.classList.add('remove-btn');

        // Add event listener to remove button to remove task
        removeBtn.onclick = function() {
            taskList.removeChild(taskItem);
        };

        // Append remove button to li
        taskItem.appendChild(removeBtn);

        // Append li to task list
        taskList.appendChild(taskItem);

        // Clear input field
        taskInput.value = '';
    }

    // Attach event listener to add button
    addButton.addEventListener('click', addTask);

    // Attach event listener to task input for 'Enter' key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
