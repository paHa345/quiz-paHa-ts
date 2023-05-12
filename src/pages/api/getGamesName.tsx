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
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/${process.env.MONGODB_DATABASE}?replicaSet=rs0`
    );
    db = client.db();
  } catch (error) {
    res.status(500).json({
      message: "Не удалось подключиться к базе данных",
    });
    return;
  }
  if (req.method === "GET") {
    try {
      const db = client.db();

      // const result = await db.collection("testQuestions").find().toArray();

      const projection = { id: 1 };
      const cursor = await db
        .collection("testQuestions")
        .find()
        .project(projection)
        .toArray();

      if (!cursor) {
        throw new Error("Не удалось получить данные");
      }

      res.status(200).json({ message: "success", item: cursor });
      return;
    } catch (error: any) {
      res.status(400).json({ message: `${error.message}` });
      return;
    }
  }
  client.close();
}

export default handler;
