// new job post

import { serverMuting } from "../core/server";

export const createNewJob = async (newJobData) => {
  return serverMuting("/api/jobs", newJobData);
};
