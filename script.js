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
