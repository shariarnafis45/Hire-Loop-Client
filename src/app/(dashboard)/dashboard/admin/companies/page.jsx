import { getAllCompanies } from '@/lib/api/companies';
import React from 'react';
import { Building2, Clock, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import CompanyActionButtons from '@/components/dashboard/admin/CompanyActionButtons';


const AdminCompaniesManagePage = async () => {
  const companies = await getAllCompanies() || [];

  const pendingCount = companies.filter(c => c.status === 'pending').length;
  const approvedCount = companies.filter(c => c.status === 'approved').length;
  const rejectedCount = companies.filter(c => c.status === 'rejected').length;

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto min-h-screen bg-neutral-50 dark:bg-[#09090b] text-neutral-800 dark:text-zinc-300 transition-colors duration-300">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-1 border-b border-neutral-200 dark:border-zinc-800/50 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white flex items-center gap-3">
          Company Registrations
          <span className="text-[11px] font-bold uppercase tracking-widest bg-amber-600/10 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-600/20 dark:border-amber-500/20 px-2.5 py-1 rounded-md">
            Admin Console
          </span>
        </h1>
        <p className="text-sm text-neutral-500 dark:text-zinc-500">
          Review and manage corporate entity access requests for the HireLoop ecosystem.
        </p>
      </div>

     
      <div className="bg-white dark:bg-[#121214]/80 border border-neutral-200 dark:border-zinc-800/80 backdrop-blur-xl rounded-[1.5rem] overflow-hidden shadow-[0_12px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider font-bold text-neutral-400 dark:text-zinc-500 bg-neutral-50/70 dark:bg-[#0c0c0e]/60">
                <th className="py-4 px-6">Company Name</th>
                <th className="py-4 px-6">Industry</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date Submitted</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-zinc-900 text-[14px]">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-neutral-400 dark:text-zinc-600 font-medium tracking-wide">
                    No company registrations currently in the pipeline.
                  </td>
                </tr>
              ) : (
                companies.map((company) => {
                  const dateObj = company.createdAt?.$date || company.createdAt;
                  const formattedDate = dateObj 
                    ? new Date(dateObj).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'N/A';

                  const companyIdString = company._id?.$oid || company._id;

                  return (
                    <tr key={companyIdString} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/40 transition-all duration-300 group">
                      
                      {/* Company Logo & Premium Hover Text */}
                      <td className="py-4 px-6 font-medium">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-900 overflow-hidden border border-neutral-200 dark:border-zinc-800 flex-shrink-0 flex items-center justify-center relative shadow-sm group-hover:border-amber-600/40 dark:group-hover:border-amber-500/30 transition-colors">
                            {company.logo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                            ) : (
                              <Building2 size={18} className="text-neutral-400 dark:text-zinc-600" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-neutral-900 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                              {company.name}
                            </span>
                            {company.website && (
                              <a href={company.website} target="_blank" rel="noreferrer" className="text-[11px] text-neutral-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-0.5 mt-0.5 transition-colors">
                                {company.employeeRange || 'Website'} <ArrowUpRight size={10} />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Industry Badge */}
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-100 dark:bg-zinc-900 text-neutral-600 dark:text-zinc-400 rounded-lg border border-neutral-200 dark:border-zinc-800">
                          {company.industry || 'Technology'}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 text-neutral-500 dark:text-zinc-400 font-medium">
                        {company.location || 'Global'}
                      </td>

                      {/* Luxury Status Pills with Dynamic Glow */}
                      <td className="py-4 px-6">
                        {company.status === 'pending' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20 dark:border-amber-400/20 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                            Pending
                          </span>
                        )}
                        {company.status === 'approved' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-zinc-400 bg-neutral-100 dark:bg-zinc-800/50 border border-neutral-200 dark:border-zinc-700/30 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-zinc-500" />
                            Approved
                          </span>
                        )}
                        {company.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-600 bg-neutral-50 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800/60 rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-zinc-700" />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Date Submitted */}
                      <td className="py-4 px-6 text-neutral-500 dark:text-zinc-400 font-medium">
                        {formattedDate}
                      </td>

                      {/* Action buttons (Client Component) */}
                      <td className="py-4 px-6 text-right">
                        <CompanyActionButtons companyId={companyIdString} initialStatus={company.status} />
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PLACEHOLDER (Commented as requested) */}
        {/* 
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-zinc-900 bg-neutral-50/30 dark:bg-[#0c0c0e]/40 text-neutral-400 dark:text-zinc-500 text-xs font-semibold tracking-wide">
          <div>Showing 1-{companies.length} of {companies.length} companies</div>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 bg-amber-600 dark:bg-amber-400 text-white dark:text-black font-bold rounded-lg shadow-sm">1</button>
            <button className="px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-zinc-800 rounded-lg transition-all">2</button>
          </div>
        </div> 
        */}
      </div>

      {/* STATS OVERVIEW CARDS (Premium High-End Hybrid Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        
        {/* Card 1: Pending */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214]/40 border border-neutral-200 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400 dark:text-zinc-500">Pending Review</span>
            <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-500/10">
              <Clock size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">{pendingCount}</span>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">Action Required</span>
          </div>
        </div>

        {/* Card 2: Approved */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214]/40 border border-neutral-200 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400 dark:text-zinc-500">Approved Partners</span>
            <div className="p-2 bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-zinc-400 rounded-xl border border-neutral-200 dark:border-zinc-700/30">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-neutral-900 dark:text-zinc-100 tracking-tight">{approvedCount}</span>
            <span className="text-[11px] text-neutral-400 dark:text-zinc-500 font-medium">Verified Ecosystem</span>
          </div>
        </div>

        {/* Card 3: Rejected */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121214]/40 border border-neutral-200 dark:border-zinc-800/80 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-400 dark:text-zinc-500">Total Rejections</span>
            <div className="p-2 bg-neutral-50 dark:bg-zinc-900 text-neutral-400 dark:text-zinc-600 rounded-xl border border-neutral-100 dark:border-zinc-800/50">
              <XCircle size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-neutral-400 dark:text-zinc-500 tracking-tight">{rejectedCount}</span>
            <span className="text-[11px] text-neutral-400 dark:text-zinc-600 font-medium">Archived Requests</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminCompaniesManagePage;