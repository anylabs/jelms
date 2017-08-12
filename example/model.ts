export type Model = {
  readonly name: string
  readonly profile: Profile | null
}

export type Profile = {
  readonly id: string
  readonly name: string
}
