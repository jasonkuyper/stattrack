import { useRef, useState } from "react";
import styles from "./SearchPlayer.module.css";
import useSWR from "swr";
import PlayerList from "./PlayerList";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

export interface PlayerStats {
  games_played: number;
  player_id: number;
  season: number;
  min: string;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
}

export default function SearchPlayer() {
  const playerInput = useRef<HTMLInputElement>(null);

  const [players, setPlayers] = useState<any[]>([]);

  //OLD PARSE SEARCH
  // function parseSearch(string: string) {
  //   string = string.trim();
  //   const arr = string.split(" ");
  //   if (arr.length > 2) {
  //     console.log("arr length: ", arr.length);
  //     return TypeError("Invalid name");
  //   }
  //   const firstName = arr[0];
  //   const lastName = arr[1];
  //   return { firstName, lastName };
  // }

  function parseSearch(string: string) {
    // Use regex to split the string into an array of words
    let words = string.split(/\s+/).filter(Boolean);
    const firstName = words.shift();
    const lastName = words.join(" ");
    return { firstName, lastName };
  }

  /**
   * Function that fetches player data and updates items with retrieved data
   * @param input HTMLInputElement
   * @returns {null} Always returns null
   */
  async function searchPlayer(input: HTMLInputElement | null) {
    if (input === null) return;
    console.log(input.value);
    const name = parseSearch(input.value);

    console.log("input is ", input.value);
    console.log("name is ", name);

    if (name instanceof TypeError) {
      console.log(name.message);
      alert(name.message);
      return;
    }
    const { firstName, lastName } = name;

    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName }),
    });
    const data = await response.json();
    console.log("data is : ", data);
    setPlayers([...players, data]);
  }

  // const { data, error, isLoading } = useSWR(
  //   "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237",
  //   searchPlayer
  // );

  return (
    <>
      <label
        htmlFor="player"
        className="block font-black text-xl font-medium leading-6 text-gray-900"
      >
        Add Player
      </label>
      <div className="flex mt-2 w-[50dvw]">
        <input
          ref={playerInput}
          type="text"
          name="player"
          id="player"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search For Player..."
        />
        <button
          className={styles["search-button"]}
          onClick={() => searchPlayer(playerInput.current)}
        >
          Search
        </button>
      </div>
      <PlayerList players={players} />
    </>
  );
}
