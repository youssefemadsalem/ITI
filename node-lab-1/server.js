const http = require("http");
const fs = require("fs");

// Helper function to read students
function getStudents() {
  try {
    const data = fs.readFileSync("students.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading students.json:", err);
    return [];
  }
}

const server = http.createServer((req, res) => {
  // Request logging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  const studentData = getStudents();

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Welcome to the Student Management System",
        availableRoutes: [
          "/students",
          "/stats",
          "/courses",
          "/students/search?name=xxx",
        ],
      }),
    );
  } else if (req.url === "/students") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        count: studentData.length,
        students: studentData,
      }),
    );
  } else if (req.url === "/stats") {
    const totalStudents = studentData.length;
    const averageAge =
      totalStudents > 0
        ? (
            studentData.reduce((sum, student) => sum + student.age, 0) /
            totalStudents
          ).toFixed(2)
        : 0;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        totalStudents,
        averageAge: Number(averageAge),
      }),
    );
  } else if (req.url === "/courses") {
    const courses = studentData.map((student) => student.course);
    const uniqueCourses = [...new Set(courses)];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        totalCourses: uniqueCourses.length,
        courses: uniqueCourses,
      }),
    );
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "404 Not Found",
        message: "The requested route does not exist",
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("✅ Server is running on port 3000");
  console.log("📍 Available routes:");
  console.log("   - http://localhost:3000/");
  console.log("   - http://localhost:3000/students");
  console.log("   - http://localhost:3000/stats");
  console.log("   - http://localhost:3000/courses");
});
