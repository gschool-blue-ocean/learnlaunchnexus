import middlewareAUTH from "./middlewareAUTH.js";
import jwtGenerator from "./jwtGenerator.js";
import middlewareValidInfo from "./middlewareValidInfo.js";
import pool from "../db.js";
import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/updatePass/:pass", middlewareValidInfo, async (req, res) => {
  try {
    

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(req.params.pass , salt);

    const newUser = await pool.query(
      "UPDATE authentication SET user_password = $2 WHERE user_password = $1 returning *", [req.params.pass,bcryptPassword],
    );

    return res.json( newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});


router.post("/register", middlewareValidInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM authentication WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length !== 0) {
      return res.status(402).send("User already exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO authentication(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.post("/login", middlewareValidInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM authentication WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length < 1) {
      return res.status(404).send("User not found...");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).send("Incorrect name or email...");
    }

    const token = jwtGenerator(user.rows[0].user_id);

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

router.get("/verify", middlewareAUTH, async (req, res) => {
  try {
    console.log(req)
    return res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

export default router;
