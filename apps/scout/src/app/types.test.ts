import { describe, expect, it } from "vitest";

import {
  isEventInput,
  isEventsInput,
  isMessageInput,
  isMessagesInput,
  isTranscriptInput,
  NullableScannerInput,
} from "./types";

const nullInput = (
  input_type: NullableScannerInput["input_type"]
): NullableScannerInput => ({ input_type, input: null });

describe("input type guards with null payloads", () => {
  it.each([
    ["transcript", isTranscriptInput],
    ["message", isMessageInput],
    ["messages", isMessagesInput],
    ["event", isEventInput],
    ["events", isEventsInput],
  ] as const)("is%sInput returns false for null payload", (type, guard) => {
    expect(guard(nullInput(type))).toBe(false);
  });
});
