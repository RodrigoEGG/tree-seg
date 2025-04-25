import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export function GoBackButton({ to }: { to: string }) {
	return (
		<Link
			to={to}
			className="inline-flex items-center gap-1 text-sm underline text-muted-foreground hover:text-primary transition"
		>
			<ArrowLeft className="w-4 h-4" />
			Go Back
		</Link>
	)
}
