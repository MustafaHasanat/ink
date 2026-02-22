import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginPage } from "@/components";
import { getStorybookDecorators } from "@/utils";

const meta: Meta<typeof LoginPage> = {
  title: "LoginPage",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: getStorybookDecorators({}),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
