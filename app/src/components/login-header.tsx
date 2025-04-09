import { TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export function LoginHeader() {
    const [activeButton, setActiveButton] = useState("TreeSeg");

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="flex h-[50px] items-center w-full px-6">
                {/* Left Side - Logo */}
                <div className="flex items-center space-x-6">
                    <Link to="/" onClick={() => setActiveButton("TreeSeg")} className="flex items-center space-x-2">
                        <TreePine className={`h-6 w-6 ${activeButton === "TreeSeg" ? "text-foreground" : "text-muted-foreground"}`} />
                        <span className={`font-semibold text-lg ${activeButton === "TreeSeg" ? "text-foreground" : "text-muted-foreground"}`}>
                            TreeSeg
                        </span>
                    </Link>
                </div>

                {/* Right Side - Login */}
                <div className="ml-auto">
                    <Link to="/auth">
                        <Button size="sm">Login</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
