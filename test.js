const url =
  "https://www.balldontlie.io/api/v1/stats?seasons[]=2022&player_ids[]=237";

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "ed9eaa5a66msh89548180b5a1cd9p122be5jsn56528e95f690",
//     "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
//   },
// };

fetch(url)
  .then((res) => res.json())
  .then((json) => {
    console.log("here", json.data);
    console.log("data length: ", json.data.length);
  })
  .catch((err) => console.error("error:" + err));
