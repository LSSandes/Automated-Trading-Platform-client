import { useState, useEffect, useRef } from "react";
import { Clock, MoreVertical } from "lucide-react";
import CloseOrderMenu from "./CloseOrderMenu";
import EditCloseOrderModal from "./EditCloseOrderModal";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { deleteCloseOrder, openCloseOrder } from "@/app/reducers/closeOrder";
import { dispatch, useSelector } from "@/app/store";
import CloseOrderAppModal from "./CloseOrderAppModal";
import { CloseOrderCardProps } from "@/types/webhook";
import { FaChartBar } from "react-icons/fa";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
export default function CloseOrderCard({
  closeOrder,
  onToggleActive,
  onTogglePublic,
}: CloseOrderCardProps) {
  const [user] = useAtom(userAtom);
  const metaAccounts = useSelector((state) => state.metaAccount.accounts);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [accountName, setAccountName] = useState<string>("");
  const [tradeLoading, setTradeLoading] = useState<boolean>(false);
  const [timeDiff, setTimeDiff] = useState("");
  const handleDelete = () => {
    if (user) {
      dispatch(
        deleteCloseOrder({
          email: user?.email,
          webhookName: closeOrder.webhookName,
          webhookMode: closeOrder.webhookMode,
          symbol: closeOrder.symbol,
        })
      );
    }
  };
  useEffect(() => {
    const updateTimeDiff = () => {
      const now = Date.now();
      if (closeOrder.tradeStartTime) {
        const tradeExecutionTime = closeOrder.tradeStartTime
          ? new Date(closeOrder.tradeStartTime).getTime()
          : 0;
        const diffInMilliseconds = now - tradeExecutionTime;
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor(
          (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );
        if (hours === 0) {
          setTimeDiff(`${minutes} m ago`);
        } else {
          setTimeDiff(`${hours} h ${minutes} m ago`);
        }
      }
    };
    updateTimeDiff();
    const intervalId = setInterval(updateTimeDiff, 1000);
    return () => clearInterval(intervalId);
  }, [closeOrder]);
  useEffect(() => {
    const findAccount = metaAccounts.find((account) => {
      return account.accountId === closeOrder.accountId;
    });
    setAccountName(findAccount ? findAccount.accountName : "");
  });
  //  ***************************Card menu disable and enable**********************************//
  const menuRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleOpenTrade = () => {
    if (closeOrder.connectionStatus) {
      setTradeLoading(true);
      if (user) {
        dispatch(
          openCloseOrder({
            email: user?.email,
            accountId: closeOrder.accountId,
            webhookName: closeOrder.webhookName,
            webhookMode: closeOrder.webhookMode,
            symbol: closeOrder.symbol,
          })
        ).then(() => {
          setTradeLoading(false);
        });
      }
    } else {
      toast.info("The account should be connected.");
    }
  };
  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 
                      hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5 border border-gray-500`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-dark-200/20 to-dark-200/5 opacity-10`}
        />
        {/* Content */}
        <div className="relative glass-panel rounded-xl p-6 border border-dark-300/30">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {closeOrder.webhookName}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-purple-400">{accountName}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-sm">
                    {closeOrder.connectionStatus === true ? (
                      <span className="text-emerald-400">connected</span>
                    ) : (
                      <span className="text-gray-400">not connected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                         rounded-lg transition-all"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            <span
              className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300
                         border border-dark-300/30 backdrop-blur-sm"
            >
              {closeOrder.symbol}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-panel rounded-lg p-3 border border-dark-300/30">
              <div className="text-gray-400 text-sm mb-1">Last Signal</div>
              <div className="text-white font-medium">{timeDiff ? timeDiff : "Never"}</div>
            </div>

            <div className="glass-panel rounded-lg p-3 border border-dark-300/30">
              <div className="text-gray-400 text-sm mb-1">Success Rate</div>
              <div className="text-emerald-400 font-medium">{"N/A"}</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-6">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-xs text-gray-400">Active</span>
                <button
                  onClick={() => onToggleActive(closeOrder.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    closeOrder.isActive ? "bg-accent" : "bg-dark-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      closeOrder.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-xs text-gray-400">Public</span>
                <button
                  onClick={() => onTogglePublic(closeOrder.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    closeOrder.isPublic ? "bg-accent" : "bg-dark-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      closeOrder.isPublic ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            <button
              onClick={handleOpenTrade}
              className="px-3 py-1.5 text-[16px] bg-dark-200/50 text-gray-300 rounded-lg
                                 border border-dark-300/30 hover:bg-dark-200/80 transition-colors
                                 flex items-center space-x-1"
            >
              {tradeLoading && <Loader className="h-5 w-5 mr-2 animate-spin" />}
              {!tradeLoading && <FaChartBar className="h-4 w-4" />}
              <span>Open Trade</span>
            </button>
          </div>
        </div>
        {showMenu && (
          <div ref={menuRef}>
            <CloseOrderMenu
              onEdit={() => setShowEditModal(true)}
              onDelete={handleDelete}
              onManageApps={() => setShowAppsModal(true)}
            />
          </div>
        )}
      </div>
      <EditCloseOrderModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        closeOrder={closeOrder}
      />
      <CloseOrderAppModal
        isOpen={showAppsModal}
        onClose={() => setShowAppsModal(false)}
        closeOrder={closeOrder}
      />
    </>
  );
}
