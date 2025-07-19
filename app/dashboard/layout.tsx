/*
Because the SideNav component is imported and used here in the dashboard directory's layout.tsx,
all pages in the dashboard directory and its subdirectories have the side navigation bar.
*/

import SideNav from '@/app/ui/dashboard/sidenav';

/*
The props argument that the Layout function receives is either a page or another Layout.
Here, we're nesting all the pages in the /app/dashboard directory inside this <Layout />
*/
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}