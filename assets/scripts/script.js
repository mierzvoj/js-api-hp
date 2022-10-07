const showAllStudentsBtn = document.getElementById("show_all");
const students = [];
const renderStudents = () => {
  const fetchAllPromise = fetch("https://hp-api.herokuapp.com/api/characters");
  fetchAllPromise
    .then((response) => {
      return response.json();
    })
    .then((students) => {
      const names = students.map((student) => student.name);
      const studentsList = document.getElementById("students_list");
      if (students.length === 0) {
        studentsList.classList.remove("visible");
        return;
      } else {
        studentsList.classList.add("visible");
      }
      listCreate(studentsList, students);
      tableCreate(studentsList, students);
    });
};
function listCreate(container, students) {
  container.innerHTML = "";
  students.forEach((student) => {
    const studentEl = document.createElement("li");
    let text = student.name;
    console.log(student.name);
    studentEl.textContent = text;
    container.append(studentEl);
  });
}
function tableCreate(container, students) {
  const tbl = document.createElement("table");
  tbl.style.width = "100px";
  tbl.style.border = "1px solid black";
  const columns = [];

  if (students.length) {
    const tHeader = tbl.createTHead();
    const tr = tHeader.insertRow();
    tr.style.fontWeight = "bold";
    for (const key of Object.keys(students[0])) {
      columns.push(key);
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(key));
      td.style.border = "1px solid black";
    }
  }

  const tBody = tbl.createTBody();
  for (let i = 0; i < students.length; i++) {
    const tr = tBody.insertRow();
    for (let j = 0; j < columns.length; j++) {
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(students[i][columns[j]]));
      td.style.border = "1px solid black";
    }
  }
  container.appendChild(tbl);
}

const addAllStudentsHandler = () => {
  renderStudents();
};

showAllStudentsBtn.addEventListener("click", addAllStudentsHandler);
