import { getJobs } from '@/lib/api/jobs';
import React from 'react';
import BrowseJobsWrapper from './BrowseJobsPage';


const BrowseJobsPage = async () => {
    // 🌟 Server-side data fetching remains untouched
    const jobs = await getJobs();
   
    return (
        <BrowseJobsWrapper initialJobs={jobs} />
    );
};

export default BrowseJobsPage;