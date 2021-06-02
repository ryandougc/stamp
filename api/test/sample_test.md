import Calculator from '../../../src/mixins/calculator.class'

describe('Calculator', () => {
    it('should return current running total of 0', () => {
        const c1: Calculator = new Calculator()

        expect(c1.total).toEqual(0)
    })
})