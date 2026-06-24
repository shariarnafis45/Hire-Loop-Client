import { secureServerFetch, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getAllCompanies = async () => {
  return secureServerFetch(`/api/my/companies`);
};

export const getRecruiterCompanies = async (recreuiterId) => {
  return secureServerFetch(`/api/my/companies?recruiterId=${recreuiterId}`);
};

export const getLoggedInRecruiterCompanies = async () => {
  const user = await getUserSession();
  return secureServerFetch(`/api/my/companies?recruiterId=${user?.id}`);
};
