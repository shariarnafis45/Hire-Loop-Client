import BrowseJobsWrapper from "@/components/jobs/BrowseJobsWrapper";
import { getJobs } from "@/lib/api/jobs";
import React from "react";

const BrowseJobsPage = async ({ searchParams }) => {
  const filter = await searchParams;
  const querySearch = new URLSearchParams(filter);
  const queryStr = querySearch.toString();

  const { jobs, total } = await getJobs(queryStr);

  return <BrowseJobsWrapper filter={filter} jobs={jobs} total={total} />;
};

export default BrowseJobsPage;
