const sub_btn = document.querySelector(".Add");
const plus = document.querySelector(".main");

let count = 0;
let isClicked = true;


window.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText, i) => createTaskCard(taskText));
});


sub_btn.addEventListener("click", () => {
    if (!isClicked) return;

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const div = document.createElement("div");
    div.className = "card";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your task";
    input.className = "text";

    const Add_btn = document.createElement("button");
    Add_btn.innerText = "Add";

    const delete_btn = document.createElement("button");
    delete_btn.textContent = "Discard";

    div.appendChild(input);
    div.appendChild(Add_btn);
    div.appendChild(delete_btn);
    overlay.appendChild(div);
    plus.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add("show1"));
    isClicked = false;


    Add_btn.addEventListener("click", () => {
        const inputTask = input.value.trim();
        if (inputTask === "") {
            overlay.remove();
            isClicked = true;
            return;
        }

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(inputTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        overlay.remove();
        isClicked = true;

        createTaskCard(inputTask);
    });

    delete_btn.addEventListener("click", () => {
        overlay.remove();
        isClicked = true;
    });
});


function createTaskCard(taskText) {
    count++;

    const taskCard = document.createElement("div");
    taskCard.className = "taskCard";

    const head = document.createElement("h2");
    head.textContent = `Task${count}`;

    const heading = document.createElement("p");
    heading.textContent = taskText;

    const Edit_btn = document.createElement("button");
    Edit_btn.className = "Edit";
    Edit_btn.textContent = "edit";

    const card_delete = document.createElement("button");
    card_delete.className = "carddelete";
    card_delete.textContent = "delete";

    taskCard.appendChild(head);
    taskCard.appendChild(heading);
    taskCard.appendChild(Edit_btn);
    taskCard.appendChild(card_delete);
    plus.appendChild(taskCard);

    // Edit functionality
    Edit_btn.addEventListener("click", () => {
        if (Edit_btn.textContent === "edit") {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = heading.textContent;
            editInput.className = "editInput";
            taskCard.replaceChild(editInput, heading);
            Edit_btn.textContent = "save";
        } else {
            const newText = taskCard.querySelector(".editInput").value.trim();
            heading.textContent = newText || "Unnamed Task";
            taskCard.replaceChild(heading, taskCard.querySelector(".editInput"));
            Edit_btn.textContent = "edit";

            // Update localStorage
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks[index] = newText;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                taskText = newText;
            }
        }
    });

    card_delete.addEventListener("click", () => {
        taskCard.remove();
        count--;

        // Remove from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}
