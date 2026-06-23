// company data post

import { serverFetch, serverMuting } from "../core/server";

export const addCompany = async (newCompany) => {
  return serverMuting("/api/companies", newCompany);
};

export const updateCompanyStatus = async (id, data) => {
  return serverMuting(`/api/companies/${id}`, data, "PATCH");
};
