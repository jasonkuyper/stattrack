// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

interface Data {}
interface Error {
  message: string;
}

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "POST") {
    // Process a POST request
    const { firstName, lastName } = req.body;
    console.log("firstName ", firstName.toLowerCase());
    console.log("lastName ", lastName.toLowerCase());
    const player = await prisma.player.findFirst({
      where: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      },
    });
    console.log("player is : ", player);
    if (player !== null) console.log("player.statsId is : ", player.statsId);
    if (player === null) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    //call balldontlie api with player name
    const url = `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player.statsId}`;
    const response = await fetch(url);
    let data = await response.json();
    data = data.data[0];
    console.log("data is : ", data);
    const result = {
      ...data,
      ...player,
    };

    res.status(200).json(result);
  }
}
