import { useInkContext } from "@/hooks";

export function LangLabel({
  identifier,
  fieldPath,
}: {
  identifier: string | null;
  fieldPath: string;
}) {
  const { locales } = useInkContext();

  if (identifier && !locales.includes(identifier.toLowerCase()))
    throw new Error(
      `The leaf "${identifier}" at path "${fieldPath}" is not a valid locale. Either add it to the locales array in the config, or remove it from the tree.`,
    );

  return (
    <label className="font-bold w-6">
      {identifier?.charAt(0)?.toUpperCase()}
      {identifier?.slice(1)}
    </label>
  );
}
