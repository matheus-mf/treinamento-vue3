export interface INavigation {
  next(): void
  back(): void
  setErrorState(): void
  setSuccessState(): void
}
