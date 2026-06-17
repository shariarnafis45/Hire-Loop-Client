import { serverFetch, serverMuting } from "../core/server";

export const addJobApplication = async (newApplication) => {
  return serverMuting("/api/applications", newApplication);
};