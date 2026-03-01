export default function ClientProjectsPage() {
    return (
        <div className='max-w-6xl'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-foreground tracking-tight'>My Projects</h1>
                <p className='text-foreground/50 text-sm mt-1'>View and track the status of your active projects.</p>
            </div>

            <div className='p-12 rounded-3xl bg-surface border border-border text-center'>
                <div className='text-foreground/40 mb-4'>🗂️</div>
                <h3 className='text-lg font-bold text-foreground mb-2'>No active projects</h3>
                <p className='text-sm text-foreground/50'>You don't have any ongoing projects at the moment.</p>
            </div>
        </div>
    );
}
