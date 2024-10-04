import Navbar from "./_components/navbar";
import { SideBar } from "./_components/sidebar";





const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[50px] md:pl-56 fixed inset-y-0 w-full z-40 ">
      <Navbar />
      </div>
        <div className="hidden md:flex  h-full w-56 flex-col fixed inset-y-0 z-40">
          <SideBar/>
        </div>
        <main className="md:pl-56 h-full pt-[50px]">
        {children}

        </main>
    </div>
  )
};

export default DashboardLayout;
