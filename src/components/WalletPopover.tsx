import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const WalletPopover = () => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const buttonText =
    address && isConnected ? address.slice(0, 6) + '...' + address.slice(-4) : 'Connect Wallet';
  return (
    <Popover className='group'>
      <PopoverButton
        className='bg-gray-300 text-black font-bold py-2 px-4 rounded-full border border-[#2A2C30] hover:bg-gray-400 flex flex-row items-center justify-around gap-2'
        onClick={() => (isConnected ? null : connect({ connector: connectors[0] }))}
      >
        {buttonText}
        <ChevronDownIcon className='w-4 h-4 text-black group-hover:text-black/60 group-data-[open]:rotate-180' />
      </PopoverButton>

      {isConnected && (
        <PopoverPanel
          anchor='bottom'
          transition
          className='bg-gray-300 transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 divide-y [--anchor-gap:10px] rounded-lg'
        >
          <div className='p-4'>
            <button
              onClick={() => disconnect()}
              className='bg-gray-800 text-white font-medium py-2 px-4 rounded-lg border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              disconnect
            </button>
          </div>
        </PopoverPanel>
      )}
    </Popover>
  );
};
