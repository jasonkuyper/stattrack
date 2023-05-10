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
    players.forEach(async (player) => {
      const createPlayer = await prisma.player.upsert({
        where: { id: Number(player.personId) },
        update: {},
        create: {
          id: Number(player.personId),
          firstName: player.firstName,
          lastName: player.lastName,
          teamId: Number(player.teamId),
          jersey: player.jersey,
          pos: player.pos,
          heightFeet: player.heightFeet,
          heightInches: player.heightInches,
          weightPounds: player.weightPounds,
          dateOfBirthUTC: player.dateOfBirthUTC,
          yearsPro: player.yearsPro,
          collegeName: player.collegeName,
          country: player.country,
          statsId: -1,
        },
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }

  //adding statsId to player table
  const updatePlayer = async (players, start) => {
    try {
      //iterate through 5 players at a time for each call (to throttle api calls)
      for (let i = start - 5; i < start; i++) {
        if (i >= players.length) return true;
        const player = players[i];
        // console.log("player is: ", player);
        console.log(player.firstName, player.lastName);
        //filter first and last name for api call
        const firstNameSearch = player.firstName
          .replace(/\./g, "")
          .toLowerCase();
        const lastNameSearch = player.lastName.split(" ")[0].toLowerCase();
        console.log("firstNameSearch` is: ", firstNameSearch);
        console.log("lastNameSearch is: ", lastNameSearch);
        //call balldontlie api to get statsId
        const response = await fetch(
          `https://www.balldontlie.io/api/v1/players?search=${firstNameSearch}%20${lastNameSearch}`
        );
        const data = await response.json();
        if (data.data[0] === undefined) continue;
        // console.log("player data is : ", data.data[0]);
        const statsId = data.data[0].id;
        // update player with statsId
        const updatedPlayer = await prisma.player.update({
          where: { id: player.id },
          data: {
            statsId,
            firstName: player.firstName.toLowerCase(),
            lastName: player.lastName.toLowerCase(),
          },
        });
        console.log("updatedPlayer: ", updatedPlayer);
      }
    } catch (error) {
      console.error("Error: player statsId couldn't be found. ", error);
    }
  };

  const findPlayers = async () => {
    try {
      const players = await prisma.player.findMany();
      // const players = await prisma.player.findFirst({
      //   where: { firstName: "Kostas" },
      // });
      // console.log("player is : ", players);
      return players;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const populateStatIds = async () => {
    const players = await findPlayers();
    // console.log("players: ", players);
    let start = 5;
    const playerInterval = setInterval(
      async () => {
        console.log("start is : ", start);
        let update = await updatePlayer(players, start);
        if (update === true) clearInterval(playerInterval);
        start += 5;
      },
      6000,
      players,
      start
    );
  };

  populateStatIds();
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
