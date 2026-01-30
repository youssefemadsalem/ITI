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

function writeSync(studentsData) {
  fs.writeFileSync("students.json", JSON.stringify(studentsData));
}
async function writeAsync(studentsData) {
  try {
    await fs.promises.writeFile("students.json", JSON.stringify(studentsData));
  } catch (error) {
    console.log(error);
  }
}

function readSync() {
  const studentsData = JSON.parse(fs.readFileSync("students.json", "utf-8"));
  return studentsData;
}
async function readAsync() {
  try {
    const studentsData = await fs.promises.readFile("students.json", "utf-8");
    const parsedStudentsData = JSON.parse(studentsData);
    return parsedStudentsData;
  } catch (error) {
    return error;
  }
}

function addStudentSync(newStudent) {
  const studentsData = readSync();
  studentsData.push(newStudent);
  writeSync(studentsData);
}
async function addStudentAsync(newStudent) {
  try {
    const studentsData = await readAsync();
    studentsData.push(newStudent);
    await writeAsync(studentsData);
  } catch (error) {
    console.log(error);
  }
}

const newStudent = {
  id: 4,
  name: "Ali Afify",
  age: 22,
  course: "Web Development",
  grades: {
    html: 97,
    javascript: 95,
  },
};

writeSync(studentData);
addStudentSync(newStudent);
console.log(readSync());
