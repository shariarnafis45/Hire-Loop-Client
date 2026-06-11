import CompaniesClientWrapper from "@/components/dashboard/CompaniesClientWrapper";
import React from "react";

const RecruiterCompanyPage = async () => {
  const companiesData = [
    {
      _id: "comp_mock_vercel_001",
      name: "Vercel",
      industry: "Technology",
      website: "https://vercel.com",
      location: "San Francisco",
      employeeRange: "201-500 employees",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/512px-Vercel_logo_black.svg.png",
      description:
        "Vercel is the platform for frontend developers, providing speed and reliability. Experience the best workflow for React, Next.js, and more.",
      status: "pending",
      recruiterId: "user_mock_123",
    },
    {
      _id: "comp_mock_figma_002",
      name: "Figma",
      industry: "Technology",
      website: "https://figma.com",
      location: "San Francisco",
      employeeRange: "501-1000 employees",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      description:
        "Figma is the collaborative interface design tool — design, prototype, and gather feedback all in one place. Empowering teams to build better products.",
      status: "approved",
      recruiterId: "user_mock_123",
    },
    {
      _id: "comp_mock_enosis_003",
      name: "Enosis Solutions",
      industry: "Technology",
      website: "https://enosisbd.com",
      location: "Dhaka, Bangladesh",
      employeeRange: "51-200 employees",
      logo: "https://media.licdn.com/dms/image/v2/D560BAQF3_p1oQk7E9g/company-logo_200_200/company-logo_200_200/0/1719256247345?e=2147483647&v=beta&t=9xVf0zDqf_cMhXqP7W8I9V6O3X5Q6lK_vX6vW6tY2_0",
      description:
        "Enosis - Your trusted Software Development Partner. A top tier software development team assisting owners and decision makers to implement scalable solutions.",
      status: "pending",
      recruiterId: "user_mock_123",
    },
  ];
  return (
    <div>
      <CompaniesClientWrapper initialCompanies={companiesData} />
    </div>
  );
};

export default RecruiterCompanyPage;
