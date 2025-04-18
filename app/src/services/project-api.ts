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
    getProjects: async (token : string): Promise<ProjectRecord[]> => {
        return apiRequest<ProjectRecord[]>('/projects/', token);
    },

    // Get a single project by ID
    getProject: async (projectId: number, token : string): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/${projectId}`, token);
    },

    // Get a project by name
    getProjectByName: async (name: string, token : string): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/name/${encodeURIComponent(name)}`, token);
    },

    // Get projects by owner ID
    getProjectsByOwner: async (ownerId: number): Promise<ProjectRecord[]> => {
        return apiRequest<ProjectRecord[]>(`/projects/owner/${ownerId}`);
    },

    // Create a new project
    createProject: async (project: ProjectCreatePayload, token : string): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>('/projects/',token,
            {
                method: 'POST',
                body: JSON.stringify(project)
            }
        );
    },

    // Update a project by ID
    updateProject: async (projectId: number, project: ProjectUpdatePayload, token : string): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/${projectId}`, token, {
            method: 'PUT',
            body: JSON.stringify(project)
        });
    },

    // Update a project by name
    updateProjectByName: async (name: string, project: ProjectUpdatePayload , token : string): Promise<ProjectRecord> => {
        return apiRequest<ProjectRecord>(`/projects/name/${encodeURIComponent(name)}`, token , {
            method: 'PUT',
            body: JSON.stringify(project)
        });
    },

    // Delete a project by ID
    deleteProject: async (projectId: number, token : string): Promise<void> => {
        return apiRequest<void>(`/projects/${projectId}`, token , {
            method: 'DELETE'
        });
    },

    // Delete a project by name
    deleteProjectByName: async (name: string, token : string): Promise<void> => {
        return apiRequest<void>(`/projects/name/${encodeURIComponent(name)}`, token,  {
            method: 'DELETE'
        });
    }
};

export { 
	projectServices 
};