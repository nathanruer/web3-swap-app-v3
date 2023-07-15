'use client';

import { useMemo } from "react";

import { useProvider } from "wagmi";
import TokenSymbol from "./TokenSymbol";
import { Suspense } from "react";
import Loading from "./Loading";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface TokenSelectProps {
  tokenAddress: string | null | undefined;
  onOpen: () => void;
  chain: string | null | undefined;
}

const TokenSelect: React.FC<TokenSelectProps> = ({
  tokenAddress,
  onOpen,
  chain,
}) => {
  const provider = useProvider();

  const tokenSymbol = useMemo(() => {
    return (
      <Suspense>
        {/* @ts-expect-error Async Server Component */}
        <TokenSymbol tokenAddress={tokenAddress} provider={provider} />
      </Suspense>
    );
  }, [tokenAddress, provider]);
  

  return (
    <button className="flex text-white text-base w-[150px]
    py-2 px-4 transition rounded-xl bg-[#222429] hover:bg-[#2e3138]"
    onClick={onOpen}>
      <div className="flex w-full items-center justify-between">
        {tokenSymbol}
        <MdOutlineKeyboardArrowDown />
      </div>
    </button>
  )
}

export default TokenSelect