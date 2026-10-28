
const tips = [
    {
        title: "Maak een planning:",
        text: "Verdeel je leerstof over meerdere dagen en plan voldoende pauzes in om alles rustig te verwerken."
    },
    {
        title: "Leg de leerstof uit:",
        text: "Probeer de leerstof in je eigen woorden uit te leggen alsof je lesgeeft aan iemand anders."
    },
    {
        title: "Vermijd afleiding:",
        text: "Leg je gsm weg en zoek een rustige plek waar je je volledig op het studeren kunt concentreren."
    },
    {
        title: "Neem regelmatig pauzes:",
        text: "Studeren gaat vaak beter als je regelmatig even ontspant en je hersenen wat rust geeft."
    },
    {
        title: "Test jezelf:",
        text: "Maak oefenvragen of gebruik flashcards om te controleren hoeveel je al onthouden hebt."
    },
    {
        title: "Begin op tijd:",
        text: "Wacht niet tot de dag voor je toets, maar leer elke dag een klein stukje om stress te verminderen."
    },
    {
        title: "Zorg voor voldoende slaap:",
        text: "Een goede nachtrust helpt je hersenen om informatie beter te onthouden en te verwerken."
    },
    {
        title: "Gebruik kleurcodes:",
        text: "Markeer belangrijke begrippen en gebruik verschillende kleuren om de leerstof overzichtelijker te maken."
    },
    {
        title: "Wissel vakken af:",
        text: "Door verschillende vakken af te wisselen, blijf je langer geconcentreerd en voorkom je verveling."
    },
    {
        title: "Studeer actief:",
        text: "Maak samenvattingen in je eigen woorden en schrijf belangrijke informatie op zonder naar je cursus te kijken."
    },
    {
        title: "Stel haalbare doelen:",
        text: "Verdeel grote hoeveelheden leerstof in kleine taken, zodat je gemotiveerd blijft en vooruitgang ziet."
    },
    {
        title: "Drink voldoende water:",
        text: "Zorg ervoor dat je tijdens het studeren genoeg water drinkt om je goed te blijven voelen en concentreren."
    },
    {
        title: "Gebruik de Pomodoro-techniek:",
        text: "Studeer 25 minuten geconcentreerd en neem daarna 5 minuten pauze om je focus te behouden."
    },
    {
        title: "Begin met het moeilijkste:",
        text: "Pak moeilijke onderwerpen aan wanneer je nog fris bent, zodat je er voldoende aandacht aan kunt besteden."
    },
    {
        title: "Herhaal regelmatig:",
        text: "Herhaal eerder geleerde informatie op verschillende momenten om die beter in je langetermijngeheugen op te slaan."
    },
    {
        title: "Gebruik ezelsbruggetjes:",
        text: "Verzin korte zinnen, woorden of afkortingen om moeilijke informatie gemakkelijker te onthouden."
    },
    {
        title: "Werk met schema's:",
        text: "Zet belangrijke informatie in schema's, mindmaps of tabellen zodat je beter het overzicht bewaart."
    },
    {
        title: "Oefen zonder je notities:",
        text: "Probeer informatie uit je hoofd op te schrijven of op te zeggen voordat je je notities opnieuw bekijkt."
    },
    {
        title: "Studeer op een vaste plek:",
        text: "Kies een rustige werkplek waar je je goed kunt concentreren en zo weinig mogelijk wordt afgeleid."
    },
    {
        title: "Beloon jezelf:",
        text: "Geef jezelf na het behalen van een studiedoel een kleine beloning om gemotiveerd te blijven."
    },
    {
        title: "Focus op moeilijke leerstof:",
        text: "Besteed extra tijd aan onderwerpen die je lastig vindt en oefen ze totdat je ze goed begrijpt."
    },
    {
        title: "Gebruik voorbeelden:",
        text: "Koppel moeilijke theorie aan concrete voorbeelden uit het dagelijks leven om de leerstof beter te begrijpen."
    },
    {
        title: "Controleer je vooruitgang:",
        text: "Test regelmatig jezelf om te ontdekken welke onderwerpen je al beheerst en welke je nog moet herhalen."
    }
];


const randomTip = Math.floor(Math.random() * tips.length);

document.getElementById("tipTitle").textContent = tips[randomTip].title;
document.getElementById("tipText").textContent = tips[randomTip].text;

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
