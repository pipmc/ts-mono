import { describe, expect, it } from "vitest";

import { toScanResultDetail } from "./scanResultDetail";

describe("toScanResultDetail", () => {
  it("returns undefined input when payload is null", () => {
    const detail = toScanResultDetail({
      input: null,
      input_type: "transcript",
      input_data: null,
      scan_events: [],
    });
    expect(detail.input).toBeUndefined();
    expect(detail.scanEvents).toEqual([]);
  });

  it("wraps non-null input with its type", () => {
    const messages = [{ role: "user" as const, content: "hi" }];
    const detail = toScanResultDetail({
      input: messages,
      input_type: "messages",
      input_data: null,
      scan_events: [],
    });
    expect(detail.input).toEqual({ input_type: "messages", input: messages });
  });

  it("coerces null scan_events to empty array", () => {
    const detail = toScanResultDetail({
      input: null,
      input_type: "transcript",
      input_data: null,
      scan_events: null,
    });
    expect(detail.scanEvents).toEqual([]);
  });
});
