/*
Like page.tsx and layout.tsx, loading.tsx is another special Next.js page.
This dictates what temporary static content is shown to the user 
while the main dynamic content of the page is still loading.

Notice that this file is contained in a directory whose name is enclosed in parenthesis ().
This is called a routing group, and when a directory's name is enclosed in parenthesis like this,
It is not part of the URL. 
Here, a routing group is being used (rather than placing this file in /app/dashboard)
to prevent this loading.tsx file from applying to the invoices and customer pages.
*/

import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}