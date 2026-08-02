document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.querySelector('.empty-state');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumber = document.getElementById('numbers');

    let hasCelebrated = false;

    const toggleEmptyState = () => {

        if (taskList.children.length === 0) {
            emptyState.style.display = 'flex';
        } else {
            emptyState.style.display = 'none';
        }

        todosContainer.style.width =
            taskList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgress = () => {

        const totalTasks = taskList.children.length;
        const completedTasks =
            taskList.querySelectorAll('.checkbox:checked').length;

        progressBar.style.width = totalTasks
            ? `${(completedTasks / totalTasks) * 100}%`
            : '0%';

        progressNumber.textContent =
            `${completedTasks} / ${totalTasks}`;

        if (
            totalTasks > 0 &&
            completedTasks === totalTasks &&
            !hasCelebrated
        ) {
            hasCelebrated = true;
            Confetti();
        }

        if (completedTasks !== totalTasks) {
            hasCelebrated = false;
        }
    };

    const saveTasktoLocalStorage = () => {

        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));

        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasksfromLocalStorage = () => {

        const savedTasks =
            JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(({ text, completed }) => {
            addTask(text, completed);
        });

        toggleEmptyState();
        updateProgress();
    };

    const addTask = (text, completed = false) => {

        const taskText = text || taskInput.value.trim();

        if (!taskText) {
            return;
        }

        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>

            <span>${taskText}</span>

            <div class="task-buttons">
                <button class="edit-btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        if (completed) {

            li.classList.add('completed');

            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {

            const isChecked = checkbox.checked;

            li.classList.toggle('completed', isChecked);

            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';

            updateProgress();
            saveTasktoLocalStorage();
        });

        editBtn.addEventListener('click', () => {

            if (!checkbox.checked) {

                taskInput.value = li.querySelector('span').textContent;

                li.remove();

                toggleEmptyState();
                updateProgress();
                saveTasktoLocalStorage();

                taskInput.focus();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {

            li.remove();

            toggleEmptyState();
            updateProgress();
            saveTasktoLocalStorage();
        });

        taskList.appendChild(li);

        taskInput.value = '';

        toggleEmptyState();
        updateProgress();
        saveTasktoLocalStorage();
    };

    // Add task when button is clicked
    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });

    taskInput.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();
            addTask();
        }
    });

    loadTasksfromLocalStorage();

    toggleEmptyState();
    updateProgress();

});

const Confetti = () => {

    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
    };

    function shoot() {

        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    shoot();
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
};