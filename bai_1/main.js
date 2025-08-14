const sub_mid = document.querySelector("#submit");
const inputTag = document.querySelector("#todo-input");
const tasksList = document.querySelector("#task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
sub_mid.onclick = (e) => {
  e.preventDefault();
  const newTask = {
    name: inputTag.value.trim(),
  };
  if (!newTask.name) {
    alert("Không được để trống nhiệm vụ");
    return;
  }
  tasks.unshift(newTask);
  renderTask();
  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputTag.value = " ";
};
function renderTask() {
  if (!tasks.length) {
    tasksList.innerHTML = `<li class="task-item">Không có nhiệm vụ</li>`;
    return;
  }
  const html = tasks
    .map((task) => {
      return `  <li class="task-item">
          <span class="task-title">${task.name}</span>
          <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">Mark as done</button>
            <button class="task-btn delete">Delete</button>
          </div>
        </li>`;
    })
    .join("");
  tasksList.innerHTML = html;
}
renderTask();
