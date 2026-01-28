import type { Meta, StoryObj } from "@storybook/react-vite";
import { InkBrushPage } from "@/components";
import { getStorybookDecorators } from "@/utils";

const meta: Meta<typeof InkBrushPage> = {
  title: "InkBrushPage",
  component: InkBrushPage,
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
