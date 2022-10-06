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
      const names = allStudents.map((student) => student.name).join("\n");
      console.log(names);
      students.push(names);
      const studentsList = document.getElementById("students_list");
      if (students.length === 0) {
        studentsList.classList.remove("visible");
        return;
      } else {
        studentsList.classList.add("visible");
      }
      studentsList.innerHTML = students;
      // students.forEach((student) => {
      //   const studentEl = document.createElement("li");

      //   studentEl.textContent = "";
      //   studentsList.append(studentEl);

      //   studentsList.innerHTML = studentEl;
      // });
    });
};
const addAllStudentsHandler = () => {
  renderStudents();
};

showAllStudentsBtn.addEventListener("click", addAllStudentsHandler);
