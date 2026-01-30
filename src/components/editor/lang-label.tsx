export function LangLabel({
  identifier,
}: {
  identifier: string | null;
  fieldPath: string;
}) {
  return (
    <label className="font-bold w-fit">
      {identifier?.charAt(0)?.toUpperCase()}
      {identifier?.slice(1)}
    </label>
  );
}
