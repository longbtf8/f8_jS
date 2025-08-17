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

  inputTag.value = "";
};
function renderTask() {
  if (!tasks.length) {
    tasksList.innerHTML = `<li class="task-item">Không có nhiệm vụ</li>`;
    return;
  }
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";
    const span = document.createElement("span");
    span.className = "task-title";
    const div = document.createElement("div");
    div.className = "task-action";
    const btn = document.createElement("button");
    btn.className = "task-btn edit";
    const btn2 = document.createElement("button");
    btn2.className = "task-btn done";
    const btn3 = document.createElement("button");
    btn3.className = "task-btn delete";

    span.textContent = task.name;
    btn.textContent = "Edit";
    btn2.textContent = "Mark";
    btn3.textContent = "Delete";

    tasksList.appendChild(item);
    item.append(span, div);
    div.append(btn, btn2, btn3);
  });
}
renderTask();
