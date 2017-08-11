export interface Model {
  readonly name: string
  readonly profile: Profile | null
}

export interface Profile {
  readonly id: string
  readonly name: string
}
