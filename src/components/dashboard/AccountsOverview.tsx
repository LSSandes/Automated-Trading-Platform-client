import { useEffect } from "react";
import { Plus, Wallet } from "lucide-react";
import { useSelector, dispatch } from "@/app/store";
import { getAccountsInfo } from "@/app/reducers/metaAccountInfo";

export default function AccountsOverview() {
  const accounts = useSelector((state) => state.metaAccount.accounts);
  const accountsInfo = useSelector(
    (state) => state.metaAccountInfo.accountsInfo
  );
  useEffect(() => {
    accounts.forEach((account) => {
      dispatch(getAccountsInfo(account.accountId));
    });
  }, [accounts]);
  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Connected Accounts</h2>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map((account, index) => {
          const accountInfo = accountsInfo.find(
            (info) => String(info.login) === account.login
          );
          return (
            <div
              key={index}
              className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-dark-200/50 rounded-lg">
                    <Wallet className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">
                        {account.accountName}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          account.server.includes("Demo")
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {account.server.includes("Demo") ? "DEMO" : "LIVE"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      ${accountInfo?.balance.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm ${
                      (accountInfo?.equity ?? 0) -
                        (accountInfo?.balance ?? 0) >=
                      0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {(accountInfo?.equity ?? 0) - (accountInfo?.balance ?? 0) >=
                    0
                      ? "+"
                      : ""}
                    {(
                      (accountInfo?.equity ?? 0) - (accountInfo?.balance ?? 0)
                    ).toFixed(2)}{" "}
                    USD
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="w-full mt-4 px-4 py-2 border border-accent/30 text-accent rounded-lg
                       hover:bg-accent/10 transition-all duration-300"
      >
        Manage Accounts
      </button>
    </div>
  );
}
