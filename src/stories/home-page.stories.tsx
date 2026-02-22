import type { Meta, StoryObj } from "@storybook/react-vite";
import { HomePage } from "@/components";
import { getStorybookDecorators } from "@/utils";

const meta: Meta<typeof HomePage> = {
  title: "HomePage",
  component: HomePage,
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
  render: () => <HomePage />,
};
