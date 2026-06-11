"use client";

import { useState } from "react";
import { Plus, Search, Building2 } from "lucide-react";
import CompanyCard from "./CompanyCard";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default function CompaniesClientWrapper({ initialCompanies }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCompany, setEditingCompany] = useState(null);

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingCompany(null), 300); 
  };

  const filteredCompanies = initialCompanies?.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="w-full max-w-7xl mx-auto pb-8">
      
      {/* Header Section - Fully Responsive */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-zinc-200/60 dark:border-white/[0.05] pb-6 mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            My Companies
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 max-w-md">
            Manage your registered companies and track their verification states.
          </p>
        </div>

        {/* Action Buttons & Search (Mobile Adaptive) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
          
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-zinc-50/50 dark:bg-[#121214] border border-zinc-200 dark:border-white/10 rounded-full text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/20 transition-all w-full"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm shrink-0"
          >
            <Plus size={16} />
            Register Company
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredCompanies.length === 0 ? (
        
        /* Responsive Empty State */
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] px-4 py-12 bg-zinc-50/50 dark:bg-[#121214]/50 rounded-2xl border border-dashed border-zinc-300 dark:border-white/[0.08]">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white dark:bg-white/[0.02] rounded-2xl flex items-center justify-center mb-4 sm:mb-5 text-zinc-400 border border-zinc-100 dark:border-white/[0.05] shadow-sm">
            <Building2 size={28} className="sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight text-center">
            {initialCompanies?.length === 0 ? "No companies registered" : "No companies found"}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 sm:mt-2 mb-6 sm:mb-8 max-w-sm text-center px-4">
            {initialCompanies?.length === 0 
              ? "You haven't registered any companies yet. Register your first company to start hiring."
              : "No companies match your current search criteria. Try a different keyword."}
          </p>
          
          {initialCompanies?.length === 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Register Your First Company
            </button>
          )}
        </div>
      ) : (
        
        /* Responsive Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard 
              key={company._id} 
              company={company} 
              onEdit={handleEditCompany} 
            />
          ))}
        </div>
      )}

      {/* Shared Modal for Create & Edit */}
      <RegisterCompanyModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={editingCompany} 
      />
    </div>
  );
}