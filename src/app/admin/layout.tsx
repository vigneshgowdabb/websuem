import Sidebar from '@/components/layout/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen'>
      <Sidebar role='admin' />
      <main className='pl-64 min-h-screen'>
        <div className='p-8 sm:p-12'>
          {children}
        </div>
      </main>
    </div>
  );
}
