export function NodeInputField({ currentValue }: { currentValue: string }) {
  return (
    <input
      type="text"
      className="border p-1 text-sm rounded-md"
      value={currentValue}
      readOnly
      disabled
    />
  );
}
