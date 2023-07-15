import { Provider } from "@wagmi/core";
import { getAmountOut1Inch } from "@/hooks/getAmountOut1Inch";

interface AmountOutProps {
  tokenInAddress?: string;
  tokenOutAddress?: string;
  amountIn: string;
  provider: Provider;
  chainId?: number | undefined,
}

const AmountOut = async ({ tokenInAddress, tokenOutAddress, amountIn, provider, chainId }: AmountOutProps) => {
  let amountOut = "";

  if (tokenInAddress && tokenOutAddress && chainId) {
    amountOut = await getAmountOut1Inch(tokenInAddress, tokenOutAddress, amountIn, provider, chainId);
  }

  return (
    <div>
      {amountOut}
    </div>
  );
};

export default AmountOut;
