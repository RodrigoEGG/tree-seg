import { ProjectTable } from "@/components/projects-table";
/* import ProjectsPanel from "@/components/panel-sidebar"; */

export default function Projects() {
    return (
        /* Esta es la parte con el panel */
        /* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <ProjectsPanel />
            <div className="flex flex-col">
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <ProjectTable />
                    </div>
                </main>
            </div>
        </div> */

        /* Esta es la parte sin el panel */
        <div className="flex-1 ml-8 mr-8">
            <br />
            <ProjectTable />
        </div>
    );
}