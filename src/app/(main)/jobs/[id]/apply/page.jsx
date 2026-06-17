import RecruiterApplyError from '@/components/jobs/RecruiterApplyError';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const JobApplyPage = async({params}) => {
    const {id} = await params
    const user = await getUserSession();
    if(!user){
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
    }
    if(user.role !== 'seeker'){
        return(
            <RecruiterApplyError jobId={id}/>
        )
    }
    return (
        <div>
            apply
        </div>
    );
};

export default JobApplyPage;