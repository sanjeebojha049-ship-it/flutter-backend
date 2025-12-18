const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Load users
let users = [];
if (fs.existsSync("users.json")) {
  users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
}

// SIGNUP
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false });

  if (users.find((u) => u.email === email))
    return res.status(409).json({ success: false });

  users.push({ email, password });
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.status(201).json({ success: true });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user)
    return res.status(401).json({ success: false });

  res.json({ success: true });
});

app.listen(PORT, () =>
  console.log("🚀 Server running on port " + PORT)
);
