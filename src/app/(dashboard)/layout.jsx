
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/lib/ThemeProvider";
import DashboardShell from "@/components/dashboard/DashboardShell"; 

const DashBoardLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          
          <DashboardShell>
            {children}
          </DashboardShell>
          
          <Toaster 
            position="bottom-center" 
            toastOptions={{
              className: 'dark:bg-zinc-900 dark:text-white',
              style: { borderRadius: '12px', backdropFilter: 'blur(10px)' }
            }} 
          />
        </Providers>
      </body>
    </html>
  );
};

export default DashBoardLayout;