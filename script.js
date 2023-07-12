const addForm = document.getElementById("addForm");
const todoBox = document.getElementById("todoBox");
const lists = document.getElementById("lists");
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

let todoArray = [];

const display = () => {
  let todosList = "";
  todoArray.forEach((todo, id) => {
    todosList += `<div class="list">
    <input type="text" id="${id}" value="${todo.todo}" disabled />
    <i class="fa-solid fa-pen-to-square" id="edit-${id}" onclick="editTask(${id})"></i>
    <i class="fa-solid fa-trash" onclick="deleteTask(${id})"></i>
  </div>`;
  });
  lists.innerHTML = todosList;
};

if (localStorage.getItem("todo-list-ls") !== null) {
  todoArray = JSON.parse(localStorage.getItem("todo-list-ls"));
  display();
}

const saveInfo = (todoArray) => {
  let str = JSON.stringify(todoArray);
  localStorage.setItem("todo-list-ls", str);
  display();
  todoBox.value = "";
};

const editTask = (id) => {
  if (document.getElementById(id).disabled) {
    document.getElementById(id).disabled = false;
    document.getElementById(id).focus();
    document.getElementById(`edit-${id}`).classList.add("fa-check");
    document.getElementById(`edit-${id}`).classList.remove("fa-pen-to-square");
  } else {
    document.getElementById(id).disabled = true;
    document.getElementById(`edit-${id}`).classList.add("fa-pen-to-square");
    document.getElementById(`edit-${id}`).classList.remove("fa-check");
    const todo = document.getElementById(id).value;

    todoArray.splice(id, 1, {
      todo: todo,
    });

    saveInfo(todoArray);
  }
};

const deleteTask = (id) => {
  todoArray.splice(id, 1);
  saveInfo(todoArray);
};

const cancelSearch = () => {
  searchBtn.classList.remove("fa-xmark");
  searchBtn.classList.add("fa-magnifying-glass");
  searchBox.value = "";
  list.forEach((todo) => {
    lists.appendChild(todo);
  });
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = todoBox.value;
  if (todo.trim() === "") {
    console.log("Input is empty"); // todo: add warning using css
  } else {
    todoArray.push({
      todo: todo,
    });
    saveInfo(todoArray);
  }
});

const list = document.querySelectorAll(".list");
searchBox.addEventListener("input", (e) => {
  const searchingValue = e.target.value.toLowerCase();
  lists.innerHTML = "";
  if (searchBox.value.trim() === "") {
    cancelSearch();
  } else {
    list.forEach((todo) => {
      const todoInput = todo.childNodes[1];
      if (todoInput.value.toLowerCase().indexOf(searchingValue) > -1) {
        lists.appendChild(todo);
        searchBtn.classList.add("fa-xmark");
        searchBtn.classList.remove("fa-magnifying-glass");
      }
    });
  }
});

searchBtn.addEventListener("click", () => {
  searchBtn.classList.contains("fa-xmark") && cancelSearch();
});
