

import { 
  FiSearch, 
  FiBookmark, 
  FiFileText, 
  FiMousePointer 
} from "react-icons/fi";
import { 
  TbChartLine, 
  TbBuildingSkyscraper, 
  TbHexagon, 
  TbTrendingUp 
} from "react-icons/tb";

const featuresData = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: <FiSearch size={24} strokeWidth={1.5} />,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: <TbChartLine size={24} strokeWidth={1.5} />,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: <TbBuildingSkyscraper size={24} strokeWidth={1.5} />,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: <FiBookmark size={24} strokeWidth={1.5} />,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: <FiMousePointer size={24} strokeWidth={1.5} />,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: <FiFileText size={24} strokeWidth={1.5} />,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: <TbHexagon size={24} strokeWidth={1.5} />,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: <TbTrendingUp size={24} strokeWidth={1.5} />,
  },
];

const Features = () => {
  return (
    <section className="relative w-full bg-[#f8fafc] dark:bg-[#030303] py-24 overflow-hidden font-sans transition-colors duration-500">
      
      {/* Background Decor (Matching previous sections) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          
          {/* Top Label Tag */}
          <div className="flex items-center justify-center gap-3 mb-6 select-none">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-[1px]" />
            <span className="text-[13px] font-semibold tracking-[0.18em] text-zinc-500 dark:text-zinc-400 uppercase">
              Features Job
            </span>
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-[1px]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.15] text-zinc-900 dark:text-white max-w-2xl transition-colors">
            Everything you need <br className="hidden sm:block" /> to succeed
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuresData.map((feature, idx) => (
            <div 
              key={idx} 
              className="group flex flex-row items-start gap-5 cursor-pointer"
            >
              {/* Glassy Icon Box */}
              <div className="flex shrink-0 items-center justify-center w-[60px] h-[60px] rounded-[14px] border border-zinc-200 dark:border-white/[0.05] bg-white/70 dark:bg-[#0c0c0e]/80 backdrop-blur-md shadow-sm dark:shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-500/30 group-hover:shadow-[0_10px_30px_rgba(79,70,229,0.1)] dark:group-hover:shadow-[0_10px_30px_rgba(79,70,229,0.15)] group-hover:bg-white dark:group-hover:bg-[#121215]">
                <div className="text-zinc-600 dark:text-pink-100/90 group-hover:text-indigo-600 dark:group-hover:text-pink-300 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col pt-1">
                <h3 className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-zinc-500 dark:text-zinc-400 leading-[1.6] font-medium transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;