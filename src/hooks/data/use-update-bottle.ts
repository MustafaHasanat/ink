import { BottleType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInkContext } from "@/hooks";

export function useUpdateBottle() {
  const queryClient = useQueryClient();
  const { objectData, oldObjectData, appConfig } = useInkContext();

  return useMutation<{
    success: boolean;
    errors?: string[];
  }>({
    mutationFn: async (): Promise<{
      success: boolean;
      errors?: string[];
    }> => {
      try {
        const errors: string[] = [];

        if (
          !appConfig?.updateConfig?.requestFormDataKey ||
          !objectData ||
          !oldObjectData
        )
          return { success: false, errors: ["Invalid data"] };

        const baseUrl = appConfig?.backendUrl || "";
        const updateUrl = `${baseUrl}${appConfig?.updateConfig?.endpoint || ""}`;
        const createUrl = `${baseUrl}${appConfig?.createConfig?.endpoint || ""}`;
        const deleteUrl = `${baseUrl}${appConfig?.deleteConfig?.endpoint || ""}`;

        await Promise.all(
          Array.from(
            new Set([
              ...Object.keys(objectData),
              ...Object.keys(oldObjectData),
            ]),
          ).map(async (key) => {
            const body = new FormData();

            const bottle: BottleType = objectData?.[key] || {};
            const oldBottle: BottleType = oldObjectData?.[key] || {};

            const isDuplicated = key in objectData && key in oldObjectData;
            const isDeleted = key in oldObjectData && !(key in objectData);
            const isAdded = !(key in oldObjectData) && key in objectData;
            const isUpdated =
              isDuplicated &&
              JSON.stringify(bottle) !== JSON.stringify(oldBottle);

            if (isDuplicated && !isUpdated) return null;

            // if the key is added or updated, we need to append the key to the url
            if (isAdded || isUpdated) {
              body.append(
                appConfig?.updateConfig?.requestFormDataKey,
                JSON.stringify(bottle),
              );
            }

            if (isAdded)
              body.append(appConfig?.createConfig?.requestFormDataKey, key);

            let url = baseUrl;

            if (isAdded) url = createUrl;
            else if (isDeleted) url = deleteUrl;
            else if (isUpdated) url = updateUrl;

            let method = "PATCH";

            if (isAdded) method = "POST";
            else if (isDeleted) method = "DELETE";
            else if (isUpdated)
              method = appConfig?.updateConfig?.preferredMethod || "PATCH";

            const refinedUrl = `${url}?bodyShape=${appConfig?.updateConfig?.bodyShape || "formData"}`;

            const response = await fetch(
              refinedUrl?.replace(
                appConfig?.updateConfig?.endpointIdentifierKey || "",
                key,
              ),
              {
                method,
                body: isDeleted ? undefined : body,
              },
            );

            if (!response?.ok) {
              const data = await response.json();
              console.error(data);
              errors.push(data?.message || "Error updating bottle");
            }
          }),
        );

        if (errors?.length > 0) {
          return { success: false, errors };
        } else {
          setTimeout(async () => {
            await queryClient.invalidateQueries({ queryKey: ["bottle"] });
          }, 500);

          return { success: true };
        }
      } catch (error) {
        console.error(error as string);
        return { success: false, errors: ["Unknown error occurred"] };
      }
    },
  });
}
