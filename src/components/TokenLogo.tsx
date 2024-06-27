import Image from 'next/image';
import cbETH from '../assets/CBETH_ygnr8p.svg';
import ETH from '../assets/ethereum-eth-logo.svg';
import wbETH from '../assets/logo.svg'; // change me
import DAI from '../assets/multi-collateral-dai-dai-logo.svg';
import rETH from '../assets/rocket-pool-eth-reth-logo.svg';
import stETH from '../assets/steth-steth-logo.svg';
import USDT from '../assets/tether-usdt-logo.svg';
import USDC from '../assets/usd-coin-usdc-logo.svg';
import WETH from '../assets/weth.svg';

export const TokenLogo = ({ symbol }: { symbol: string }) => {
  return (
    <div className='w-8'>
      {(() => {
        switch (symbol) {
          case 'stETH':
            return <Image src={stETH} alt='stETH' width={24} height={20} />;
          case 'rETH':
            return <Image src={rETH} alt='rETH' width={24} height={24} />;
          case 'cbETH':
            return <Image src={cbETH} alt='cbETH' width={24} height={24} />;
          case 'wbETH':
            return <Image src={wbETH} alt='wbETH' width={24} height={24} />;
          case 'USDC':
            return <Image src={USDC} alt='USDC' width={24} height={24} />;
          case 'USDT':
            return <Image src={USDT} alt='USDT' width={24} height={24} />;
          case 'DAI':
            return <Image src={DAI} alt='DAI' width={24} height={24} />;
          case 'ETH':
            return <Image src={ETH} alt='ETH' width={20} height={20} />;
          case 'WETH':
            return <Image src={WETH} alt='WETH' width={24} height={24} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
