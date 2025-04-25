import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BadgeInputBox() {
  const [inputValue, setInputValue] = useState("");
  const [badges, setBadges] = useState<string[]>([]);

  const handleAddBadge = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !badges.includes(trimmed)) {
      setBadges([...badges, trimmed]);
      setInputValue("");
    }
  };

  const handleRemoveBadge = (badgeToRemove: string) => {
    setBadges(badges.filter((b) => b !== badgeToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe algo"
        />
        <Button onClick={handleAddBadge} variant="outline">
          Agregar
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <Badge
            key={index}
            variant="outline"
            onClick={() => handleRemoveBadge(badge)}
            className="cursor-pointer hover:bg-muted/70 transition-colors"
          >
            {badge} <span className="ml-1 text-sm text-muted-foreground">✕</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
