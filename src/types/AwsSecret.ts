import { SupportedApiKeys } from "./SupportedApiKeys";

export type AwsSecret = {
  accountId: number;
  id: number;
  secretId: string;
  type: SupportedApiKeys;
  preview: string;
};
