import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
import React from "react"

interface LasModalProps {
	children : React.ReactNode;
}

const invoices = [
	{
	  invoice: "INV001",
	  paymentStatus: "Paid",
	  totalAmount: "$250.00",
	  paymentMethod: "Credit Card",
	},
	{
	  invoice: "INV002",
	  paymentStatus: "Pending",
	  totalAmount: "$150.00",
	  paymentMethod: "PayPal",
	},
	{
	  invoice: "INV003",
	  paymentStatus: "Unpaid",
	  totalAmount: "$350.00",
	  paymentMethod: "Bank Transfer",
	},
	{
	  invoice: "INV004",
	  paymentStatus: "Paid",
	  totalAmount: "$450.00",
	  paymentMethod: "Credit Card",
	},
	{
	  invoice: "INV005",
	  paymentStatus: "Paid",
	  totalAmount: "$550.00",
	  paymentMethod: "PayPal",
	},
	{
	  invoice: "INV006",
	  paymentStatus: "Pending",
	  totalAmount: "$200.00",
	  paymentMethod: "Bank Transfer",
	},
	{
	  invoice: "INV007",
	  paymentStatus: "Unpaid",
	  totalAmount: "$300.00",
	  paymentMethod: "Credit Card",
	},
  ]

export default function LasModal ({children} : LasModalProps) {

	return (

		<>
			<Dialog>

				<DialogTrigger className="w-full">

					{children}

				</DialogTrigger>

				<DialogContent>

					<DialogHeader>

						<DialogTitle>
							LAS file header information
						</DialogTitle>

						<DialogDescription>

							<Table>
								
								<TableHeader>

									<TableRow>
										<TableHead className="w-[100px]">Field</TableHead>
										<TableHead className="text-right">Data</TableHead>
									</TableRow>

								</TableHeader>

								<TableBody>

									<TableRow>
										<TableCell className="font-medium">System identifier</TableCell>
										<TableCell className="text-right">asd </TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Generating System</TableCell>
										<TableCell className="text-right">asd </TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Creation Date</TableCell>
										<TableCell className="text-right">asd </TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Point Count</TableCell>
										<TableCell className="text-right">asd </TableCell>
									</TableRow>

									<TableRow>
										<TableCell className="font-medium">Coordenate System</TableCell>
										<TableCell className="text-right">asd </TableCell>
									</TableRow>

								</TableBody>

							</Table>

						</DialogDescription>


					</DialogHeader>

				</DialogContent>

			</Dialog>

		
		</>

	)

}
  