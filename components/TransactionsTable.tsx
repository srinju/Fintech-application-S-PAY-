import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

  export const transactionCategoryStyles = {
    "Food and Drink": {
      borderColor: "border-pink-600",
      backgroundColor: "bg-pink-500",
      textColor: "text-pink-700",
      chipBackgroundColor: "bg-inherit",
    },
    Payment: {
      borderColor: "border-success-600",
      backgroundColor: "bg-green-600",
      textColor: "text-success-700",
      chipBackgroundColor: "bg-inherit",
    },
    "Bank Fees": {
      borderColor: "border-success-600",
      backgroundColor: "bg-green-600",
      textColor: "text-success-700",
      chipBackgroundColor: "bg-inherit",
    },
    Transfer: {
      borderColor: "border-red-700",
      backgroundColor: "bg-red-700",
      textColor: "text-red-700",
      chipBackgroundColor: "bg-inherit",
    },
    Processing: {
      borderColor: "border-[#F2F4F7]",
      backgroundColor: "bg-gray-500",
      textColor: "text-[#344054]",
      chipBackgroundColor: "bg-[#F2F4F7]",
    },
    Success: {
      borderColor: "border-[#12B76A]",
      backgroundColor: "bg-[#12B76A]",
      textColor: "text-[#027A48]",
      chipBackgroundColor: "bg-[#ECFDF3]",
    },
    Travel: {
      borderColor: "border-[#0047AB]",
      backgroundColor: "bg-blue-500",
      textColor: "text-blue-700",
      chipBackgroundColor: "bg-[#ECFDF3]",
    },
    default: {
      borderColor: "",
      backgroundColor: "bg-blue-500",
      textColor: "text-blue-700",
      chipBackgroundColor: "bg-inherit",
    },
  };
  
  const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const {
      borderColor,
      backgroundColor,
      textColor,
      chipBackgroundColor,
     } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
     
    return (
      <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
        <div className={cn('size-2 rounded-full', backgroundColor)} />
        <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
      </div>
    )
  } 
  
  const TransactionsTable = ({ transactions }: TransactionTableProps) => {
    return (
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Transaction</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2 max-md:hidden">Channel</TableHead>
            <TableHead className="px-2 max-md:hidden">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t: Transaction) => {
            const status = getTransactionStatus(new Date(t.date))
            const amount = formatAmount(t.amount)
  
            const isDebit = t.type === 'debit';
            const isCredit = t.type === 'credit';
  
            return (
              <TableRow key={t.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#fffbfa]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}>
                <TableCell className="max-w-[250px] pl-2 pr-10">
                  <div className="flex items-center gap-3">
                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                      {removeSpecialCharacters(t.name)}
                    </h1>
                  </div>
                </TableCell>
  
                <TableCell className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount[0] === '-' ?
                    'text-[#f04438]'
                    : 'text-[#039855]'
                }`}>
                  {isDebit ? `-${amount}` : isCredit ? amount : amount}
                </TableCell>
  
                <TableCell className="pl-2 pr-10">
                  <CategoryBadge category={status} /> 
                </TableCell>
  
                <TableCell className="min-w-32 pl-2 pr-10">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>
  
                <TableCell className="pl-2 pr-10 capitalize min-w-24">
                 {t.paymentChannel}
                </TableCell>
  
                <TableCell className="pl-2 pr-10 max-md:hidden">
                 <CategoryBadge category={t.category} /> 
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
  
  export default TransactionsTable