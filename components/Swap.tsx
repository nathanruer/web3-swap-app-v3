'use client';

import { useState, useMemo } from "react";
import { Suspense } from "react";

import { useProvider } from 'wagmi';
import { useNetwork } from 'wagmi'

import SelectTokenInModal from "./modals/SelectTokenInModal";
import SelectTokenOutModal from "./modals/SelectTokenOutModal";
import AmountOut from "./AmountOut";
import Loading from "./Loading";
import SwitchNetwork from "./SwitchNetwork";
import TokenSelect from "./TokenSelect";

interface SwapProps {
  chain?: string | null;
  tokenInAddress?: string | null;
  tokenOutAddress?: string | null;
}

const Swap: React.FC<SwapProps> = ({
  chain,
  tokenInAddress,
  tokenOutAddress,
}) => {
  const provider = useProvider();
  const { chain:connectedChain } = useNetwork()

  const [isSelectTokenInModalOpen, setIsSelectTokenInModalOpen] = useState(false);
  const [isSelectTokenOutModalOpen, setIsSelectTokenOutModalOpen] = useState(false);

  const [amountIn, setAmountIn] = useState("");
  const handleInputInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountIn(value);
  };

  const fetchedAmountOut = useMemo(() => {
    if (amountIn && tokenInAddress && tokenOutAddress)  {
      return (
        <Suspense fallback={<Loading width="w-[200px]" height="h-[32px]"/>}>
          {/* @ts-expect-error Async Server Component */}
          <AmountOut 
            tokenInAddress={tokenInAddress} 
            tokenOutAddress={tokenOutAddress}
            amountIn={amountIn}
            provider={provider} 
            chainId={connectedChain?.id}
          />
        </Suspense>
      )
    } else {
      return (
        <p className="text-gray-400">0.0</p>
      )
    }
  }, [amountIn, tokenInAddress, tokenOutAddress, provider, connectedChain?.id]);  

  return (
    <>
      <div className="p-10">
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto rounded-3xl 
        bg-neutral-700/10 shadow-2xl shadow-[#141619] p-10">
          <SwitchNetwork 
            chain={chain}
          />

          <div className="p-3 w-full flex justify-between">
            <input
              type="number"
              placeholder="0.0"
              value={amountIn}
              onChange={handleInputInChange}
              className="w-3/5"
            />
            <TokenSelect 
              tokenAddress={tokenInAddress}
              onOpen={() => setIsSelectTokenInModalOpen(true)}
              chain={chain}
            />
          </div>

          <div className="p-3 flex justify-between">
            <div className="w-3/5">
              {fetchedAmountOut}
            </div>
            <TokenSelect 
              tokenAddress={tokenOutAddress}
              onOpen={() => setIsSelectTokenOutModalOpen(true)}
              chain={chain}
            />
          </div>

          <button className="flex justify-center w-full mt-4 py-2.5 bg-gradient-to-r
          from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br 
          rounded-xl hover:opacity-80 transition">
            Swap
        </button>
        </div>
      </div>

      <SelectTokenInModal 
        isOpen={isSelectTokenInModalOpen} 
        onClose={() => setIsSelectTokenInModalOpen(false)}
      />
      <SelectTokenOutModal 
        isOpen={isSelectTokenOutModalOpen} 
        onClose={() => setIsSelectTokenOutModalOpen(false)}
      />
    </>
  )
}

export default Swap;