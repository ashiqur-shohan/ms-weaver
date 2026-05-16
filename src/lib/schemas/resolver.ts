/**
 * Typed zodResolver wrapper compatible with Zod v4.x + @hookform/resolvers v5.x.
 *
 * The @hookform/resolvers type signature checks `_zod.version.minor === 0`
 * but Zod 4.4.x has minor === 4. This wrapper casts the schema to bypass
 * the compile-time version check — the resolver works correctly at runtime.
 * Remove once @hookform/resolvers ships updated types for Zod ≥4.1.
 */

import { zodResolver as _zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function zodResolver<T extends FieldValues>(schema: ZodType<any>): Resolver<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return _zodResolver(schema as any) as Resolver<T>;
}
