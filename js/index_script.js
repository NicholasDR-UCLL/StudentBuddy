function updateLS(newItem, storageItem) {
  localStorage.removeItem(storageItem);
  localStorage.setItem(storageItem, JSON.stringify(newItem));
}

let allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
let doneTodos = JSON.parse(localStorage.getItem("doneTodos")) || [];

document
  .querySelector("#addTodoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addNewTodo();
  });

function addNewTodo() {
  const newTodoItem = {
    text: document.querySelector("#newTodo").value,
    subject: document.querySelector("#newTodoSubject").value,
    deadline: document.querySelector("#newTodoDeadline").value,
    link: document.querySelector("#newTodoLink").value,
    completed: false,
  };
  allTodos.push(newTodoItem);
  updateLS(allTodos, "allTodos");

  document.querySelector("#addTodoForm").reset();
  showTodoList();
}

function markAsDone(index) {
  const completedTask = allTodos.splice(index, 1)[0];
  completedTask.completed = true;
  doneTodos.push(completedTask);
  updateLS(allTodos, "allTodos");
  updateLS(doneTodos, "doneTodos");
  showTodoList();
  showDoneList();
}

function showTodoList() {
  const todoItems = document.querySelector("#todoItems");
  todoItems.innerHTML = "";

  allTodos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.style.cursor = "pointer";

    let isUrgent = false;
    let timeLeftString = "Geen deadline";

    if (todo.deadline) {
      const timeLeftMs = calculateTimeLeft(todo.deadline);
      timeLeftString = formatTimeLeft(timeLeftMs);
      // Urgent if deadline is within 48 hours (172800000 ms)
      if (timeLeftMs > 0 && timeLeftMs <= 172800000) {
        isUrgent = true;
      }
    }

    if (isUrgent) {
      todoItem.classList.add("urgent");
    }

    // Always visible summary of the todo item
    const summary = document.createElement("div");
    const formattedDeadline = todo.deadline
      ? new Date(todo.deadline).toLocaleString("nl-NL")
      : "Geen deadline";
    summary.innerHTML = `<h3>${todo.text}</h3><p>${formattedDeadline}</p>`;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.style.marginLeft = "10px";
    doneBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      markAsDone(index);
    });
    summary.appendChild(doneBtn);

    todoItem.appendChild(summary);

    // Hidden details that can be toggled on click
    const details = document.createElement("div");
    details.style.display = "none";

    const subjectText = document.createElement("p");
    subjectText.textContent = `Vak: ${todo.subject || "Niet opgegeven"}`;
    details.appendChild(subjectText);

    const timeText = document.createElement("p");
    timeText.textContent = `Tijd over: ${timeLeftString}`;
    details.appendChild(timeText);

    if (todo.link) {
      const link = document.createElement("a");
      link.href = todo.link;
      link.textContent = "Bekijk de opdracht";
      link.target = "_blank";
      details.appendChild(link);
    }

    todoItem.appendChild(details);

    // Clicking the todo item toggles the visibility of the details
    todoItem.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() !== "a") {
        details.style.display =
          details.style.display === "none" ? "block" : "none";
      }
    });

    todoItems.appendChild(todoItem);
  });
}

function showDoneList() {
  const doneItems = document.querySelector("#doneItems");
  doneItems.innerHTML = "";

  doneTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.style.cursor = "pointer";
    todoItem.style.opacity = "0.7";

    const summary = document.createElement("div");
    const formattedDeadline = todo.deadline
      ? new Date(todo.deadline).toLocaleString("nl-NL")
      : "Geen deadline";
    summary.innerHTML =
      `<h3>${todo.text}</h3><p>${formattedDeadline}</p>` +
      " <em>(Afgerond)</em>";
    todoItem.appendChild(summary);

    const details = document.createElement("div");
    details.style.display = "none";

    const subjectText = document.createElement("p");
    subjectText.textContent = `Vak: ${todo.subject || "Niet opgegeven"}`;
    details.appendChild(subjectText);

    if (todo.link) {
      const link = document.createElement("a");
      link.href = todo.link;
      link.textContent = "Bekijk de opdracht";
      link.target = "_blank";
      details.appendChild(link);
    }

    todoItem.appendChild(details);

    todoItem.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() !== "a") {
        details.style.display =
          details.style.display === "none" ? "block" : "none";
      }
    });

    doneItems.appendChild(todoItem);
  });
}

showTodoList();
showDoneList();

function calculateTimeLeft(deadline) {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const timeLeft = deadlineDate - now;
  return timeLeft;
}

function formatTimeLeft(ms) {
  if (ms < 0) return "Deadline verstreken";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days} dagen en ${hours} uur over`;
}
