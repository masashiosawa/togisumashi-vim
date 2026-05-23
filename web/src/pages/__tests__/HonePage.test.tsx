import { render, screen, fireEvent, act, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { DrillDef } from "../../types/drill";
import { HonePage } from "../HonePage";

// After babel-plugin-lingui-macro transforms <Trans>, the runtime Trans from @lingui/react
// receives id/message props instead of children. Mock handles both cases.
vi.mock("@lingui/react", () => ({
  useLingui: () => ({ i18n: { locale: "en" } }),
  Trans: ({
    children,
    message,
    id,
  }: {
    children?: React.ReactNode;
    message?: string;
    id?: string;
  }) => <>{children ?? message ?? id ?? ""}</>,
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useParams: () => ({ locale: "en" }) };
});
vi.mock("../../components/DrillRunner", () => ({
  DrillRunner: ({
    onComplete,
  }: {
    onComplete?: (a: {
      drillId: string;
      success: boolean;
      elapsedMs: number;
      targetMs: number;
      timestamp: number;
    }) => void;
  }) => (
    <div data-testid="drill-runner">
      <button
        type="button"
        onClick={() =>
          onComplete?.({
            drillId: "challenge-01",
            success: true,
            elapsedMs: 30000,
            targetMs: 45000,
            timestamp: Date.now(),
          })
        }
      >
        finish
      </button>
    </div>
  ),
}));

function makeChallenge(id: string, title: string): DrillDef {
  return {
    id,
    tier: 4,
    type: "edit",
    target_time_ms: 45000,
    template: [{ kind: "fixed", lines: ["const x = 1;"] }],
    goal: { type: "text_equals", content: "const x = 2;\n" },
    solution_keys: [],
    i18n: {
      en: { title, description: "Edit the code.", steps: ["Change 1 to 2"] },
      ja: { title, description: "コードを編集。", steps: ["1 を 2 に変更"] },
    },
  };
}

const mockDrills: DrillDef[] = [
  makeChallenge("challenge-01", "Server Config"),
  makeChallenge("challenge-02", "Python Filter"),
];

vi.mock("../../hooks/useDrills", () => ({
  useDrills: () => ({ drills: mockDrills, loading: false, error: null }),
}));

function renderHonePage() {
  return render(
    <MemoryRouter>
      <HonePage />
    </MemoryRouter>,
  );
}

function startChallenge() {
  fireEvent.click(screen.getByText("Server Config"));
  // "Start Challenge" is a <Trans> transformed to message prop by babel plugin
  const startBtn = screen.getByRole("button", { name: /start challenge/i });
  fireEvent.click(startBtn);
}

beforeEach(() => {
  localStorage.clear();
});

describe("HonePage — challenge list", () => {
  it("renders all tier 4 challenges", () => {
    renderHonePage();
    expect(screen.getByText("Server Config")).toBeInTheDocument();
    expect(screen.getByText("Python Filter")).toBeInTheDocument();
  });

  it("shows uncompleted status icons initially", () => {
    renderHonePage();
    const statusIcons = screen.getAllByText("○");
    expect(statusIcons.length).toBeGreaterThanOrEqual(2);
  });

  it("shows empty state when no challenge is selected", () => {
    renderHonePage();
    expect(screen.getByText("Select a challenge to begin.")).toBeInTheDocument();
  });
});

describe("HonePage — challenge selection", () => {
  it("shows info panel with description when a challenge is clicked", () => {
    renderHonePage();
    fireEvent.click(screen.getByText("Server Config"));
    expect(screen.getByText("Edit the code.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start challenge/i })).toBeInTheDocument();
  });

  it("shows step list in info panel", () => {
    renderHonePage();
    fireEvent.click(screen.getByText("Server Config"));
    expect(screen.getByText("Change 1 to 2")).toBeInTheDocument();
  });

  it("shows target time (45s) in info panel", () => {
    renderHonePage();
    fireEvent.click(screen.getByText("Server Config"));
    expect(screen.getByText(/45s/)).toBeInTheDocument();
  });

  it("renders DrillRunner when Start Challenge is clicked", () => {
    renderHonePage();
    startChallenge();
    expect(screen.getByTestId("drill-runner")).toBeInTheDocument();
  });
});

describe("HonePage — result phase", () => {
  it("shows elapsed time after completion", () => {
    renderHonePage();
    startChallenge();
    fireEvent.click(screen.getByText("finish"));
    const resultDiv = document.querySelector(".hone-result-time") as HTMLElement;
    expect(within(resultDiv).getByText(/30s/)).toBeInTheDocument();
  });

  it("shows honed message when elapsed is within target", () => {
    renderHonePage();
    startChallenge();
    // mock fires elapsedMs 30000 < targetMs 45000 → honed
    fireEvent.click(screen.getByText("finish"));
    expect(screen.getByText("Within target — Honed!")).toBeInTheDocument();
  });

  it("shows Retry button in done phase", () => {
    renderHonePage();
    startChallenge();
    fireEvent.click(screen.getByText("finish"));
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});

describe("HonePage — achievement tracking", () => {
  it("shows 0/2 for both Cleared and Honed initially", () => {
    renderHonePage();
    const achievement = screen.getByText("Cleared").closest(".hone-achievement-row") as HTMLElement;
    expect(within(achievement).getByText("0 / 2")).toBeInTheDocument();
  });

  it("updates cleared count to 1/2 after completing a challenge", () => {
    renderHonePage();
    startChallenge();
    act(() => {
      fireEvent.click(screen.getByText("finish"));
    });
    const achievement = screen.getByText("Cleared").closest(".hone-achievement-row") as HTMLElement;
    expect(within(achievement).getByText("1 / 2")).toBeInTheDocument();
  });
});

describe("HonePage — keyboard shortcut", () => {
  it("Space key starts challenge when in info phase", () => {
    renderHonePage();
    fireEvent.click(screen.getByText("Server Config"));
    fireEvent.keyDown(window, { key: " " });
    expect(screen.getByTestId("drill-runner")).toBeInTheDocument();
  });
});
