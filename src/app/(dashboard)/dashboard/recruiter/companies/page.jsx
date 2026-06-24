import CompaniesClientWrapper from "@/components/dashboard/CompaniesClientWrapper";
import { getRecruiterCompanies } from "@/lib/api/companies";

import { getUserSession } from "@/lib/core/session";
import React from "react";

const RecruiterCompanyPage = async () => {
  const user = await getUserSession();

  const companiesData = await getRecruiterCompanies(user?.id);
  console.log(companiesData);

  return (
    <div>
      <CompaniesClientWrapper
        recruiter={user}
        initialCompanies={companiesData}
      />
    </div>
  );
};

export default RecruiterCompanyPage;
