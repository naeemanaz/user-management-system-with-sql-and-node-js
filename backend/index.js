const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

//Get all User

app.get("/user", (req, res) => {
  db.query("SELECT * FROM user", (error, rows) => {
    if (!error) {
      res.status(200);
      res.json(rows);
    } else {
      res.status(500);
      res.json({ error: error, message: error.message });
    }
  });
});
//Get an User
app.get("/user/:id", (req, res) => {
  db.query(
    "SELECT * FROM user WHERE ID = ?",
    [req.params.id],
    (error, rows, fields) => {
      if (!error) {
        res.status(200);
        res.json(rows);
      } else {
        res.status(500);
        res.json({ error: error, message: error.message });
      }
    }
  );
});
//Delete an User
app.delete("/user/:id", (req, res) => {
  db.query(
    "DELETE FROM user WHERE ID = ?",
    [req.params.id],
    (error, rows, fields) => {
      if (!error) {
        res.status(200);
        res.json({ res: " User Deleted successfully.", susses: true });
      } else {
        res.status(500);
        res.json({ error: error, message: error.message, susses: false });
      }
    }
  );
});

//Update an Insert
app.post("/user", (req, res) => {
  const { name, email, gender, number, address, image, pdf } = req.body;
  // contains non-file fields
  var sql =
    "INSERT INTO user (name,email,gender,number,address,image,pdf) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sql,
    [ name, email, gender, number, address, image, pdf],
    (error, rows, fields) => {
      if (!error) {
        res.status(200);
        res.json({
          message: rows.message,
          res: "User Inserted successfully",
          susses: true,
        });
      } else {
        res.status(500);
        res.json({
          error: error,
          message: error.message,
          res: error.sqlMessage,
        });
      }
    }
  );
});

app.put("/user", (req, res) => {
  const { id, name, email, gender, number, address, image, pdf } = req.body;
  const sql = `UPDATE user  SET ${name ? `name = "${name}",` : ""}   ${
    email ? `email = "${email}",` : ""
  }   ${gender ? `gender = "${gender}",` : ""}   ${
    number ? `number = "${number}",` : ""
  }   ${address ? `address = "${address}",` : ""}  ${
    pdf ? `pdf = "${pdf}",` : ""
  } ${image ? `image = "${image}"` : ""}   WHERE id="${id}";`;
  db.query(sql, (error, rows, fields) => {
    if (!error) {
      res.status(200);
      res.json({
        message: rows.message,
        res: "user data updated successfully",
        susses: true,
      });
    } else {
      res.status(500);
      res.json({
        error: error,
        message: error.message,
        res: "user not data updated",
        susses: false,
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
