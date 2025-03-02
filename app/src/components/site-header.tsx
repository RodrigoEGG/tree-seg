import { TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDataModal from "./ui/modal";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-[50px] items-center px-6 space-x-6">
        {/* Logo y nombre */}
        <div className="flex items-center space-x-2">
          <TreePine className="h-6 w-6" />
          <span className="font-semibold text-lg">TreeSeg</span>
        </div>

        {/* Menú de navegación */}
        <nav className="flex space-x-6 text-sm">
          <Button variant="link" className="font-semibold underline">
            View Files
          </Button>
          <Button variant="link" className="text-muted-foreground">
            Export Data
          </Button>
          <UploadDataModal/>
          
        </nav>
      </div>
    </header>
  );
}
