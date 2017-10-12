require("dotenv").config(); // .env. บลาๆ ไปตั้งเอานาจาา

import { createServer } from "http";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import bodyParser from "body-parser";
import express from "express";
import next from "next";

import resolvers from "./resolvers";
import typeDefs from "./schema";

// set ตัวเซิฟเฉยๆ
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// อันนี้ของ MongoDB ---------------------------------------------
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test"); //แก้ตรงนี้เป็นชื่อของเราเองตามสะดวกกกเบยยยย

const { Schema } = mongoose; //เรียกแบบนี้ก็ได้นะแทน mongoose.Schema

// อันนี้ไว้ใส่ด้านล่าง Schema ของ mongoDB
const BandNew = new Schema({
  name: String,
  age: Number
});

// const Cat = mongoose.model('CatEiei', { name: String }); Example Schema ของ mongoDB
const Catf = mongoose.model("gggg", BandNew); // Catf จะส่งไปหน้า Resolver ส่วน "ggggg" ลองเข้าไปดูใน mongoDB จะเก็ทเองง

// schema ด้านล่างคือมาจาก Graphql : makeExecutableSchema({ชื่อ schema , ตัวที่ใช้ resolvers})
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

///////////////////////////////////////

// เริ่ม Run server
nextApp
  .prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.json());

    // ส่วนนี้ก็ส่ง MiddleWare ตามปกติ ตัวอย่างเฉยๆ ไม่ต้อง uncommnet
    // --------------------------------------------------------------------

    // server.use(express.static(path.join(__dirname, "../client/static")));
    // server.use(verifyToken);

    // --------------------------------------------------------------------

    server.use("/graphql", graphqlExpress({ schema, context: { Catf } })); //Catf จากด้านบน แล้วไปดูที่ไฟล์ Schema.js ว่ามันส่งอะไรไป

    server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

    //  uncomment ลองดูก็ได้นะด้านล่างแล้วไปที่ /eiei
    // ---------------------------------------------------------------
    // server.get('/eiei', (req, res) => {
    //   return nextApp.render(req, res, '/here', req.query)
    // }) หมายความว่าถ้า User ไปที่ localhost:3000/eiei จะ render ไปที่ pages/here.js
    // ----------------------------------------------------------------

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });

    // // ---- HTTPS --- ใช้อันนี้
    // const app = createServer(server);

    // app.listen(port, err => {
    //   if (err) throw err;
    //   console.log(`> Ready on http://localhost:${port}`);
    // });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

//เทสสสสสสสสสสสสสส ใช้ ESใหม่มี Classs เฉยๆ ไม่มีไรก็อปเค้ามาลองเล่นเฉยๆ 55555
// --------------------------------------------------------------------------------------------

const arr = ["s", "dddd", "dfdfdf"];
const sfr = [...arr];

console.log(sfr);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }
  toString() {
    return super.toString() + " in " + this.color;
  }
}

let cp = new ColorPoint(25, 8, "green");
cp.toString(); // '(25, 8) in green'

console.log(cp instanceof ColorPoint); // true
console.log(cp instanceof Point); // true
/////////////////////////////////////
