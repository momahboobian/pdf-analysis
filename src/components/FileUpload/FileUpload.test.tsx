import { render, screen } from '@testing-library/react'
import FileUpload from './FileUpload'

test('renders the component', () => {
  render(<FileUpload />)
  const linkElement = screen.getByText(/FileUpload/i)
  expect(linkElement).toBeInTheDocument()
})
