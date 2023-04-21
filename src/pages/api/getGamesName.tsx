import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export interface IResponseGame {
  message: string;
  item: {
    _id: string;
    id: string;
    questions: {
      text: string;
      true: number;
      answers: number[];
    }[];
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;
  let db;
  try {
    client = await MongoClient.connect(
      `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/${process.env.mongodb_database}?replicaSet=rs0`
    );
    db = client.db();
  } catch (error) {
    res.status(500).json({
      message: "Не удалось подключиться к базе данных",
    });
    return;
  }
  if (req.method === "GET") {
    const db = client.db();

    const result = await db.collection("testQuestions").find().toArray();

    const projection = { id: 1 };
    const cursor = await db
      .collection("testQuestions")
      .find()
      .project(projection)
      .toArray();

    res.status(200).json({ message: "success", item: cursor });
    client.close();
  }
}

export default handler;
