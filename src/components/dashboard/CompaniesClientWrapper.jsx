"use client";

import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import CompanyCard from "./CompanyCard";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default function CompaniesClientWrapper({ recruiter, initialCompanies }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const hasCompany = initialCompanies && initialCompanies.length > 0;
  const company = initialCompanies?.[0];

  const handleEditCompany = (comp) => {
    setEditingCompany(comp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingCompany(null), 300);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 px-4 sm:px-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-zinc-200/60 dark:border-white/[0.05] pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Company Workspace
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-md">
            {hasCompany 
              ? "View and manage your core enterprise hub, team parameters, and verification status."
              : "Register your corporate workspace profile to unlock job postings."}
          </p>
        </div>

        {!hasCompany && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm shrink-0"
          >
            <Plus size={16} />
            Register Company
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!hasCompany ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12 bg-zinc-50/50 dark:bg-[#121214]/50 rounded-[24px] border border-dashed border-zinc-300 dark:border-white/[0.08]">
          <div className="w-16 h-16 bg-white dark:bg-white/[0.02] rounded-2xl flex items-center justify-center mb-5 text-zinc-400 border border-zinc-100 dark:border-white/[0.05] shadow-sm">
            <Building2 size={32} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight text-center">
            No Company Registered Yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 mb-8 max-w-sm text-center px-4">
            Create your unified company hub to start publishing jobs and sourcing top tech talents.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Register Workspace
          </button>
        </div>
      ) : (
        /* 🌟 Full Width Container: Dashboard full structure dhore rakhbe */
        <div className="w-full grid grid-cols-1 gap-8">
          <CompanyCard 
            company={company} 
            onEdit={handleEditCompany} 
          />
        </div>
      )}

      {/* Shared Modal */}
      <RegisterCompanyModal 
        recruiter={recruiter}
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={editingCompany} 
      />
    </div>
  );
}