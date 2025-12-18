const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Root route (IMPORTANT for browser test)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Load users
let users = [];
if (fs.existsSync("users.json")) {
  users = JSON.parse(fs.readFileSync("users.json"));
}

// SIGNUP (POST)
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Missing fields" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "User exists" });
  }

  users.push({ email, password });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ success: true });
});

// LOGIN (POST)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
