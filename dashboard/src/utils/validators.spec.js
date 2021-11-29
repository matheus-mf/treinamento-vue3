import { validadeEmptyAndLength3, validateEmptyAndEmail } from './validators'

describe('Validators utils', () => {
  it('should give an error empty payload', () => {
    expect(validadeEmptyAndLength3()).toBe('* Este campo é obrigatório')
  })

  it('should give an error with less the 3 character payload', () => {
    expect(validadeEmptyAndLength3('12')).toBe('* Este campo precisa de no mínimo 3 caracteres')
  })

  it('should returns true when pass a correct param', () => {
    expect(validadeEmptyAndLength3('1234')).toBe(true)
  })

  it('should give an error empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('* Este campo é obrigatório')
  })

  it('should give an error with a invalid param', () => {
    expect(validateEmptyAndEmail('myemail@')).toBe('* Este campo precisa ser um e-mail')
  })

  it('should returns true when pass a correct param', () => {
    expect(validateEmptyAndEmail('john@doe.me')).toBe(true)
  })
})
