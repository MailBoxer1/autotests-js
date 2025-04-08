import { render, fireEvent } from '@testing-library/vue'
import Counter from './Counter.vue'
import { describe, it, expect } from 'vitest'

describe('Counter.vue', () => {
  it('увеличивает счетчик при клике', async () => {
    const { getByRole } = render(Counter)
    const button = getByRole('button')

    expect(button.textContent).toBe('count is 0')

    await fireEvent.click(button)
    expect(button.textContent).toBe('count is 1')

    await fireEvent.click(button)
    expect(button.textContent).toBe('count is 2')
  })
})
