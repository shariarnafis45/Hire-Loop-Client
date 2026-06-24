import { secureServerFetch, serverFetch } from "../core/server";

export const getapplicatAppliedJobs = async (applicantId) => {
  return secureServerFetch(`/api/applications?applicantId=${applicantId}`);
};
