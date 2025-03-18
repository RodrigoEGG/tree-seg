export interface FileRecord {
    fileName: string;
    createdAt: string;
    status: "Segmented" | "Failed" | "In Progress";
    segmented?: boolean;
}
