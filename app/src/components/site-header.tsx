import { useState } from "react";
import { TreePine, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDataModal from "./ui/modal";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function SiteHeader() {
  const [activeButton, setActiveButton] = useState("TreeSeg");

  const user = {
    name: "John Doe",
    email: "example@gmail.com",
    avatar: "/images/avatar.jpg", // Replace with actual path
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-[50px] items-center w-full px-6">
        {/* Left Side - Logo & Navigation */}
        <div className="flex items-center space-x-6">
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

          <nav className="flex space-x-6 text-sm">
            <Link to="/projects">
              <Button
                variant="link"
                onClick={() => setActiveButton("View Projects")}
                className={
                  activeButton === "View Projects"
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }
              >
                View Projects
              </Button>
            </Link>

            <Button
              variant="link"
              onClick={() => setActiveButton("Upload Data")}
              className={
                activeButton === "Upload Data"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }
            >
              <UploadDataModal />
            </Button>
          </nav>
        </div>

        {/* Right Side - User Profile with Dropdown */}
        <div className="ml-auto">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center space-x-2 rounded-lg p-1 hover:bg-gray-100 transition">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-2 shadow-lg bg-white border rounded-md">
              <Button variant="ghost" className="w-full text-left" onClick={() => alert("Logging out...")}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
