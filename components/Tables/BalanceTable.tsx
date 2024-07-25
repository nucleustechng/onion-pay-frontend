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
import { formatDate } from "../../@/lib/utils";
import Loader from "../Loader";
import { Button } from "../../@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import useBalanceHooks from "../balances/useBalanceHooks";
// import { useTransactionHooks } from "../transactions/useTransactionHooks";
// import { useQueryClient } from "@tanstack/react-query";
// import { Input } from "../../@/components/ui/input";
// import { SearchIcon } from "lucide-react";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import { useLoadMoreTransactionsQuery } from "../../modules/TransactionsApi/transactionsApi";

type Props = {
  balances: any[];
  showMore?: (index: number) => void;
  isLoading: boolean;
  filterValues?: { start: number; end: number };
};

export function BalanceTable({
  balances,
  // showMore,
  isLoading,
}: // filterValues,
Props) {
  const queryClient = useQueryClient();

  const arrayLength = balances?.length;
  const lastIndex = arrayLength - 1;
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    // handleFilterMore,
    // isFilteringMore,
    handleLoadMore,
    isLoadingMore,
    setPageNumber,
    pageNumber,
    // handleSearchFilter,
    // isSearching,
  } = useBalanceHooks();

  // useEffect(() => {
  // 	if (searchTerm === "") {
  // 		queryClient.invalidateQueries({ queryKey: ["transactions"] });
  // 	}
  // }, [searchTerm]);
  return (
    <div className="w-full  h-full">
      {/* <div className="flex items-center py-4 mx-3 space-x-2">
				<Input
					placeholder="Filter by transaction ID,name,account number,..."
					className="max-w-sm px-4 "
					value={searchTerm}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSearchTerm(e.target.value)
					}
				/>
				<Button
					type="submit"
					className="text-white"
					onClick={() => handleSearchFilter(searchTerm)}
					disabled={isSearching}
				>
					{isSearching ? (
						<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<SearchIcon />
					)}
				</Button>
			</div> */}
      <div className="rounded-md border">
        <Table
          className={
            balances?.length <= 25 || isLoading ? "h-auto" : "h-[590px]"
          }
        >
          <TableHeader
            className={`  h-[48px] sticky top-0 border-foreground border-b`}
          >
            <TableRow>
              <TableHead className="w-auto text-[#898989] font-medium ">
                Amount
              </TableHead>
              <TableHead className="w-auto text-[#898989] font-medium ">
                Business ID
              </TableHead>
              <TableHead className="w-auto text-[#898989] font-medium ">
                Credit
              </TableHead>
              <TableHead className="w-auto text-[#898989] font-medium ">
                Debit
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
                <TableCell colSpan={5} className="p-0">
                  <div className="flex justify-center items-center  ">
                    <Loader width="w-8" height="h-8" />
                  </div>
                </TableCell>
              </TableRow>
            ) : balances?.length === 0 ? (
              <TableRow className="h-32">
                <TableCell colSpan={5} className="p-0">
                  <div className="flex justify-center items-center  ">
                    <h1 className="text-xl">
                      You have no balances for the specified date range!
                    </h1>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              balances?.map((balance: any) => (
                <TableRow
                  // onClick={() => showMore(index)}
                  key={balance?.b_id}
                  className="cursor-pointer hover:bg-[#E7EDFF]"
                >
                  <TableCell className="font-WorkSans font-normal h-[60px]">
                    ₦ {balance?.balance ? balance?.balance : "N/A"}
                  </TableCell>
                  <TableCell className="font-WorkSans font-normal h-[60px]">
                    {balance?.b_id ? balance?.b_id : "N/A"}
                  </TableCell>
                  <TableCell className="font-WorkSans font-normal h-[60px] text-[#61A72C] truncate">
                    ₦ {balance?.credit}
                  </TableCell>
                  <TableCell
                    className={`font-WorkSans font-semibold h-[60px] text-red-500"
										`}
                  >
                    ₦ {balance?.debit}
                  </TableCell>
                  {/* <TableCell className={`font-WorkSans font-normal h-[60px] `}>
										{transaction?.fee_string ? transaction?.fee_string : "N/A"}
									</TableCell> */}
                  <TableCell className="font-WorkSans font-normal h-[60px]">
                    {balance?.on ? formatDate(balance?.on) : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {balances?.filter((balance) => balance.isSelected).length} of{" "}
          {balances?.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="w-[100px]"
            onClick={() => {
              if (pageNumber > 0) {
                queryClient.invalidateQueries({ queryKey: ["balances"] });
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
              // if (filterValues.start && filterValues.end) {
              // 	const payload = {
              // 		start: filterValues.start,
              // 		end: filterValues.end,
              // 		last: transactions[lastIndex]?.r_id,
              // 	};
              // 	handleFilterMore(payload);
              // } else {
              handleLoadMore(balances[lastIndex]?.c_id);
              setPageNumber(pageNumber + 1);
              // }
            }}
            disabled={isLoadingMore}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
