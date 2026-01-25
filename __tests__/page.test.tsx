import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { ThemeProvider } from '@/components/theme-provider'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
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

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Home Page', () => {
  it('renders the main title', () => {
    renderWithTheme(<Home />)

    const heading = screen.getByRole('heading', { level: 1, name: "Paul's Next.js Bootstrap" })
    expect(heading).toBeInTheDocument()
  })

  it('renders the page description', () => {
    renderWithTheme(<Home />)

    expect(screen.getByText(/Bootstrapped with Paul's preferred Next\.js configuration/i)).toBeInTheDocument()
  })
})
