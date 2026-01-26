const fs = require("fs");

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 20,
    course: "Computer Science",
    grades: {
      math: 90,
      programming: 95,
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 22,
    course: "Data Science",
    grades: {
      statistics: 88,
      machine_learning: 92,
    },
  },
  {
    id: 3,
    name: "Carol Williams",
    age: 21,
    course: "Web Development",
    grades: {
      html: 95,
      javascript: 89,
    },
  },
];

function writeDataSync() {
  fs.writeFileSync("students.json", JSON.stringify(studentData, null, 2));
  console.log("Data written synchronously");
}

function writeDataAsync() {
  fs.promises
    .writeFile("students.json", JSON.stringify(studentData, null, 2))
    .then(() => {
      console.log("Data written asynchronously");
    })
    .catch((err) => {
      console.log("Error writing data asynchronously", err);
    });
}

writeDataSync();

function readDataSync() {
  const data = fs.readFileSync("students.json", "utf-8");
  console.log("Data read synchronously", data);
  return JSON.parse(data);
}

function readDataAsync() {
  return fs.promises
    .readFile("students.json", "utf-8")
    .then((data) => {
      console.log("Data read asynchronously", data);
      return JSON.parse(data); // This return is inside the .then(), not returning from the function
    })
    .catch((err) => {
      console.log("Error reading data asynchronously", err);
    });
}

function addStudentSync(newStudent) {
  const data = readDataSync();
  data.push(newStudent);
  fs.writeFileSync("students.json", JSON.stringify(data, null, 2));
  console.log("New student added synchronously");
}

function addStudentAsync(newStudent) {
  readDataAsync()
    .then((data) => {
      data.push(newStudent);
      return fs.promises.writeFile(
        "students.json",
        JSON.stringify(data, null, 2),
      );
    })
    .then(() => {
      console.log("New student added asynchronously");
    })
    .catch((err) => {
      console.log("Error in async operation:", err);
    });
}

const newStudent = {
  id: 4,
  name: "David Brown",
  age: 23,
  course: "Cybersecurity",
  grades: {
    networking: 91,
    cryptography: 87,
  },
};

function updateStudentCourseSync(studentId, newCourse) {
  const data = readDataSync();
  const student = data.find((s) => s.id === studentId);
  if (student) {
    student.course = newCourse;
    fs.writeFileSync("students.json", JSON.stringify(data, null, 2));
    console.log("Student course updated synchronously");
  } else {
    console.log("Student not found");
  }
}

function updateStudentCourseAsync(studentId, newCourse) {
  readDataAsync()
    .then((data) => {
      const student = data.find((s) => s.id === studentId);
      if (student) {
        student.course = newCourse;
        return fs.promises.writeFile(
          "students.json",
          JSON.stringify(data, null, 2),
        );
      } else {
        throw new Error("Student not found");
      }
    })
    .then(() => {
      console.log("Student course updated asynchronously");
    })
    .catch((err) => {
      console.log("Error in async operation:", err);
    });
}

function deleteStudentSync(studentId) {
  const data = readDataSync();
  const filteredData = data.filter((s) => s.id !== studentId);
  fs.writeFileSync("students.json", JSON.stringify(filteredData, null, 2));
  console.log("Student deleted synchronously");
}

function deleteStudentAsync(studentId) {
  readDataAsync()
    .then((data) => {
      const filteredData = data.filter((s) => s.id !== studentId);
      return fs.promises.writeFile(
        "students.json",
        JSON.stringify(filteredData, null, 2),
      );
    })
    .then(() => {
      console.log("Student deleted asynchronously");
    })
    .catch((err) => {
      console.log("Error in async operation:", err);
    });
}
