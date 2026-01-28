import { clsx, type ClassValue } from "clsx";

/**
 * Utility function to merge classes
 *
 * @param classes - The classes to merge
 * @returns The merged classes
 */
export const cn = (...classes: ClassValue[]) => clsx(classes);
