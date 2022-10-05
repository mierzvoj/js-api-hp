// const fetchAllStudents = fetch("https://hp-api.herokuapp.com/api/characters");
// fetchAllStudents
//   .then((response) => {
//     return response.json();
//   })
//   .then((allStudents) => {
//     console.log(allStudents);
//   });

const showAllStudentsBtn = document.getElementById("show_all");
const students = [];
const renderStudents = () => {
  const fetchAllPromise = fetch("https://hp-api.herokuapp.com/api/characters");
  fetchAllPromise
    .then((response) => {
      return response.json();
    })
    .then((allStudents) => {
      const names = allStudents.map((student) => student.name).join;
    });

  const studentsList = document.getElementById("students_list");
  if (students.length === 0) {
    studentsList.classList.remove("visible");
    return;
  } else {
    studentsList.classList.add("visible");
  }
  studentsList.innerHTML = "";
  students.forEach((student) => {
    const studentEl = document.createElement("li");
    let text = student.name;
    console.log(student.name);
    studentEl.textContent = text;
    studentsList.append(studentEl);
  });
};
const addAllStudentsHandler = () => {
  const newStudent = {
    name: name,
    // date: dateOfBirth,
    // house: house,
    // wizard,
    // ancestry,
    // hogwartsStaff,
    // hogwartsStudent,
  };
  students.push(newStudent);
  renderStudents();
};

showAllStudentsBtn.addEventListener("click", addAllStudentsHandler);
