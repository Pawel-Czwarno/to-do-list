{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            })
        })
    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li class="
            list__element${task.done && hideDoneTasks ? " list__element--hidden" : ""} js-tasks">
            <button class="list__button list__button--done js-done">${task.done ? "✓" : ""}</button>
            <div class="${task.done ? "list__element--done" : ""}">${task.content}</div>
            <button class="list__button list__button--remove js-remove"><img class="list__button--image" src="./images/trash.png" alt="trash_icon"></button>
        </li>
        `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElements = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElements.innerHTML = "";
            return;
        }

        buttonsElements.innerHTML = `
            <button class="buttons__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="buttons__button js-markAllDone"
                ${tasks.every(({ done }) => done) ? " disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        bindEvents();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
        };

        newTaskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};