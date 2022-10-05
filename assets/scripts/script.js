const fetchAllStudents = fetch("https://hp-api.herokuapp.com/api/characters");
fetchAllStudents
  .then((response) => {
    return response.json();
  })
  .then((allStudents) => {
    const crucialData = allStudents
      .map((allStudents) => allStudents.name)
      .join("\n");
    console.log(crucialData);
  });
