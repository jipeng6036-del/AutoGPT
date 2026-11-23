import { fireEvent, render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";
import { isFilled } from "../../RunAgentModal/useAgentRunModal";
import { RunAgentInputs } from "../RunAgentInputs";

describe("RunAgentInputs date", () => {
  const schema = {
    type: "string",
    format: "date",
    title: "Start date",
  } as const;

  it("emits the selected calendar date as a filled, JSON-safe input", () => {
    const onChange = vi.fn();
    render(<RunAgentInputs schema={schema} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText("Start date"), {
      target: { value: "2026-03-15" },
    });

    expect(onChange).toHaveBeenCalledWith("2026-03-15");
    const selected = onChange.mock.calls[0][0];
    expect(isFilled(selected)).toBe(true);
    expect(JSON.stringify({ date: selected })).toBe('{"date":"2026-03-15"}');
  });

  it("displays stored calendar dates and clears them with undefined", () => {
    const onChange = vi.fn();
    render(
      <RunAgentInputs schema={schema} value="2026-03-15" onChange={onChange} />,
    );
    const input = screen.getByLabelText<HTMLInputElement>("Start date");
    expect(input.value).toBe("2026-03-15");

    fireEvent.change(input, { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });
});
