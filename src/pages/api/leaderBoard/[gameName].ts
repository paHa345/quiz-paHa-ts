import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export interface ILeaderBoard {
  message: string;
  _id: string;
  id: string;
  leaders: {
    name: string;
    points: string;
  }[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const gameName = req.query.gameName;
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
    try {
      const db = client.db();

      const result = await db
        .collection("leaderBoard")
        .findOne<ILeaderBoard[]>({ id: gameName });

      if (!result) {
        throw new Error("Не удалось найти запись в базе данных");
      }

      res.status(200).json({ message: "success", item: result });
      return;
    } catch (error: any) {
      res.status(400).json({ message: "error", item: error.message });
      return;
    }
  }
  if (req.method === "PATCH") {
    console.log(req.body);
    if (req.body.serverSecret !== "paHa345") {
      res
        .status(404)
        .json({ message: "error", item: "Неавторизованный запрос" });
      return;
    }

    try {
      const db = client.db();

      const result = await db
        .collection("leaderBoard")
        .findOneAndUpdate(
          { id: gameName },
          { $set: { leaders: req.body.leadersData } }
        );

      if (!result) {
        throw new Error("Не удалось обновить список лидеров");
      }
      res.status(200).json({ message: "success", item: result });
      return;
    } catch (error: any) {
      res.status(400).json({ message: "error", item: error.message });
      return;
    }
  }
  client.close();
}

export default handler;
