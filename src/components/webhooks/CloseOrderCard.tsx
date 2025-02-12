import { useState, useEffect, useRef } from "react";
import { CloseOrderConfig } from "@/types/webhook";
import { Clock, MoreVertical } from "lucide-react";
import CloseOrderMenu from "./CloseOrderMenu";
import EditCloseOrderModal from "./EditCloseOrderModal";
import { userAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { deleteCloseOrder } from "@/app/reducers/webhook";
import { dispatch } from "@/app/store";
import { toast } from "react-toastify";
import CloseOrderAppModal from "./CloseOrderAppModal";
export default function CloseOrderCard({
  closeOrder,
}: {
  closeOrder: CloseOrderConfig;
}) {
  const [user] = useAtom(userAtom);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const handleDelete = () => {
    if (user) {
      dispatch(
        deleteCloseOrder({
          email: user?.email,
          webhookName: closeOrder.webhookName,
          webhookMode: closeOrder.webhookMode,
          symbol: closeOrder.symbol,
        })
      ).then(() => {
        toast.success("The CloseOrder is deleted");
      });
    }
  };
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
  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden transition-all duration-300 
                      hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}
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
                  <span className="text-sm text-purple-400">
                    {closeOrder.webhookName}
                  </span>
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
              <div className="text-white font-medium">
                {"Never"}
              </div>
            </div>

            <div className="glass-panel rounded-lg p-3 border border-dark-300/30">
              <div className="text-gray-400 text-sm mb-1">Success Rate</div>
              <div className="text-emerald-400 font-medium">
                {"N/A"}
              </div>
            </div>
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
