import { PlayerStats } from "./SearchPlayer";
import Image from "next/image";
// type PlayerStats = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   ppg: string;
//   apg: string;
//   rpg: string;
//   fgPercentage: string;
//   threePercentage: string;
// };

export default function PlayerList({ players }: any) {
  return (
    <div
      className="w-[75dvw] mt-4
    "
    >
      <ul role="list" className="space-y-3 w-full">
        {players.map((player: any) => (
          <li
            key={player.id}
            className="flex items-center justify-around overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
          >
            <span>
              <Image
                alt="player headshot"
                src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`}
                width={100}
                height={100}
              />
            </span>
            <span>
              {player.firstName} {player.lastName}
            </span>
            <span>{player.pts} PTS</span>
            <span>{player.ast} AST</span>
            <span>{player.reb} REB</span>
            <span>{player.fg_pct * 100} FG%</span>
            <span>{player.fg3_pct * 100} 3 PT%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
