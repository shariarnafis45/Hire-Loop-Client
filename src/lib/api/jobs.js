// get company active jobs

import { serverFetch } from "../core/server";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const getCompanyJobs = async (companyId, status = "active") => {
  const res = await fetch(
    `${serverUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return res.json();
};

// get all jobs

export const getJobs = async () => {
  return serverFetch(`/api/jobs`);
};
