// src/services/api-service.ts
import { ProjectRecord } from "@/interfaces/project-record"; 
import apiRequest from "./client";

interface ProjectCreatePayload {
    name: string;
    description?: string;
    owner_id: number; 
    date?: string;
}

interface ProjectUpdatePayload {
    name?: string;
    description?: string;
}

// project API service methods for endpoints
const projectServices = {
    // Get all projects
    getProjects: async (): Promise<ProjectRecord[]> => {
        return apiRequest<ProjectRecord[]>('/projects/');
    },

    // Get a single project by ID
    getProject: async (projectId: number): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/${projectId}`);
    },

    // Get a project by name
    getProjectByName: async (name: string): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/name/${encodeURIComponent(name)}`);
    },

    // Get projects by owner ID
    getProjectsByOwner: async (ownerId: number): Promise<ProjectRecord[]> => {
        return apiRequest<ProjectRecord[]>(`/projects/owner/${ownerId}`);
    },

    // Create a new project
    createProject: async (project: ProjectCreatePayload): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>('/projects/', {
            method: 'POST',
            body: JSON.stringify(project)
        });
    },

    // Update a project by ID
    updateProject: async (projectId: number, project: ProjectUpdatePayload): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(project)
        });
    },

    // Update a project by name
    updateProjectByName: async (name: string, project: ProjectUpdatePayload): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/name/${encodeURIComponent(name)}`, {
            method: 'PUT',
            body: JSON.stringify(project)
        });
    },

    // Delete a project by ID
    deleteProject: async (projectId: number): Promise<void> => {
        return apiRequest<void>(`/projects/${projectId}`, {
            method: 'DELETE'
        });
    },

    // Delete a project by name
    deleteProjectByName: async (name: string): Promise<void> => {
        return apiRequest<void>(`/projects/name/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        });
    }
};

export { 
	projectServices 
};