import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { useAtom, useSetAtom } from "jotai";
import { collapsedAtom, accountNameAtom } from "@/store/atoms";
interface UpdateModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateModalLoading: boolean;
  handleUpdate: () => void;
}
const UpdateModal: React.FC<UpdateModalProps> = ({
  open,
  setOpen,
  updateModalLoading,
  handleUpdate,
}) => {
  const setAccountNameAtom = useSetAtom(accountNameAtom);
  const [account_name] = useAtom(accountNameAtom);
  const [isCollapsed] = useAtom(collapsedAtom);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>("");
  useEffect(() => {
    setCollapsed(isCollapsed);
    setAccountName(account_name);
  }, [isCollapsed, account_name]);
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-opacity-30 bg-gray-900 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative ${
              !collapsed ? "-right-32" : "right-0"
            } transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`}
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <UserIcon
                  aria-hidden="true"
                  className="size-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Update the Meta Account
                </DialogTitle>
                <div className="mt-2">
                  <div className="flex justify-center items-center gap-5">
                    <label className="block text-sm/6 font-medium text-gray-900">
                      Account Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={accountName}
                        onChange={(e) => {
                          setAccountName(e.target.value);
                          setAccountNameAtom(e.target.value);
                        }}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex justify-center items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUpdate();
                }}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {updateModalLoading && (
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                )}
                Confirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateModal;
