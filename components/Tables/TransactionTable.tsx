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
import { Button } from "../../@/components/ui/button";
import { formatDate } from "../../@/lib/utils";
import Loader from "../Loader";
import { useTransactionHooks } from "../transactions/useTransactionHooks";
import { useQueryClient } from "@tanstack/react-query";
// import { useLoadMoreTransactionsQuery } from "../../modules/TransactionsApi/transactionsApi";

type Props = {
	transactions: any[];
	showMore: (index: number) => void;
	isLoading: boolean;
	filterValues: { start: number; end: number };
};

export function TransactionTable({
	transactions,
	showMore,
	isLoading,
	filterValues,
}: Props) {
	const queryClient = useQueryClient();

	const arrayLength = transactions?.length;
	const lastIndex = arrayLength - 1;

	const {
		handleFilterMore,
		isFilteringMore,
		handleLoadMore,
		isLoadingMore,
		setPageNumber,
		pageNumber,
	} = useTransactionHooks();
	return (
		<div className="w-full  h-full">
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
						transactions?.length <= 25 || isLoading ? "h-auto" : "h-[590px]"
					}
				>
					<TableHeader
						className={`  h-[48px] sticky top-0 border-foreground border-b`}
					>
						<TableRow>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Sender
							</TableHead>
							<TableHead className="w-auto text-[#898989] font-medium ">
								Recipient
							</TableHead>
							{/* <TableHead className="w-auto text-[#898989] font-medium ">
								Transaction ID
							</TableHead> */}
							<TableHead className="w-auto text-[#898989] font-medium ">
								Amount
							</TableHead>
							{/* <TableHead className="w-auto text-[#898989] font-medium ">
								Fee
							</TableHead> */}
							<TableHead className="w-auto pr-20 text-[#898989] font-medium ">
								Date
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
						) : transactions?.length === 0 ? (
							<TableRow className="h-32">
								<TableCell
									colSpan={5}
									className="p-0"
								>
									<div className="flex justify-center items-center  ">
										<h1 className="text-xl">You have no transactions!</h1>
									</div>
								</TableCell>
							</TableRow>
						) : (
							transactions?.map((transaction: any, index: number) => (
								<TableRow
									onClick={() => showMore(index)}
									key={transaction?.t_id}
									className="cursor-pointer hover:bg-[#E7EDFF]"
								>
									<TableCell className="font-WorkSans font-normal h-[60px]">
										{transaction?.sender ? transaction?.sender : "N/A"}
									</TableCell>
									<TableCell className="font-WorkSans font-normal h-[60px]">
										{transaction?.recipient ? transaction?.recipient : "N/A"}
									</TableCell>
									{/* <TableCell className="font-WorkSans font-normal h-[60px] truncate">
										{transaction?.t_id}
									</TableCell> */}
									<TableCell
										className={`font-WorkSans font-semibold h-[60px] ${
											transaction?.debit ? "text-[#61A72C]" : "text-red-500"
										}`}
									>
										{transaction?.amount_string
											? transaction?.amount_string
											: "N/A"}
									</TableCell>
									{/* <TableCell className={`font-WorkSans font-normal h-[60px] `}>
										{transaction?.fee_string ? transaction?.fee_string : "N/A"}
									</TableCell> */}
									<TableCell className="font-WorkSans font-normal h-[60px]">
										{transaction?.on ? formatDate(transaction?.on) : "N/A"}
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
						transactions?.filter((transaction) => transaction.isSelected).length
					}{" "}
					of {transactions?.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						className="w-[100px]"
						onClick={() => {
							if (pageNumber > 0) {
								queryClient.invalidateQueries({ queryKey: ["transactions"] });
								setPageNumber(pageNumber - 1);
							}
						}}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						className="w-[100px]"
						onClick={() => {
							if (filterValues.start && filterValues.end) {
								const payload = {
									start: filterValues.start,
									end: filterValues.end,
									last: transactions[lastIndex]?.r_id,
								};
								handleFilterMore(payload);
							} else {
								handleLoadMore(transactions[lastIndex]?.r_id);
								setPageNumber(pageNumber + 1);
							}
						}}
						disabled={filterValues ? isFilteringMore : isLoadingMore}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
