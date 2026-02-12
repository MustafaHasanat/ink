import { LocaleNode } from "@/types";

type CollectEditorErrorsParams = {
  node: LocaleNode | null;
  locales: string[];
};

/**
 * collectEditorErrors
 *
 * Traverses the bottle tree and collects validation errors related to locales:
 * - Leaves that have an identifier which is not part of the configured locales.
 * - Locale containers that do not have the expected number of locale keys.
 */
export function collectEditorErrors({
  node,
  locales,
}: CollectEditorErrorsParams): string[] {
  if (!node) return [];

  const errors: string[] = [];

  const traverse = (currentNode: LocaleNode, path: string[]): void => {
    if (typeof currentNode === "string") {
      const identifier = path[path.length - 1];

      if (identifier && !locales.includes(identifier.toLowerCase())) {
        const fieldPath = path.join(".");

        errors.push(
          `The leaf "${identifier}" at path "${fieldPath}" is not a valid locale. Either add it to the locales array in the config, or remove it from the tree.`,
        );
      }

      return;
    }

    if (typeof currentNode !== "object" || currentNode === null) {
      return;
    }

    const entries = Object.entries(currentNode);

    if (entries.length === 0) {
      return;
    }

    const nodeKeys = entries.map(([key]) => key);
    const localeKeysCount = nodeKeys.filter((key) =>
      locales.includes(key.toLowerCase()),
    ).length;

    const isLocaleContainer = localeKeysCount > 0;
    const isFullLocales =
      isLocaleContainer && localeKeysCount === locales.length;

    if (isLocaleContainer && !isFullLocales) {
      const leafIdentifier = path[path.length - 1] ?? "root";
      const currentPath = path.join(".");

      errors.push(
        `The leaf "${leafIdentifier}" at path "${currentPath}" has a wrong number of locales. Expected ${locales.length} but got ${localeKeysCount}.`,
      );
    }

    entries.forEach(([identifier, subNode]) => {
      traverse(subNode as LocaleNode, [...path, identifier]);
    });
  };

  traverse(node, []);

  return errors;
}
