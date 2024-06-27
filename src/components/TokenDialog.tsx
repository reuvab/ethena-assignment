'use client';

import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useCallback, useState } from 'react';
import { TokenCombo } from './TokenCombo';
import { TokenWithBalance } from './types';

export const TokenDialog = ({
  isOpen,
  onClose,
  selected,
  onValidate,
  tokenList,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: TokenWithBalance | null;
  onValidate: (token: TokenWithBalance) => void;
  tokenList: TokenWithBalance[];
}) => {
  const [token, setToken] = useState<TokenWithBalance | null>(null);

  const handleConfirm = useCallback(
    (token: TokenWithBalance | null) => {
      if (token === null) {
        // manage an error
        return;
      }

      onValidate(token);
      onClose();
    },
    [onValidate, onClose]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      as='div'
      className='fixed inset-0 z-10 overflow-y-auto text-white transition duration-300 ease-out data-[closed]:opacity-0'
    >
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogBackdrop className='fixed inset-0 bg-black/30 animate-blur' />
        <DialogPanel className='max-w-lg space-y-4 bg-metal opacity-80 p-12 rounded-2xl flex flex-col items-center gap-7'>
          <DialogTitle className='font-bold'>Select Collateral Token</DialogTitle>
          <Description className='flex flex-col items-start justify-center gap-8'>
            <p className='text-gray-300 text-sm'>
              Core to engaging in the Ethena ecosystem is minting our stablecoin. You can deposit a
              variety of tokens as collateral, including liquid staking derivatives like stETH,
              ether, and popular stablecoins like USDT. Choose your preferred token from the options
              below to mint USDe.
            </p>
            <div className='flex flex-row items-center justify-between w-full'>
              <p>Choose a token to mint USDe</p>
              <TokenCombo tokenList={tokenList} onTokenChange={setToken} selected={token} />
            </div>
          </Description>

          <div className='flex gap-4'>
            <button
              className='transform transition-transform duration-200 hover:scale-105 bg-gray-300 text-black font-bold py-2 px-4 rounded-md border border-[#2A2C30] hover:bg-gray-400'
              onClick={() => handleConfirm(token)}
            >
              OK
            </button>
            <button
              className='transform transition-transform duration-200 hover:scale-105 bg-gray-900 text-white font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-800'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
