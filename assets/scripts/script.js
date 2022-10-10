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
      td.style.cursor = "pointer";
      td.addEventListener("click", () => {
        const desc = td.classList.contains("asc") ? true : false;
        if (desc) {
          td.classList.remove("asc");
          td.classList.add("desc");
        }
        if (!desc) {
          td.classList.remove("desc");
          td.classList.add("asc");
        }
        createTableBodyContent(tBody, columns, students, key, desc);
      });
    }
  }

  const tBody = tbl.createTBody();
  createTableBodyContent(tBody, columns, students);
  container.appendChild(tbl);
}
function createTableBodyContent(tBody, columns, students, sortColumn, desc) {
  tBody.innerHTML = "";
  let result = students.slice();
  if (sortColumn) {
    const sign = desc ? -1 : 1;
    result.sort((a, b) => (a[sortColumn] > b[sortColumn] ? 1 : -1) * sign);
  }
  for (let i = 0; i < result.length; i++) {
    const tr = tBody.insertRow();
    tr.addEventListener("dblclick", () => openModal(result[i]));
    for (let j = 0; j < columns.length; j++) {
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(result[i][columns[j]]));
      td.style.border = "1px solid black";
    }
  }
}

function openModal(student) {
  const modal = document.getElementById("myModal");
  const content = document.getElementById("myModalContent");
  content.innerHTML = "";
  for (const key of Object.keys(student)) {
    const span = document.createElement("span");
    const br = document.createElement("br");
    span.innerText = `[${key}]: ${student[key]}`;
    content.appendChild(span);
    content.appendChild(br);
  }
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target == modal) {
    closeModal();
  }
};

const addAllStudentsHandler = () => {
  renderStudents();
};

showAllStudentsBtn.addEventListener("click", addAllStudentsHandler);
