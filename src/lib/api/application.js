import { serverFetch } from "../core/server";

export const getapplicatAppliedJobs = async (applicantId) => {
  return serverFetch(`/api/applications?applicantId=${applicantId}`);
};
