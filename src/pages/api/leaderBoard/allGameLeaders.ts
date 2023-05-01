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
        .find<ILeaderBoard[]>({})
        .toArray();

      if (!result) {
        throw new Error("Error");
      }

      res.status(200).json({ message: "success", items: result });
      return;
    } catch (error) {
      res.status(400).json({ message: "error", items: error });
      return;
    }
  }
  client.close();
}

export default handler;
