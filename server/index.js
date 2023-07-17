// auth.js
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root123",
  database: "Loginandregister",
});

app.post("/register", async (req, res) => {
  const { email, password , name} = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql =
      "INSERT INTO logandreg (email, password, name) VALUES (?, ?, ?)";
    db.query(sql, [email, hashedPassword, name], (error, result) => {
      if (error) {
        res.status(500).json({ error });
    } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM logandreg WHERE email = ?";
  db.query(sql, [email], async (error, result) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      if (result.length > 0) {
        const validPassword = await bcrypt.compare(password, result[0].password);

        if (validPassword) {
          const token = jwt.sign({ id: result[0].id, email: result[0].email }, "your_jwt_secret_key", { expiresIn: "1h" });
          res.status(200).json({ message: "Login successful", token, name: result[0].name });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

