export type Token = {
  name: string;
  symbol: string;
  contract: `0x${string}`;
};

export type TokenWithBalance = Token & {
  balance: string;
};

export const TokenList: Token[] = [
  {
    name: 'stETH',
    symbol: 'stETH',
    contract: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
  },
  {
    name: 'rETH',
    symbol: 'rETH',
    contract: '0xae78736Cd615f374D3085123A210448E74Fc6393',
  },
  {
    name: 'cbETH',
    symbol: 'cbETH',
    contract: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
  },
  {
    name: 'wbETH',
    symbol: 'wbETH',
    contract: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  {
    name: 'USDT',
    symbol: 'USDT',
    contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    contract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    contract: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
];
