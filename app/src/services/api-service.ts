// src/services/api-service.ts
import { ProjectRecord } from "@/interfaces/project-record"; 

// Fix the API_URL configuration
const API_URL = import.meta.env.VITE_LOCAL_API_URL;

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

// API request wrapper with authorization header
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = `${API_URL}${endpoint}`;
    
    console.log(`Making request to: ${url}`);

    // Set up headers for the request
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            // For 204 No Content responses, return null
            if (response.status === 204) {
                return null as T;
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
        }

        // For 204 No Content responses, return null
        if (response.status === 204) {
            return null as T;
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// API service methods for endpoints
export const apiService = {
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