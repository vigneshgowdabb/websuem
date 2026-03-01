'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProject(formData: FormData) {
    const supabase = await createClient();

    const clientId = formData.get('clientId') as string;
    const name = formData.get('name') as string;

    if (!clientId || !name) {
        return { error: 'Client ID and Project Name are required.' };
    }

    const { error } = await supabase.from('projects').insert({
        client_id: clientId,
        name: name,
        status: 'discovery',
        progress: 10,
        last_update: new Date().toISOString()
    });

    if (error) {
        console.error('Error creating project:', error);
        return { error: 'Failed to create project.' };
    }

    revalidatePath('/admin/projects');
    return { success: true };
}

export async function updateProjectStatus(projectId: string, status: string, progress: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('projects')
        .update({
            status,
            progress,
            last_update: new Date().toISOString()
        })
        .eq('id', projectId);

    if (error) {
        console.error('Error updating project:', error);
        return { error: 'Failed to update project.' };
    }

    revalidatePath('/admin/projects');
    return { success: true };
}

export async function addDeliverable(formData: FormData) {
    const supabase = await createClient();

    const projectId = formData.get('projectId') as string;
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const url = formData.get('url') as string;

    if (!projectId || !name || !type || !url) {
        return { error: 'All fields are required.' };
    }

    const { error } = await supabase.from('deliverables').insert({
        project_id: projectId,
        name,
        type,
        url
    });

    if (error) {
        console.error('Error adding deliverable:', error);
        return { error: 'Failed to add deliverable.' };
    }

    revalidatePath('/admin/projects');
    return { success: true };
}
