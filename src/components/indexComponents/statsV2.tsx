const items = [
  {
    id: 1,
    stat: "400+ visitors",
    blurb:
      "We approach justice as something that should be accessible to everyone",
  },
  {
    id: 2,
    stat: "100% satisfaction",
    blurb: "We take pride in our service",
  },
  {
    id: 3,
    stat: "$1Bn+",
    blurb: "Anticipated savings for members of the Kalygo platform",
  },
];

export function StatsV2() {
  return (
    <div className="container mx-auto p-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <li
          key={item.id}
          className="col-span-1 flex flex-col bg-white border-0 border-blue-100 p-4 m-8 rounded-lg shadow"
        >
          <h2 className="mb-2 font-bold text-2xl text-blue-600">{item.stat}</h2>
          <p className="text-md text-justify">{item.blurb}</p>
          {/* <div className="flex flex-wrap mt-auto pt-3 text-xs">
            <button
              type="button"
              disabled={!contract.enabled}
              className="w-full focus:outline-none text-white bg-orange-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-auto dark:focus:ring-yellow-900 disabled:opacity-50"
            >
              Create
            </button>
          </div> */}
        </li>
      ))}
    </div>
  );
}
