import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function HealthSelect() {
  return (
        <Select>
        <SelectTrigger>
            <SelectValue placeholder="Select Health value" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Health</SelectLabel>
            <SelectItem value="healthy">1 - Healthy</SelectItem>
            <SelectItem value="light">2 - Light Damage</SelectItem>
            <SelectItem value="moderate">3 - Moderate Damage</SelectItem>
            <SelectItem value="severe">4 - Severe Damage</SelectItem>
            <SelectItem value="dead">5 - Dead</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
  )
}
