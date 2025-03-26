import { Button } from "@/components/ui/button";
import { Eye, Palette } from "lucide-react";

export default function ProjectsPanel() {
    return (
        <div className="border-r w-[220px] lg:w-[280px] flex-shrink-0"> {/* Fixed width */}
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="grid py-8 items-start px-2 text-sm font-medium lg:px-4">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold"> </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
