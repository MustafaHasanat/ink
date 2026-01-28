import { BottleType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInkContext } from "../use-ink-context";

export function useUpdateBottle() {
  const queryClient = useQueryClient();
  const { objectData, oldObjectData, appConfig } = useInkContext();

  return useMutation<BottleType | null>({
    mutationFn: async (): Promise<BottleType | null> => {
      try {
        if (!appConfig?.updateConfig?.requestFormDataKey || !objectData)
          return null;

        const formData = new FormData();

        formData.append(
          appConfig?.updateConfig?.requestFormDataKey,
          JSON.stringify(objectData),
        );

        const url =
          `${appConfig?.backendUrl || ""}${appConfig?.getConfig?.endpoint || ""}`?.replace(
            appConfig?.updateConfig?.endpointIdentifierKey,
            objectData?.[appConfig?.updateConfig?.endpointIdentifierKey],
          );

        console.log("objectData: ", objectData);
        console.log("oldObjectData: ", oldObjectData);

        return null;

        const response = await fetch(url, {
          method: appConfig?.updateConfig?.preferredMethod || "PATCH",
          body: formData,
        });

        const parsedResponse = await response.json();

        if (parsedResponse) {
          setTimeout(async () => {
            await queryClient.invalidateQueries({ queryKey: ["bottle"] });
          }, 500);
        }
      } catch (error) {
        console.error(error as string);
        return null;
      }
    },
  });
}
