import { useState } from "react";
import { TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDataModal from "./ui/modal";
import { Link } from "react-router-dom";

export function SiteHeader() {
  const [activeButton, setActiveButton] = useState("View Projects"); // Default active button

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-[50px] items-center px-6 space-x-6">
        {/* Logo and Name */}
        <Link to="/">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setActiveButton("TreeSeg")}
          >
            <TreePine
              className={`h-6 w-6 ${
                activeButton === "TreeSeg" ? "text-foreground" : "text-muted-foreground"
              }`}
            />
            <span
              className={`font-semibold text-lg ${
                activeButton === "TreeSeg" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              TreeSeg
            </span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex space-x-6 text-sm">
          <Link to="/projects">
            <Button
              variant="link"
              onClick={() => setActiveButton("View Projects")}
              className={
                activeButton === "View Projects"
                  ? "font-semibold text-foreground" // Active: Bold and normal color
                  : "text-muted-foreground" // Inactive: Normal weight and muted color
              }
            >
              View Projects
            </Button>
          </Link>

          <Button
            variant="link"
            onClick={() => setActiveButton("Export Data")}
            className={
              activeButton === "Export Data"
                ? "font-semibold text-foreground"
                : "text-muted-foreground"
            }
          >
            Export Data
          </Button>

          <Button
            variant="link"
            onClick={() => setActiveButton("Upload Data")}
            className={
              activeButton === "Upload Data"
                ? "font-semibold text-foreground"
                : "text-muted-foreground"
            }
          >
            Upload Data
          </Button>
        </nav>
      </div>
    </header>
  );
}