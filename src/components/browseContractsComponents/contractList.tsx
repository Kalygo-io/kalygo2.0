import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

const contracts = [
  {
    name: "Escrow",
    description: "Timed escrow agreement with currency payments",
    attributes: ["Audited"],
  },
  {
    name: "Tokenization",
    description: "Digitally Represent Assets",
    attributes: ["Audited"],
  },
  {
    name: "Lottery",
    description: "Unbiased Outcomes",
    attributes: ["Audited"],
  },
  {
    name: "Lease",
    description:
      "Delegate the usage of an asset while still retaining ownership",
    attributes: ["Audited", "Popular"],
  },
  {
    name: "Vote",
    description: "Allows parties to vote on a proposal",
    attributes: ["Audited"],
  },
  {
    name: "Treasury",
    description: "A safe way to operate a treasury with multisig features",
    attributes: ["Audited"],
  },
  {
    name: "Marketplace",
    description: "An oldie but a goodie",
    attributes: ["Audited"],
  },
  {
    name: "Bounty",
    description:
      "Guaranteed payout after a review of submitted work by a jury of your peers",
    attributes: ["Audited"],
  },
  // More people...
];

export default function ContractList() {
  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <li className="col-span-1 flex flex-col bg-white border-1 p-4 rounded-lg shadow">
            <h2 className="mb-2 font-bold text-2xl text-gray-900">
              {contract.name}
            </h2>
            <p className="text-md text-justify">{contract.description}</p>
            <div className="flex flex-wrap mt-auto pt-3 text-xs">
              {contract.attributes.map((attr) => {
                return (
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 mx-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {attr}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-wrap mt-auto pt-3 text-xs">
              <button
                type="button"
                className="w-full focus:outline-none text-white bg-orange-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-auto dark:focus:ring-yellow-900"
              >
                Create
              </button>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}
