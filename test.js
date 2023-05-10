const url =
  "https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=237";

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "ed9eaa5a66msh89548180b5a1cd9p122be5jsn56528e95f690",
//     "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
//   },
// };

// fetching data from api
// fetch(url)
//   .then((res) => res.json())
//   .then((json) => {
//     console.log("here", json.data);
//     console.log("data length: ", json.data.length);
//   })
//   .catch((err) => console.error("error:" + err));

const name = "Lebron James ";

function parseSearch(string) {
  string = string.trim();
  const arr = string.split(" ");
  if (arr.length > 2) {
    console.log("arr length: ", arr.length);
    return TypeError("Invalid name");
  }
  const firstName = arr[0];
  const lastName = arr[1];
  return { firstName, lastName };
}

const prismaClient = require("@prisma/client");
const prisma = new prismaClient.PrismaClient();

//adding statsId to player table
const updatePlayer = async (players, start) => {
  try {
    //iterate through 5 players at a time for each call (to throttle api calls)
    for (let i = start - 5; i < start; i++) {
      console.log("players' length ", players.length);
      if (i >= players.length) {
        return;
      }
      const player = players[i];
      //call balldontlie api to get statsId
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?search=${player.firstName.toLowerCase()}%20${player.lastName.toLowerCase()}`
      );
      const data = await response.json();
      const statsId = data.data[0].id;
      // update player with statsId
      const updatedPlayer = await prisma.player.update({
        where: { id: player.id },
        data: { statsId },
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const findPlayers = async () => {
  try {
    const players = await prisma.player.findMany();
    return players;
  } catch (error) {
    console.error("Error:", error);
  }
};

const populateStatIds = async () => {
  const players = await findPlayers();
  // console.log("players: ", players);
  let start = 5;
  const playerInterval = setInterval(
    () => {
      updatePlayer(players, start);
      if (start >= players.length) clearInterval(playerInterval);
      start += 5;
    },
    6000,
    players,
    start
  );
};

populateStatIds();
