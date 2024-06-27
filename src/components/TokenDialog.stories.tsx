import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { TokenDialog } from './TokenDialog';
import { TokenFixtures } from './TokenLogo.stories';
export default {
  title: 'TokenDialog',
  component: TokenDialog,
  args: {
    isOpen: true,
    tokenList: TokenFixtures,
    onClose: fn(),
    onValidate: fn(),
  },
} as Meta<typeof TokenDialog>;

const Template: StoryFn<typeof TokenDialog> = (args) => <TokenDialog {...args} />;

export const Default = Template.bind({});
