if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Show your "Install" button
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null; // Clear the deferred prompt
    });
  });
});

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ol = document.querySelector("#ol");
const undo = document.querySelector(".undo");
const restore = document.querySelector(".restore");

let todo = getFromLocalStorage();
let deletedTodo = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    input.style.border = "1px solid red";
    return;
  }

  let list = document.createElement("p");
  let delTodo = document.createElement("button");

  let div = document.createElement("div");

  ol.appendChild(div);

  div.appendChild(list);
  div.appendChild(delTodo);

  let task = input.value;

  list.innerText = task;
  delTodo.innerText = "Delete";

  todo.push(task);

  console.log(todo);

  localStorage.setItem("todo", JSON.stringify(todo));

  //   delete Todo
  delTodo.onclick = () => {
    ol.removeChild(div);
    deletedTodo.push(div);
    console.log(deletedTodo);
  };

  //   undo deleted Todo
  undo.onclick = () => {
    ol.appendChild(deletedTodo[deletedTodo.length - 1]);
    deletedTodo.pop();
  };

  //   restore all deleted Todo
  restore.onclick = () => {
    deletedTodo.map((todo) => {
      ol.appendChild(todo);
    });
  };

  input.value = "";
});

function displayFromLocalStorage() {
  let getTodo = getFromLocalStorage();

  getTodo.forEach((todo) => {
    let list = document.createElement("p");
    let delTodo = document.createElement("button");

    let div = document.createElement("div");
    div.appendChild(list);
    div.appendChild(delTodo);

    list.innerText = todo;
    delTodo.innerText = "Delete";

    ol.appendChild(div);
  });
}

displayFromLocalStorage();

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("todo"));
}

// getFromLocalStorage();

input.addEventListener("focus", () => {
  input.style.border = "none";
});
