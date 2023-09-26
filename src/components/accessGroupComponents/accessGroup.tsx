import { PaperClipIcon } from "@heroicons/react/20/solid";
import { MembersTable } from "./membersTable";
import { SummariesTable } from "./summariesTable";
import { CustomRequestsTable } from "./customRequestsTable";
import { PromptsTable } from "./promptsTable";

interface P {
  accessGroup: any;
  refresh: any;
}

export function AccessGroup(p: P) {
  const { accessGroup, refresh } = p;

  console.log("accessGroup", accessGroup);

  return (
    <>
      <div className="px-4 sm:px-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900">
          {accessGroup.name} ({accessGroup.id})
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Created at: {new Date(accessGroup.createdAt).toLocaleString()}
        </p>
      </div>

      <MembersTable
        accessGroup={accessGroup}
        members={accessGroup.Members}
        refresh={refresh}
      />

      <SummariesTable
        accessGroup={accessGroup}
        summaries={accessGroup.SummariesAndAccessGroups}
        refresh={refresh}
      />

      <CustomRequestsTable
        accessGroup={accessGroup}
        customRequests={accessGroup.CustomRequestsAndAccessGroups}
        refresh={refresh}
      />

      <PromptsTable
        accessGroup={accessGroup}
        prompts={accessGroup.PromptsAndAccessGroups}
        refresh={refresh}
      />
    </>
  );
}
