// company data post

import { serverMuting } from "../core/server";

export const addCompany = async (newCompany) => {
  return serverMuting("/api/companies", newCompany);
};
