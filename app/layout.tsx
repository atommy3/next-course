/*
In addition to page.tsx, you can also add layout.tsx to a directory, which
can be used to create UI that is shared between multiple pages.

Because global.css and the Inter font are imported here and used in the top-level /app directory's layout.tsx,
They are used in all pages of the application.

Note: the layout in the top level /app directory is special because it is required
and called RootLayout rather than Layout.
*/

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
