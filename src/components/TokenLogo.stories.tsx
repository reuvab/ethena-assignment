import { Meta, StoryFn } from '@storybook/react';
import { TokenLogo } from './TokenLogo';
import { TokenList } from './types';

export const TokenFixtures = TokenList.map((token) => ({
  ...token,
  balance: '100',
}));

export default {
  title: 'TokenLogo',
  component: TokenLogo,
  args: {
    symbol: 'USDC',
  },
} as Meta<typeof TokenLogo>;

const Template: StoryFn<typeof TokenLogo> = (args) => <TokenLogo {...args} />;

export const Default = Template.bind({});
