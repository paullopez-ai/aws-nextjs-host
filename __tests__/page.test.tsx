import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the main title', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 1, name: "Paul's Next.js Bootstrap" })
    expect(heading).toBeInTheDocument()
  })

  it('renders the page description', () => {
    render(<Home />)

    expect(screen.getByText(/Bootstrapped with Paul's preferred Next\.js configuration/i)).toBeInTheDocument()
  })
})
