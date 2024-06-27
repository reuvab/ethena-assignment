'use client';

import { WalletPopover } from '@/components/WalletPopover';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import ethenaLogo from '../assets/logo.svg';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(inter.className, 'bg-black leading-[22px] p-8')}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <div className='p-8 grid grid-cols-1 justify-items-center gap-5 border border-blue-400 rounded-3xl border-opacity-40'>
              <div className='flex rounded-full border py-2 px-4 w-4/5 justify-between border-[#2A2C30]'>
                <div className='flex flex-row justify-start gap-2 items-center'>
                  <Link href='https://ethena.fi/'>
                    <Image src={ethenaLogo} alt='logo' width={30} height={30} />
                  </Link>
                  <span className='text-gray-300 text-xl'>Ethena</span>
                </div>
                <WalletPopover />
              </div>
              {children}
            </div>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
