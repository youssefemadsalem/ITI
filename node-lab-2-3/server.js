const http = require("http");
const fs = require("fs");

const studentsData = JSON.parse(fs.readFileSync("students.json", "utf-8"));

const server = http.createServer((req, res) => {
  if (req.url === "/students") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(studentsData));
  } else if (req.url === "/stats") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        data: studentsData.length,
      }),
    );
  } else if (req.url === "/courses") {
    const courses = studentsData.map((student) => student.course);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        data: courses,
      }),
    );
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        data: "404 Page not found",
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
