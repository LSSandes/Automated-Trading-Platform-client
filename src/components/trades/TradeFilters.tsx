import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useAtom } from "jotai";
import { selectedAccountAtom, selectedAccountTypeAtom } from "@/store/atoms";
import { filterOptions } from "../../store/tradesFilterStore";
import { MdOutlineAccountTree } from "react-icons/md";
import { useSelector } from "@/app/store";
import { useEffect } from "react";
export default function TradeFilters() {
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [selectedAccountType, setSelectedAccountType] = useAtom(
    selectedAccountTypeAtom
  );

  const metaAccounts = useSelector((state) => state.metaAccount.accounts);
  const tradelockerAccounts = useSelector(
    (state) => state.tradelocker.accounts
  );

  const handleAccountTypeChange = (accountType: string) => {
    setSelectedAccountType(accountType);
  };
  useEffect(() => {
    if (selectedAccountType === "MetaTrader" && metaAccounts.length > 0) {
      setSelectedAccount(metaAccounts[0].accountId);
    } else if (
      selectedAccountType === "TradeLocker" &&
      tradelockerAccounts.length > 0
    ) {
      setSelectedAccount(tradelockerAccounts[0].id);
    }
  }, [selectedAccountType, metaAccounts, tradelockerAccounts]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* The Account Type */}
      <div className="relative min-w-[160px]">
        <MdOutlineAccountTree className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          value={selectedAccountType}
          onChange={(e) => handleAccountTypeChange(e.target.value)}
          className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.accountType.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* The Account Filter */}
      <div className="relative min-w-[160px]">
        <MdOutlineAccountBalanceWallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {selectedAccountType == "MetaTrader"
            ? metaAccounts.map((account) => (
                <option key={account.accountId} value={account.accountId}>
                  {account.accountName}
                </option>
              ))
            : tradelockerAccounts.map((account, index) => (
                <option key={index} value={account.id}>
                  {account.accNum}-{account.id}
                </option>
              ))}
        </select>
      </div>
      {/* Time Filter */}
      {/* <div className="relative min-w-[160px]">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          value={filters.timeframe}
          onChange={(e) => handleFilterChange("timeframe", e.target.value)}
          className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.timeframes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}

      {/* Trade Type Filter */}
      {/* <div className="relative min-w-[160px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          value={filters.tradeType}
          onChange={(e) => handleFilterChange("tradeType", e.target.value)}
          className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.tradeTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}

      {/* Symbol Filter */}
      {/* <div className="relative min-w-[140px]">
        <select
          value={filters.pair}
          onChange={(e) => handleFilterChange("pair", e.target.value)}
          className="h-10 w-full pl-4 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.pairs.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}

      {/* Outcome Filter */}
      {/* <div className="relative min-w-[140px]">
        <select
          value={filters.outcome}
          onChange={(e) => handleFilterChange("outcome", e.target.value)}
          className="h-10 w-full pl-4 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.outcomes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div> */}

      <div className="relative"></div>
      {/* Search */}
      {/* <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search trades..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full h-10 pl-10 pr-4 bg-dark-200/50 text-gray-300 rounded-lg 
                   border border-dark-300/30 focus:outline-none focus:ring-1 
                   focus:ring-accent/50 transition-all duration-300"
        />
      </div> */}
    </div>
  );
}
