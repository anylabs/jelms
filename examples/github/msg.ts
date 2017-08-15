import { Profile } from "./model"

export type HashUpdated = {
  type: "HashUpdated"
  hash: string
}

export type LoadProfile = {
  type: "LoadProfile"
}

export type NameUpdated = {
  type: "NameUpdated"
  name: string
}

export type ProfileLoaded = {
  type: "ProfileLoaded"
  profile: Profile
}

export type Msg = HashUpdated | LoadProfile | NameUpdated | ProfileLoaded
