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

    server.use("/graphql", graphqlExpress({ schema, context: { Catf } })); //Catf จากด้านบน แล้วไปดูที่ไฟล์ Schema.js ว่ามันส่งอะไรไป

    server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

    server.get("*", (req, res) => {
      return handle(req, res);
    });
    
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });


