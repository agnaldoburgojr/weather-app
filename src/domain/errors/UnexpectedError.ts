export class UnexpectedError extends Error {
  constructor (readonly name: string) {
    super('Algo de errado aconteceu. Tente novamente em breve')
    this.name = `[${name}]:UnexpectedError`
  }
}
