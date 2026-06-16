// company data post

import { serverFetch, serverMuting } from "../core/server";

export const addCompany = async (newCompany) => {
  return serverMuting("/api/companies", newCompany);
};
