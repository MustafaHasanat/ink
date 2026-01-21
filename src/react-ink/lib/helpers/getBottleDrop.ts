import { BottleDropType, BottleType } from "../types";

/**
 * Safely access a nested object property using a dot-delimited key string.
 *
 * @param {BottleType} bottle - The object to search in.
 * @param {string} chain - The dot-delimited string key to access the nested property.
 * @returns {{ en: string, ar: string } | null} - The nested value if found and valid, otherwise null.
 */
export const getBottleDrop = (
  bottle: BottleType,
  chain: string,
): BottleDropType | null => {
  try {
    // Split the key into parts by "."
    const keys = chain.split(".");

    // Traverse the object step-by-step
    let current = bottle;

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // If any key is not found, return null
        return null;
      }
    }

    // Ensure the final value has the expected structure
    if (
      current &&
      typeof current === "object" &&
      "en" in current &&
      "ar" in current
    ) {
      return current as BottleDropType;
    }

    // If the final value doesn't match the structure, return null
    return null;
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Error accessing nested value:", error);
    return null;
  }
};
