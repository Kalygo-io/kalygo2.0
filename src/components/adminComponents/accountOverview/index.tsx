import { useState } from "react";
import { Credits } from "./credits";
import { Personal } from "./personal";
import { Divider } from "@/components/shared/Divider";
import { ActivityTable } from "./activity";
import { Context } from "./context";
import { ChargesTable } from "./chargesTable";

const subAccountNavigation: {
  name: "General" | "Activity" | "Context" | "Billing";
}[] = [
  { name: "General" },
  { name: "Activity" },
  { name: "Context" },
  { name: "Billing" },
];

interface P {
  account: any;
}

export function AccountOverview(p: P) {
  const { account } = p;

  const [tab, setTab] = useState<
    "General" | "Activity" | "Context" | "Billing"
  >("General");

  return (
    <main>
      <header className="border-b border-white/5">
        <nav className="flex overflow-x-auto py-4">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
          >
            {subAccountNavigation.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer"
                onClick={() => {
                  setTab(item.name);
                }}
              >
                <span className={item.name === tab ? "text-blue-600" : ""}>
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {tab === "General" && (
        <>
          <Personal account={account} />
          <Divider />
          <Credits account={account} />
        </>
      )}

      {tab === "Activity" && (
        <>
          <ActivityTable activity={account.activity || []} />
        </>
      )}
      {tab === "Context" && <Context />}
      {tab === "Billing" && <ChargesTable />}
    </main>
  );
}
