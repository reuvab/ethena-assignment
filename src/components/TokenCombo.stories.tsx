import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { TokenCombo } from './TokenCombo';
import { TokenFixtures } from './TokenLogo.stories';

export default {
  title: 'TokenCombo',
  component: TokenCombo,
  args: {
    tokenList: TokenFixtures,
    selected: {
      name: 'USDC',
      symbol: 'USDC',
      balance: '100',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    onTokenChange: fn(),
  },
} as Meta<typeof TokenCombo>;

const Template: StoryFn<typeof TokenCombo> = (args) => <TokenCombo {...args} />;

export const Default = Template.bind({});
