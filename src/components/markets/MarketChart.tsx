import axios from "../../utils/api";
import { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { MdOutlineWebhook } from "react-icons/md";
import MarketStrategyModal from "./MarketStrategyModal";
// import { FaChartBar } from "react-icons/fa";
import NewWebhookModal from "../webhooks/NewWebhookModal";
interface GlobalParams {
  ask: number;
  bid: number;
  prevAsk: number;
  prevBid: number;
  symbol: string;
}
export default function MarketChart() {
  const [global, setGlobal] = useState<GlobalParams[]>([]);
  const [platform, setPlatform] = useState<string>("mt4");
  const [selected, setSelected] = useState<string>("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [tradingViewSymbol, setTradingViewSymbol] = useState<string>("GBPUSD");
  console.log("------global------>", global);
  const [isOpenTrade, setIsOpenTrade] = useState<boolean>(false);
  const [isCreateStrategy, setIsCreateStrategy] = useState<boolean>(false);
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get("symbols/price");
        if (response.data) {
          setGlobal(response.data);
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };
    fetchPrice();
    const intervalId = setInterval(fetchPrice, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    setTradingViewSymbol(selected);
  }, [selected]);
  useEffect(() => {
    onChangeSymbol(platform);
  }, []);
  const onChangeSymbol = async (platform: string) => {
    const response = await axios.post("webhook/get-symbols", {
      platform: platform,
    });
    setSymbols(response.data.data.result.mt4_symbols);
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex lg:items-center justify-between lg:flex-row flex-col gap-5 items-start my-3">
        <div className="flex items-center space-x-4 lg:w-1/2 w-full">
          <h2 className="text-xl font-medium text-white">
            {tradingViewSymbol ? tradingViewSymbol : "Please select symbol"}
          </h2>
        </div>
        <div className="flex justify-end items-center gap-5 lg:flex-row flex-col lg:w-1/2 w-full">
          <button
            onClick={() => setIsCreateStrategy(true)}
            className="premium-button flex items-center 2xl:w-1/4 w-full justify-center outline-1 outline-dashed outline-offset-2 outline-blue-500"
          >
            <MdOutlineWebhook className="h-5 w-5 mr-2" />
            Create Strategy
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start gap-2 w-full 2xl:flex-row flex-col overflow-y-auto">
        <div className="2xl:w-[15%] w-full flex flex-col gap-5">
          <table className="min-w-full table-auto border-collapse bg-transparent text-gray-500 font-sans text-[12px]">
            <thead className="text-gray-300">
              <tr>
                <th className="py-2 px-4 border-b border-gray-600 text-left">
                  Symbol
                </th>
                <th className="py-2 px-4 border-b border-gray-600 text-left">
                  Bid
                </th>
                <th className="py-2 px-4 border-b border-gray-600 text-left">
                  Ask
                </th>
              </tr>
            </thead>
            <tbody>
              {global && global?.map((item, index) => {
                const bidColor =
                  item.bid < item.prevBid
                    ? "text-red-500"
                    : item.bid > item.prevBid
                    ? "text-green-500"
                    : "text-green-500";
                const askColor =
                  item.ask < item.prevAsk
                    ? "text-red-500"
                    : item.ask > item.prevAsk
                    ? "text-green-500"
                    : "text-green-500";

                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-600">
                      {item.symbol}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-gray-600 ${bidColor}`}
                    >
                      {item.bid}
                    </td>
                    <td
                      className={`py-2 px-4 border-b border-gray-600 ${askColor}`}
                    >
                      {item.ask}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-7 border-b border-gray-600">
            <h1
              className={`text-sm text-gray-500 cursor-pointer rounded-t-lg px-5 pt-1 ${
                platform == "mt4"
                  ? "border-b border-gray-400 bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => {
                setPlatform("mt4");
                onChangeSymbol("mt4");
              }}
            >
              MT4
            </h1>
            <h1
              className={`text-sm text-gray-500 cursor-pointer rounded-t-lg px-5 pt-1 ${
                platform == "mt5"
                  ? "border-b border-gray-400 bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => setPlatform("mt5")}
            >
              MT5
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div className="text-sm">Symbol</div>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-2 w-full">
                <ListboxButton className="grid w-[100%] cursor-default grid-cols-1 rounded-md bg-transparent py-1.5 pl-3 pr-2 text-left text-white outline outline-1 -outline-offset-1 outline-gray-600 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 truncate pr-6">
                    {selected}
                  </span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-dark-200 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {symbols?.map((symbol, index) => (
                    <ListboxOption
                      key={index}
                      value={symbol}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-white data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-none"
                    >
                      <span className="block truncate font-normal group-data-[selected]:font-semibold">
                        {symbol}
                      </span>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-dark-200/30 lg:w-[80%] w-full h-[800px]">
          <div
            className="tradingview-widget-container"
            style={{ height: "100%", width: "100%" }}
          >
            <iframe
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_b3d06&symbol=${tradingViewSymbol}&interval=1&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=dark&studies=%5B%5D&theme=dark&style=1&timezone=exchange`}
              style={{
                width: "100%",
                height: "100%",
                margin: "0 !important",
                padding: "0 !important",
              }}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <MarketStrategyModal
        isOpen={isOpenTrade}
        onClose={() => setIsOpenTrade(false)}
      />
      <NewWebhookModal
        isOpen={isCreateStrategy}
        onClose={() => setIsCreateStrategy(false)}
      />
    </div>
  );
}
