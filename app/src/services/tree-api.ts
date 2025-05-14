import apiRequest from "./client";

interface Tree {
    heights: number[];
    diameters: number[];
}

const treeServices = {
    getTreeHeights: async (token: string, project_id: number, file_id: number): Promise<Tree[]> => {
        return apiRequest<Tree[]>(`/trees/metadata/heights/${project_id}/${file_id}`, token);
    },

    getTreeDiameters: async (token: string, project_id: number, file_id: number): Promise<Tree[]> => {
        return apiRequest<Tree[]>(`/trees/metadata/diameters/${project_id}/${file_id}`, token);
    },
}

export { 
    treeServices 
};