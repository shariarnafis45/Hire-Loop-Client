import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getAllCompanies = async () => {
  return serverFetch(`/api/my/companies`);
};

export const getRecruiterCompanies = async (recreuiterId) => {
  return serverFetch(`/api/my/companies?recruiterId=${recreuiterId}`);
};

export const getLoggedInRecruiterCompanies = async () => {
  const user = await getUserSession();
  return serverFetch(`/api/my/companies?recruiterId=${user?.id}`);
};
