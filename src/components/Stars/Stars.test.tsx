import Stars from './Stars'
import { render } from '@testing-library/react'

describe('Test stars component', () => {
  test('Should render 5 stars', () => {
    const { container } = render(<Stars rating={50} />)

    const svgs = container.querySelectorAll('svg')

    expect(svgs.length).toBe(5)
  })

  test('All starts should be red', () => {
    const { container } = render(<Stars rating={100} />)

    const svgs = container.querySelectorAll('span')

    for (let item of Array.from(svgs)) {
      expect(item.classList.contains('text-red')).toBe(true)
      expect(item.classList.contains('text-dark')).toBe(false)
    }
  })

  test('All starts should be dark', () => {
    const { container } = render(<Stars rating={0} />)

    const svgs = container.querySelectorAll('span')

    for (let item of Array.from(svgs)) {
      expect(item.classList.contains('text-red')).toBe(false)
      expect(item.classList.contains('text-dark')).toBe(true)
    }
  })

  test('3 last starts should be red', () => {
    const { container } = render(<Stars rating={60} />)

    const svgs = container.querySelectorAll('span')

    for (let i = 0; i < svgs.length; i++) {
      if (i > 2) {
        expect(svgs[i].classList.contains('text-dark')).toBe(true)
        expect(svgs[i].classList.contains('text-red')).toBe(false)
      } else {
        expect(svgs[i].classList.contains('text-dark')).toBe(false)
        expect(svgs[i].classList.contains('text-red')).toBe(true)
      }
    }
  })
})
