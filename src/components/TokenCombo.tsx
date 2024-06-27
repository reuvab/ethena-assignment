import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { Fragment, useCallback, useState } from 'react';
import { TokenLogo } from './TokenLogo';
import { TokenWithBalance } from './types';

export const TokenCombo = ({
  tokenList,
  selected,
  onTokenChange,
}: {
  tokenList: TokenWithBalance[];
  selected: TokenWithBalance | null;
  onTokenChange: (v: TokenWithBalance) => void;
}) => {
  //TODO: max height
  const [value, setValue] = useState(selected ?? tokenList[0]);

  const handleTokenChange = useCallback(
    (token: TokenWithBalance) => {
      setValue(token);
      onTokenChange(token);
    },
    [onTokenChange]
  );

  return (
    <Listbox value={value} onChange={handleTokenChange}>
      {({ open }) => (
        <>
          <ListboxButton className='bg-metal text-white w-32 flex flex-row items-center justify-between px-2 h-10 rounded-xl border border-[#2A2C30]'>
            <div className='flex items-center justify-start gap-2'>
              <TokenLogo symbol={value.symbol} />
              <p>{value.name}</p>
            </div>
            <ChevronDownIcon className={clsx('w-5 h-5', { 'rotate-180': open })} />
          </ListboxButton>
          <ListboxOptions
            anchor='bottom'
            transition
            className='bg-metal w-32 rounded-xl mt-1 max-h-48 z-50 scrollbar-dropdown origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
          >
            {tokenList.map((token) => (
              <ListboxOption key={token.symbol} value={token} as={Fragment}>
                {({ focus, selected }) => (
                  <div className={clsx('gap-2 bg-metal text-white py-2 px-1 h-10')}>
                    <div
                      className={clsx('rounded-lg px-2 first:pt-0 last:pb-0 py-2', {
                        'bg-blue-500': focus || selected,
                      })}
                    >
                      <button className='flex items-center flex-row justify-start gap-2 w-full'>
                        <TokenLogo symbol={token.symbol} />
                        <div className='flex-col flex items-start justify-center'>
                          <p className='text-sm'>{token.name}</p>
                          <p className='text-gray-400 text-xs leading-3'>{token.balance}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </>
      )}
    </Listbox>
  );
};
