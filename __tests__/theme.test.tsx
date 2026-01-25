import { render, screen, fireEvent, waitFor, cleanup, act } from "@testing-library/react"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/ui/theme-toggle"

// Create a storage object that we can manipulate
const createLocalStorageMock = () => {
  const store: Record<string, string> = {}
  return {
    store,
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key])
    }),
  }
}

let localStorageMock = createLocalStorageMock()
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
  configurable: true
})

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Reset mocks before each test
beforeEach(() => {
  // Create fresh localStorage mock for each test
  localStorageMock = createLocalStorageMock()
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
    configurable: true
  })
  // Clear document classes
  document.documentElement.classList.remove("dark")
})

// Clean up after each test
afterEach(() => {
  cleanup()
})

// Helper component to test the useTheme hook
function ThemeConsumer() {
  const { theme, toggleTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle
      </button>
      <button data-testid="set-light" onClick={() => setTheme("light")}>
        Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme("dark")}>
        Dark
      </button>
    </div>
  )
}

describe("ThemeProvider", () => {

  it("provides default light theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light")
  })

  it("toggles theme from light to dark", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId("toggle-button")

    await act(async () => {
      fireEvent.click(toggleButton)
    })

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")
  })

  it("toggles theme from dark to light", async () => {
    localStorageMock.store.theme = "dark"

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for mount effect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    const toggleButton = screen.getByTestId("toggle-button")
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("light")
    })
  })

  it("sets theme using setTheme function", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    const setDarkButton = screen.getByTestId("set-dark")

    await act(async () => {
      fireEvent.click(setDarkButton)
    })

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")

    const setLightButton = screen.getByTestId("set-light")

    await act(async () => {
      fireEvent.click(setLightButton)
    })

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light")
  })

  it("persists theme to localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    const toggleButton = screen.getByTestId("toggle-button")

    await act(async () => {
      fireEvent.click(toggleButton)
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark")
  })

  it("reads theme from localStorage on mount", async () => {
    localStorageMock.store.theme = "dark"

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for the useEffect to run
    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")
    })
  })

  it("adds dark class to document when theme is dark", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for initial mount and effects to complete
    await waitFor(() => {
      // Verify mounted state is complete
      expect(screen.getByTestId("current-theme")).toHaveTextContent("light")
    })

    const toggleButton = screen.getByTestId("toggle-button")
    fireEvent.click(toggleButton)

    // Wait for theme state to update
    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")
    })

    // Wait for the effect to add the dark class
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true)
    })
  })

  it("removes dark class from document when theme is light", async () => {
    document.documentElement.classList.add("dark")
    localStorageMock.store.theme = "dark"

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for mount and dark theme to be applied
    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")
    })

    const toggleButton = screen.getByTestId("toggle-button")
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(false)
    })
  })
})

describe("useTheme hook", () => {
  it("throws error when used outside ThemeProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    expect(() => {
      render(<ThemeConsumer />)
    }).toThrow("useTheme must be used within a ThemeProvider")

    consoleSpy.mockRestore()
  })
})

describe("ThemeToggle", () => {

  it("renders theme toggle switch", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("has accessible label", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    expect(screen.getByLabelText("Toggle dark mode")).toBeInTheDocument()
  })

  it("toggles theme when clicked", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for initial mount
    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("light")
    })

    const toggle = screen.getByRole("switch")
    fireEvent.click(toggle)

    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")
    })
  })

  it("shows unchecked state for light mode", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for initial mount
    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("light")
    })

    const toggle = screen.getByRole("switch")
    expect(toggle).not.toBeChecked()
  })

  it("shows checked state for dark mode", async () => {
    localStorageMock.store.theme = "dark"

    render(
      <ThemeProvider>
        <ThemeToggle />
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Wait for mount effect and dark theme to be set
    await waitFor(() => {
      expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")
    })

    const toggle = screen.getByRole("switch")
    expect(toggle).toBeChecked()
  })

  it("displays sun and moon icons", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    expect(screen.getByText("☀️")).toBeInTheDocument()
    expect(screen.getByText("🌙")).toBeInTheDocument()
  })
})
