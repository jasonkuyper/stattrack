import { useRef, useState } from "react";
import styles from "./SearchPlayer.module.css";
import useSWR from "swr";

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
type PlayerStats = {
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
};

export default function SearchPlayer() {
  const playerInput = useRef<HTMLInputElement>(null);

  const [players, setPlayers] = useState<PlayerStats[]>([]);

  function searchPlayer(input: HTMLInputElement | null) {
    if (input === null) return;
    console.log(input.value);
    // input = e.target.value;
    // console.log(input);

    //find player id based on input

    // fetch("https://www.balldontlie.io/api/v1/season_averages/217")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log());
  }

  const { data, error, isLoading } = useSWR(
    "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=237",
    searchPlayer
  );

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
    </>
  );
}
