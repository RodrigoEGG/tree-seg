import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function PopoverInstructions() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Info className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 text-sm space-y-2">
                <h3 className="font-semibold text-base">🌲 Visualize a Single Tree</h3>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Insert a marker in the tree you want to visualize.</li>
                    <li>Select the marker in <strong>"Visualize Individual Tree"</strong>.</li>
                    <li>Click <strong>"View individual tree"</strong>.</li>
                </ol>
                <p className="text-xs text-muted-foreground">
                    Can't find the tree? Try adding a new marker and try again!
                </p>
            </PopoverContent>
        </Popover>
    );
}