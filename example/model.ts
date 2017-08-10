export interface Model {
  readonly name: string;
  readonly profile: Profile | null;
}

export interface Profile {
  readonly name: string;
  readonly location: string;
}
