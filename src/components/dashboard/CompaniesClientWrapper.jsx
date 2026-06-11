"use client";

import { useState } from "react";
import { Plus, Search, Building2 } from "lucide-react";
import CompanyCard from "./CompanyCard";
import RegisterCompanyModal from "./RegisterCompanyModal";

export default function CompaniesClientWrapper({ initialCompanies }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Search logic
  const filteredCompanies = initialCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-white/[0.05] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            My Companies
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your registered companies and their verification states.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-full text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-64"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white text-zinc-900 text-[14px] font-semibold transition-all duration-300 hover:bg-zinc-100 shadow-sm shrink-0"
          >
            <Plus size={16} />
            Register a company
          </button>
        </div>
      </div>

      {/* Main Content Area (Empty State vs Grid) */}
      {filteredCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] bg-zinc-50 dark:bg-[#0c0c0e] rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 text-zinc-400">
            <Building2 size={32} />
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white">No companies found</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-6 max-w-sm text-center">
            You haven't registered any companies yet, or no companies match your search criteria.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:scale-[1.02] transition-transform"
          >
            Register Your First Company
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredCompanies.map((company,i) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}

      {/* Modal Component */}
      <RegisterCompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}