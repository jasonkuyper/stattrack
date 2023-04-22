type PlayerStats = {
  id: number;
  firstName: string;
  lastName: string;
  ppg: string;
  apg: string;
  rpg: string;
  fgPercentage: string;
  threePercentage: string;
};

export default function PlayerList(): JSX.Element {
  const items: PlayerStats[] = [];

  //fetch data

  items.push({
    id: 10121309213,
    firstName: "LeBron",
    lastName: "James",
    ppg: "27.5",
    apg: "10.0",
    rpg: "10.0",
    fgPercentage: "50.5%",
    threePercentage: "30.0%",
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
            <span>{item.ppg}</span>
            <span>{item.apg}</span>
            <span>{item.rpg}</span>
            <span>{item.fgPercentage}</span>
            <span>{item.threePercentage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
