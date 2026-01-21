import axios from "axios";
import { BottleType, InkConfig, ItemResponse } from "@/types";
import { join } from "path";

interface Props {
  config: InkConfig;
}

export async function getBottleData({
  config,
}: Props): Promise<BottleType | null> {
  try {
    const response = await axios.request<ItemResponse<any>>({
      method: "get",
      maxBodyLength: Infinity,
      url: join(config.backendUrl, config?.getConfig?.endpoint),
      ...(config?.getConfig?.axiosConfig || {}),
    });

    if (response?.status !== 200) return null;

    const data = config?.getConfig?.responsePathToBottle?.reduce(
      (acc, curr) => (acc as any)?.[curr] || acc,
      response?.data,
    ) as any;

    if (!data) return null;

    return typeof data === "string"
      ? JSON.parse(`${data}`)
      : typeof data === "object"
        ? data
        : null;
  } catch (error) {
    console.error(error as string);
    return null;
  }
}
