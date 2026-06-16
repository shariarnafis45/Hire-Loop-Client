import BrowseJobsWrapper from '@/components/jobs/BrowseJobsWrapper';
import { getJobs } from '@/lib/api/jobs';
import React from 'react';



const BrowseJobsPage = async () => {
    // 🌟 Server-side data fetching remains untouched
    const jobs = await getJobs();
   
    return (
        <BrowseJobsWrapper initialJobs={jobs} />
    );
};

export default BrowseJobsPage;