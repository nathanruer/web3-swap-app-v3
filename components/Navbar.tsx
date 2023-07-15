'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <div className="w-full py-6 relative">
      <div className="max-w-[2520px] mx-auto px-10">
        <div className="flex flex-row justify-between items-center">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
