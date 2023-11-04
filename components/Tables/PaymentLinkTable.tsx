import React from "react";
// import { Input } from "../../@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../@/components/ui/table";
// import { Button } from "../../@/components/ui/button";

import Loader from "../Loader";
// import { useLoadMoreTransactionsQuery } from "../../modules/TransactionsApi/transactionsApi";

type Props = {
	paymentLinks: any[];
	isLoading: boolean;
};

export function PaymentLinkTable({ paymentLinks, isLoading }: Props) {
	// const [queryValue, setQueryValue] = useState("");
	// const arrayLength = transactions?.length;
	// let firstIndex: number;

	// if (arrayLength >= 150) {
	// 	firstIndex = arrayLength - 100;
	// } else if (arrayLength >= 100) {
	// 	firstIndex = arrayLength - 50;
	// } else {
	// 	// Handle cases where the array length is less than 100
	// 	firstIndex = 0; // Set the index to 0 or handle it based on your specific requirement
	// }
	// const lastIndex = arrayLength - 1;
	// const {
	// 	handleLoadMore,
	// 	isLoadingMore,
	// 	byBusinessData,
	// 	setBusinessId,
	// 	businessId,
	// } = useTransactionHooks();

	// const {
	// 	data: transactionsData,
	// 	isSuccess,
	// 	isLoading: isMoreLoading,
	// 	refetch,
	// } = useLoadMoreTransactionsQuery(queryValue);

	// const handleButtonClick = () => {
	// 	// Update the query value (if needed)
	// 	const newQueryValue = transactions[lastIndex]?.r_id; // Set the new value here
	// 	setQueryValue(newQueryValue);

	// 	// Call the refetch function with the updated query value to trigger the data request
	// 	refetch();
	// };
	// console.log("Transactions dara", transactionsData);
	return (
		<div className="w-full  h-full overflow-auto">
			<div className="flex items-center py-4">
				{/* <Input
					placeholder="Filter by businessId..."
					className="max-w-sm"
					value={businessId}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setBusinessId(e.target.value)
					}
				/> */}
			</div>
			<div className="rounded-md border">
				<Table
					className={
						paymentLinks?.length === 0 || isLoading ? "h-auto" : "h-[600px]"
					}
				>
					<TableHeader
						className={`  h-[48px] sticky top-0 border-foreground border-b`}
					>
						<TableRow>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Page Name
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Amount
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Page ID
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Description
							</TableHead>

							<TableHead className="w-auto pr-20 text-[#898989] font-medium ">
								Payment Link
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className=" overflow-y-auto">
						{isLoading ? (
							<TableRow className="h-32">
								<TableCell
									colSpan={5}
									className="p-0"
								>
									<div className="flex justify-center items-center  ">
										<Loader
											width="w-8"
											height="h-8"
										/>
									</div>
								</TableCell>
							</TableRow>
						) : paymentLinks?.length === 0 ? (
							<TableRow className="h-32">
								<TableCell
									colSpan={5}
									className="p-0"
								>
									<div className="flex justify-center items-center  ">
										<h1 className="text-xl">You have no payment links!</h1>
									</div>
								</TableCell>
							</TableRow>
						) : (
							paymentLinks?.map((paymentlink: any) => (
								<TableRow
									key={paymentlink?.p_id}
									className="cursor-pointer hover:bg-[#E7EDFF]"
								>
									<TableCell className="font-WorkSans font-normal h-[60px]">
										{paymentlink?.title ? paymentlink?.title : "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[40px]">
										{paymentlink?.amount ? paymentlink?.amount : "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[60px] truncate">
										{paymentlink?.p_id}
									</TableCell>

									<TableCell className={`font-WorkSans font-normal h-[60px] `}>
										{paymentlink?.description
											? paymentlink?.description
											: "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[60px]">
										{paymentlink?.url ? paymentlink?.url : "N/A"}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{/* Show selected rows count */}
					{
						paymentLinks?.filter((paymentlink) => paymentlink.isSelected).length
					}{" "}
					of {paymentLinks?.length} row(s) selected.
				</div>
				<div className="space-x-2">
					{/* <Button
						variant="outline"
						size="sm"
						// onClick={() => handleLoadMore(transactions[firstIndex]?.r_id)}
						// disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button> */}
					{/* <Button
						variant="outline"
						className="w-[100px]"
						// onClick={() => handleLoadMore(transactions[lastIndex]?.r_id)}
						// disabled={isLoadingMore}
					>
						Next
					</Button> */}
				</div>
			</div>
		</div>
	);
}
