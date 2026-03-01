'use client';

import { useState } from 'react';
import { createProject, updateProjectStatus, addDeliverable } from '@/app/actions/projects';
import toast from 'react-hot-toast';

export default function AdminProjectsClient({ initialProjects, clients }: { initialProjects: any[], clients: any[] }) {
    const [isCreating, setIsCreating] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    async function handleCreateProject(formData: FormData) {
        const res = await createProject(formData);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success('Project Created!');
            setIsCreating(false);
        }
    }

    async function handleUpdateStatus(projectId: string, status: string, progress: number) {
        const res = await updateProjectStatus(projectId, status, progress);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success('Project Updated!');
        }
    }

    async function handleAddDeliverable(formData: FormData) {
        const res = await addDeliverable(formData);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success('Deliverable Attached!');
        }
    }

    return (
        <div className='max-w-6xl space-y-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-foreground tracking-tight'>Manage Projects</h1>
                    <p className='text-foreground/50 text-sm mt-1'>View and update ongoing client projects.</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className='bg-[#D4AF37] text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#B8972D] transition-colors'
                >
                    {isCreating ? 'Cancel' : '+ New Project'}
                </button>
            </div>

            {isCreating && (
                <div className='p-6 bg-surface border border-border rounded-3xl'>
                    <h3 className='text-lg font-bold text-foreground mb-4'>Create New Project</h3>
                    <form action={handleCreateProject} className='space-y-4 max-w-md'>
                        <div>
                            <label className='block text-xs font-semibold text-foreground/50 mb-2'>Select Client</label>
                            <select name="clientId" required className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]'>
                                <option value="">-- Choose Client --</option>
                                {clients.map((c: any) => (
                                    <option key={c.id} value={c.id}>{c.company_name} ({c.profiles?.full_name})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='block text-xs font-semibold text-foreground/50 mb-2'>Project Name</label>
                            <input type="text" name="name" required placeholder="e.g. Website Redesign" className='w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-[#D4AF37]' />
                        </div>
                        <button type="submit" className='bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold'>Create Project</button>
                    </form>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {initialProjects.length === 0 ? (
                    <div className='col-span-full p-12 rounded-3xl bg-surface border border-border text-center'>
                        <div className='text-foreground/40 mb-4'>🗂️</div>
                        <h3 className='text-lg font-bold text-foreground mb-2'>No active projects</h3>
                        <p className='text-sm text-foreground/50'>Create a project to start tracking progress.</p>
                    </div>
                ) : (
                    initialProjects.map((project: any) => (
                        <div key={project.id} className='p-6 rounded-3xl bg-surface border border-border'>
                            <div className='flex justify-between items-start mb-4'>
                                <div>
                                    <h3 className='font-bold text-lg text-foreground'>{project.name}</h3>
                                    <p className='text-xs text-foreground/50 mt-1'>{project.clients?.company_name}</p>
                                </div>
                                <span className='px-3 py-1 bg-foreground/5 rounded-full text-xs font-bold uppercase tracking-wider text-foreground/70'>
                                    {project.status}
                                </span>
                            </div>

                            <div className='mb-6'>
                                <label className='block text-xs font-semibold text-foreground/50 mb-2'>Phase & Progress</label>
                                <div className='flex gap-2'>
                                    <select
                                        defaultValue={project.status}
                                        onChange={(e) => {
                                            const status = e.target.value;
                                            const progressMap: any = { discovery: 10, design: 30, build: 60, review: 85, launch: 95, completed: 100 };
                                            handleUpdateStatus(project.id, status, progressMap[status]);
                                        }}
                                        className='flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-[#D4AF37]'
                                    >
                                        <option value="discovery">Discovery (10%)</option>
                                        <option value="design">Design (30%)</option>
                                        <option value="build">Build (60%)</option>
                                        <option value="review">Review (85%)</option>
                                        <option value="launch">Launch (95%)</option>
                                        <option value="completed">Completed (100%)</option>
                                    </select>
                                    <div className='flex items-center gap-1 px-3 py-2 bg-background border border-border rounded-lg'>
                                        <input
                                            type="number"
                                            defaultValue={project.progress}
                                            onBlur={(e) => handleUpdateStatus(project.id, project.status, parseInt(e.target.value) || 0)}
                                            className='w-10 bg-transparent text-xs text-right focus:outline-none text-foreground'
                                        />
                                        <span className='text-xs text-foreground/50'>%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deliverables Manager */}
                            <div className='border-t border-border pt-4'>
                                <div className='flex items-center justify-between mb-4'>
                                    <h4 className='text-sm font-bold text-foreground'>Deliverables ({project.deliverables?.length || 0})</h4>
                                    <button
                                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                                        className='text-xs font-semibold text-[#D4AF37] hover:underline'
                                    >
                                        + Add Asset
                                    </button>
                                </div>

                                {selectedProject === project.id && (
                                    <form action={handleAddDeliverable} className='mb-4 space-y-3 p-4 bg-background rounded-xl border border-border'>
                                        <input type="hidden" name="projectId" value={project.id} />
                                        <input type="text" name="name" placeholder="Asset Name (e.g. Figma Link)" required className='w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs' />
                                        <select name="type" required className='w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs'>
                                            <option value="Design">Design</option>
                                            <option value="PDF">PDF</option>
                                            <option value="URL">URL / Link</option>
                                            <option value="Code">Code Repository</option>
                                        </select>
                                        <input type="url" name="url" placeholder="https://..." required className='w-full px-3 py-2 bg-surface border border-border rounded-lg text-xs' />
                                        <button type="submit" className='w-full py-2 bg-[#D4AF37] text-background rounded-lg text-xs font-bold'>Save Asset</button>
                                    </form>
                                )}

                                <div className='space-y-2'>
                                    {project.deliverables?.map((d: any) => (
                                        <div key={d.id} className='flex justify-between items-center p-2 rounded-lg hover:bg-foreground/5'>
                                            <div className='flex items-center gap-2'>
                                                <span className='px-2 py-0.5 bg-foreground/10 rounded text-[10px] font-bold uppercase'>{d.type}</span>
                                                <span className='text-xs font-semibold'>{d.name}</span>
                                            </div>
                                            <a href={d.url} target="_blank" rel="noopener noreferrer" className='text-xs text-[#D4AF37] hover:underline'>View</a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
