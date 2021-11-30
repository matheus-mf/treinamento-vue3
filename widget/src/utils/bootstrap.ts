interface ISetup {
  onProduction(): void
  onDevelopment(): void
}

export function setup ({ onProduction, onDevelopment }:ISetup): void {
  if (process.env.NODE_ENV !== 'production') {
    onDevelopment()
    return
  }

  onProduction()
}
