const dotenv = require("dotenv");
const { Pool } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
dotenv.config();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db secret
const mongDbSecret = {
  user: process.env.MONGO_USER,
  host: process.env.MONGO_HOST,
  database: process.env.MONGO_DATABASE,
  password: process.env.MONGO_PASSWORD,
  port: process.env.MONGO_PORT,
};

const uri = `mongodb://${mongDbSecret.user}:${mongDbSecret.password}@${mongDbSecret.host}:${mongDbSecret.port}`;
const dbName = mongDbSecret.database;

const pool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DATABASE,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.POSTGRE_PORT, // PostgreSQL 포트 번호
  max: 20, // Connection Pool의 최대 연결 수
  idleTimeoutMillis: 30000, // 연결이 유휴 상태로 유지되는 시간 (밀리초)
});

//axios테스트
app.get("/testget", (req, res, next) => {
  res.json(JSON.stringify("리더보드 연결됐엉"));
});

app.post("/postest", (req, res) => {
  console.log(req.body);
  req.body.message = "리더보드 성공했어!";
  res.json(req.body);
});

app.listen(port, () => console.log("Server is running on : " + port));
