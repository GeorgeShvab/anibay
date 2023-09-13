import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Dialog from './Dialog'

class ResizeObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}

describe('Test dialog', () => {
  window.ResizeObserver = ResizeObserver

  test("Shouldn't render dialog until it opens", async () => {
    const title = 'Dialog Title'

    render(<Dialog open={false} onClose={() => {}} title={title} />)

    const element = await waitFor(() => screen.queryByText(title))

    expect(element).toBe(null)
  })

  test('Should render dialog', async () => {
    const title = 'Dialog Title'

    render(<Dialog open={true} onClose={() => {}} title={title} />)

    const element = await waitFor(() => screen.queryByText(title))

    expect(!!element).toBe(true)
  })

  test('Should close', async () => {
    const title = 'Dialog Title'
    const text = 'Deny'

    const component = render(
      <Dialog
        open={true}
        onClose={() => {
          component.rerender(<Dialog open={false} onClose={() => {}} title={title} denyText={text} />)
        }}
        title={title}
        denyText={text}
      />
    )

    const element = await waitFor(() => screen.queryByText(text))

    expect(!!element).toBe(true)

    if (!element) return

    fireEvent.click(element)

    const elementAfterClose = await waitFor(() => screen.queryByText(text))

    expect(elementAfterClose).toBe(null)
  })
})
