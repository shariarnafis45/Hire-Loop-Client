import React from 'react';
import RecruiterNewJobPostForm from './RecruiterNewJobPostForm';
import { getLoggedInRecruiterCompanies } from '@/lib/api/companies';

const RecruiterNewJobAddPage = async() => {
    const company = await getLoggedInRecruiterCompanies();
    
   
    return (
        <div>
            <RecruiterNewJobPostForm company={company}></RecruiterNewJobPostForm>
        </div>
    );
};

export default RecruiterNewJobAddPage;