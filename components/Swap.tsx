'use client';

import { useState, useMemo } from "react";
import { Suspense } from "react";

import { useProvider, useAccount } from 'wagmi';
import { useNetwork } from 'wagmi'

import SelectTokenInModal from "./modals/SelectTokenInModal";
import SelectTokenOutModal from "./modals/SelectTokenOutModal";
import FetchedAmountOut from "./FetchedAmountOut";

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
        <Suspense fallback={<p>Loading...</p>}>
          {/* @ts-expect-error Async Server Component */}
          <FetchedAmountOut 
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
        null
      )
    }
  }, [amountIn, tokenInAddress, tokenOutAddress, provider, connectedChain?.id]);  

  return (
    <>
      <div className="w-2/3 mx-auto">
        <p>Chain : {chain}</p>

        <div className="flex justify-between">
          <p>Token in address : {tokenInAddress}</p>
          <button className="flex text-white text-base
          transition rounded-xl bg-[#222429] hover:bg-[#2e3138]"
          onClick={() => setIsSelectTokenInModalOpen(true)}>
            Select token in
          </button>
        </div>

        <div className="flex justify-between">
          <p>Token out address : {tokenOutAddress}</p>
          <button className="flex text-white text-base
          transition rounded-xl bg-[#222429] hover:bg-[#2e3138]"
          onClick={() => setIsSelectTokenOutModalOpen(true)}>
            Select token out
          </button>
        </div>

        <input
          type="number"
          placeholder={"Enter value token in"}
          value={amountIn}
          onChange={handleInputInChange}
        />
        <div>
          {fetchedAmountOut}
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