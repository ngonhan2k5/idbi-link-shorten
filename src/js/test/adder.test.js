import adder1 from '../adder'
describe('Adder', () => {
  test('adds two numbers', () => {
    expect(adder1(5, 3)).toEqual(8)
  })
})