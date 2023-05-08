import useSWR from "swr";

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

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data.data;
};

export default function PlayerList() {
  const items = [];

  //fetch data

  // if (error) return "An error has occurred.";
  // if (isLoading) return "Loading...";

  items.push({
    id: 10121309213,
    firstName: "LeBron",
    lastName: "James",
    pts: "27.5",
    ast: "10.0",
    reb: "10.0",
    fg_pct: "50.5%",
    fg3_pct: "30.0%",
  });

  console.log(items);

  return (
    <div
      className="w-[50dvw] mt-4
    "
    >
      <ul role="list" className="space-y-3 w-full">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-around overflow-hidden bg-white px-4 py-4 shadow sm:rounded-md sm:px-6"
          >
            <span>
              {item.firstName} {item.lastName}
            </span>
            <span>{item.pts}</span>
            <span>{item.ast}</span>
            <span>{item.reb}</span>
            <span>{item.fg_pct}</span>
            <span>{item.fg3_pct}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
