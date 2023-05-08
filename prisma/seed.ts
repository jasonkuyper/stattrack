// import { PrismaClient } from "@prisma/client";
const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();
async function main() {
  try {
    const response = await fetch(
      "https://data.nba.net/data/10s/prod/v1/2022/players.json"
    );
    const data = await response.json();
    const players = data.league.standard;
    // console.log(players);
    players.forEach(async (player: any) => {
      const createPlayer = await prisma.player.upsert({
        where: { id: Number(player.personId) },
        update: {},
        create: {
          id: Number(player.personId),
          firstName: player.firstName,
          lastName: player.lastName,
          teamId: player.teamId,
          jersey: player.jersey,
          pos: player.pos,
          heightFeet: player.heightFeet,
          heightInches: player.heightInches,
          weightPounds: player.weightPounds,
          dateOfBirthUTC: player.dateOfBirthUTC,
          yearsPro: player.yearsPro,
          collegeName: player.collegeName,
          country: player.country,
        },
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
