import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

/*
props.params is an object whose keys are
all of the dynamic segments of the URL,
i.e the parts of the URL enclosed in brackets [].
*/
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    /*
    How notFound works:
    First, you import notFound from 'next/navigation'.
    Then, when you want to give a 404 not found HTTP response to the user,
    you call notFound. It takes precedence over the general error case
    handled in error.tsx.
    Additionally, you can specify what content you want to be shown
    on the page in this case by creating a file named not-found.tsx;
    the React component exported in that file will be displayed.
    */
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/*
      Note: the Form being used here is not the same one that was used
      in /app/dashboard/invoices/create. This one is imported from
      /app/ui/invoices/edit-form instead of /app/ui/invoices/create-form.

      The name used when importing does not have to exactly match
      the name of the default exported function from the source module;
      it can instead be an alias.
      Here, Form is an alias of EditInvoiceForm.
      */}
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}