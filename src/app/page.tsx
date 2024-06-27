'use client';

import { TokenDialog } from '@/components/TokenDialog';
import { TokenLogo } from '@/components/TokenLogo';
import { TokenList, TokenWithBalance } from '@/components/types';
import { Button } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';
import { erc20Abi, formatEther, formatUnits } from 'viem';
import { useAccount, useBalance, useReadContracts } from 'wagmi';

const ordinaryFormat = (number: number | bigint) => {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
    notation: 'standard',
  }).format(number);
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<TokenWithBalance | null>(null);

  const { address } = useAccount();

  const contracts = TokenList.reduce((acc, token) => {
    return [
      ...acc,
      {
        address: token.contract,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: token.contract,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ];
  }, [] as any[]);

  const { data } = useReadContracts({
    allowFailure: true,
    contracts: contracts,
  });

  const { data: ethBalance } = useBalance({ address });

  const tokenWithBalances = useMemo(() => {
    const res = [] as TokenWithBalance[];
    if (!address) return res;
    if (!data) return res;

    for (let i = 0; i < data.length; i += 2) {
      const balance = data[i]?.result as bigint;
      const decimals = Number(data[i + 1]?.result as bigint);

      const token = TokenList[i / 2];
      if (!decimals) {
        res.push({
          ...token,
          balance: '0',
        });
      } else {
        res.push({
          ...token,
          balance: ordinaryFormat(Number(formatUnits(balance, decimals))),
        });
      }
    }
    // Add ETH
    res.unshift({
      name: 'ETH',
      symbol: 'ETH',
      contract: '0x',
      balance: ordinaryFormat(+formatEther(ethBalance?.value ?? 0n)),
    });

    return res;
  }, [address, data, ethBalance?.value]);

  return (
    <main className='h-screen text-white w-4/5 flex items-center flex-col gap-5'>
      <div className='bg-[rgba(20,24,33,0.60)] w-4/5 p-6 flex items-center justify-between rounded-xl h-20 border-[#2A2C30] border'>
        <div className='flex flex-col'>
          <p className='font-semibold'>Select Collateral Token</p>
          <p className='text-gray-400 text-xs leading-3'>Choose a token to mint USDe</p>
        </div>
        <Button
          className='bg-metal text-white w-32 flex flex-row items-center justify-between px-2 h-10 rounded-xl border border-[#2A2C30]'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className='flex items-center justify-start gap-2'>
            {selected && (
              <>
                <TokenLogo symbol={selected.symbol} />
                <p>{selected.name}</p>
              </>
            )}
            {!selected && <p className='text-sm'>Select Token</p>}
          </div>
          <ChevronDownIcon className='w-5 h-5' />
        </Button>
      </div>

      <button
        className='transform transition-transform duration-200 hover:scale-105 bg-gray-900 text-white font-bold py-2 px-4 rounded-md border border-gray-500 hover:bg-gray-800'
        disabled={selected === null}
      >
        {`Mint ${selected?.name ?? ''}`}
      </button>

      <div>
        <TokenDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onValidate={setSelected}
          selected={selected}
          tokenList={tokenWithBalances}
        />
      </div>
    </main>
  );
}
