import { BottleType, InkConfig } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { BottleResponse } from "@/types";

export function useGetBottle({ config }: { config: InkConfig }) {
  return useMutation<BottleType | null>({
    mutationFn: async (): Promise<BottleType | null> => {
      try {
        const url = `${config.backendUrl}${config?.getConfig?.endpoint || ""}`;

        const response = await fetch(url, {
          method: "GET",
        });

        const parsedResponse = await response.json();

        if (!parsedResponse) return null;

        const bottles = config?.getConfig?.responsePathToBottle?.reduce(
          (acc, curr) => (acc as any)?.[curr] || acc,
          parsedResponse,
        ) as BottleResponse[];

        if (!bottles || bottles.length === 0) return null;

        const bottle = bottles?.reduce((acc, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {} as BottleType);

        return bottle;
      } catch (error) {
        console.error(error as string);
        return null;
      }
    },
  });
}
