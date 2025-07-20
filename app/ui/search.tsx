'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();   // gets information about the current URL's query parameters
  const pathname = usePathname();     // gets information about the current URL's path
  const { replace } = useRouter();    // useRouter enables navigation between routes within client components programmatically

  /*
  useDebouncedCallback ensures we do not query the server
  with every new keystroke, but only once the handleSearch function
  has not been called for 300 ms (aka, the user has not typed a key for 300 ms).
  */
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);  // replaces the user's current URL with the given one, navigating to it
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      {/*
      How this works: when the user changes this input field, the page's URL changes.
      Specifically, it sets the "page" and "query" query parameters.
      The query parameters of the new URL is a parameter of Page() in /app/dashboard/invoices,
      which re-renders the Table and Pagination in the page using the new query parameters.

      To ensure this input field is in sync with the current URL, we pass a defaultValue.
      */}
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
