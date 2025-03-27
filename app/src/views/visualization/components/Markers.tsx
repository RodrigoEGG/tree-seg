import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useViewer } from "@/context/ViewerProvider"

export default function Markers () {

	const { markers } = useViewer();


	return (

		<>

			<Card x-chunk="dashboard-06-chunk-0">

                <CardHeader>

					<CardTitle>Marker</CardTitle>

					<CardDescription>
						If the marked point belongs to a tree you con visualiza the indivual tree
					</CardDescription>

                </CardHeader>

                <CardContent>

					<Table>

						<TableHeader>

							<TableRow>

								<TableHead>Name</TableHead>

								<TableHead>Type</TableHead>


								<TableHead className="hidden md:table-cell">
									ID
								</TableHead>

								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>

							</TableRow>

						</TableHeader>

						<TableBody>

						{
							markers.slice(1).map((marker: any) => (
								<TableRow key={marker.id}>
									<TableCell className="font-medium">Marker {marker.id}</TableCell>
									<TableCell>
										{marker !== 0 ? <Badge>Tree</Badge> : <Badge variant="outline">Tree</Badge>}
									</TableCell>
									<TableCell className="hidden md:table-cell"></TableCell>
									<TableCell>
										<Button>Visualize</Button>
									</TableCell>
								</TableRow>
							))
					}



						</TableBody>

					</Table>

                </CardContent>

                <CardFooter>
					<div className="text-xs text-muted-foreground">
						Showing <strong>1-10</strong> of <strong>32</strong>{" "}
						products
					</div>

                </CardFooter>

              </Card>
		
		</>

	)

}