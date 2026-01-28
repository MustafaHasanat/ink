import { InkProvider } from "@/providers";
import { defaultInkComponents, defaultInkConfig } from "@/constants";
import { InkConfig, InkProviderComponents } from "@/types";

export const getStorybookDecorators = ({
  config = defaultInkConfig,
  components = defaultInkComponents,
}: {
  config?: InkConfig;
  components?: InkProviderComponents;
}) => [
  (Story: any) => (
    <InkProvider config={config} components={components}>
      <Story />
    </InkProvider>
  ),
];
