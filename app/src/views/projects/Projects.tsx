import { ProjectTable } from "@/components/projects-table";
import ProjectsPanel from "@/components/panel-sidebar";

export default function Projects() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <ProjectsPanel />
            <div className="flex flex-col bg-gray-100">
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <ProjectTable />
                    </div>
                </main>
            </div>
        </div>
    );
}