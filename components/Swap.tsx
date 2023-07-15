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

  return (
    <div>
      <p>Chain : {chain}</p>
      <p>Token in address : {tokenInAddress}</p>
      <p>Token out address : {tokenOutAddress}</p>
    </div>
  )
}

export default Swap;