import type { Event } from "@tsmono/inspect-common/types";

import type { ScannerInput, ScannerInputResponse } from "../types/api-types";

import type { ScanResultDetail } from "./api";
import { expandInputEvents } from "./expandInputEvents";

/**
 * Wire payload for the scanner detail endpoint. Mirrors `ScannerInputResponse`
 * but models the actual JSON shape: `input` and `scan_events` come back as
 * `null` when the scan ran with `store_input`/`store_scan_events` disabled.
 */
export type ScanResultPayload = Omit<ScannerInputResponse, "input"> & {
  input: ScannerInputResponse["input"] | null;
  scan_events: Event[] | null;
};

export const toScanResultDetail = (
  parsed: ScanResultPayload
): ScanResultDetail => {
  const scanEvents = parsed.scan_events ?? [];

  if (parsed.input == null) {
    return { input: undefined, scanEvents };
  }

  const expanded = expandInputEvents(
    parsed.input,
    parsed.input_type,
    parsed.input_data
  );
  const input: ScannerInput = {
    input_type: parsed.input_type,
    input: expanded,
  };

  return { input, scanEvents };
};
