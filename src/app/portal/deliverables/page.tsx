import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Download, ExternalLink, Image, Code, FileText, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export default async function ClientDeliverablesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch the client's current active project
    const { data: clientData } = await supabase
        .from('clients')
        .select('id')
        .eq('profile_id', user.id)
        .single();

    let project = null;

    if (clientData?.id) {
        const { data } = await supabase
            .from('projects')
            .select(`
                *,
                deliverables (*)
            `)
            .eq('client_id', clientData.id)
            .neq('status', 'completed')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        project = data;
    }

    return (
        <div className='max-w-6xl space-y-8'>
            <div className='mb-8'>
                <h1 className='text-2xl font-bold text-foreground tracking-tight'>Deliverables</h1>
                <p className='text-foreground/50 text-sm mt-1'>Access project files, design assets, and active environments.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {!project?.deliverables || project.deliverables.length === 0 ? (
                    <div className='col-span-full p-12 rounded-3xl bg-surface border border-border text-center'>
                        <div className='text-foreground/40 mb-4 text-3xl'>📦</div>
                        <h3 className='text-lg font-bold text-foreground mb-2'>No active deliverables</h3>
                        <p className='text-sm text-foreground/50'>Your project assets will be available here when completed.</p>
                    </div>
                ) : (
                    project.deliverables.map((d: any) => {
                        let Icon = FileText;
                        if (d.type === 'Design') Icon = Image;
                        if (d.type === 'URL') Icon = LinkIcon;
                        if (d.type === 'Code') Icon = Code;

                        return (
                            <Link
                                key={d.id}
                                href={d.url}
                                target="_blank"
                                className='p-6 rounded-3xl bg-surface border border-border hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group'
                            >
                                <div className='w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-foreground/50 mb-6 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors'>
                                    <Icon className='w-6 h-6' />
                                </div>
                                <h3 className='text-lg font-bold text-foreground mb-1 group-hover:text-[#D4AF37] transition-colors'>{d.name}</h3>
                                <div className='flex items-center justify-between mt-4'>
                                    <span className='px-2 py-1 bg-foreground/5 rounded text-[10px] font-bold uppercase tracking-wider text-foreground/50'>
                                        {d.type}
                                    </span>
                                    {d.type === 'URL' || d.type === 'Design' ? (
                                        <ExternalLink className='w-4 h-4 text-foreground/30 group-hover:text-[#D4AF37]' />
                                    ) : (
                                        <Download className='w-4 h-4 text-foreground/30 group-hover:text-[#D4AF37]' />
                                    )}
                                </div>
                            </Link>
                        )
                    })
                )}
            </div>
        </div>
    );
}
