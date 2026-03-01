export default function AdminLeadsPage() {
    return (
        <div className='max-w-6xl'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-foreground tracking-tight'>Manage Leads</h1>
                <p className='text-foreground/50 text-sm mt-1'>Track and manage new inquiries and potential clients.</p>
            </div>

            <div className='p-12 rounded-3xl bg-surface border border-border text-center'>
                <div className='text-foreground/40 mb-4'>👥</div>
                <h3 className='text-lg font-bold text-foreground mb-2'>No new leads</h3>
                <p className='text-sm text-foreground/50'>Incoming contact requests will appear in your pipeline here.</p>
            </div>
        </div>
    );
}
