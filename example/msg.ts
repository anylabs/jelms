import { Profile } from "./model"

type HashUpdated = {
  type: "HashUpdated"
  hash: string
}

type LoadProfile = {
  type: "LoadProfile"
}

type NameUpdated = {
  type: "NameUpdated"
  name: string
}

type ProfileLoaded = {
  type: "ProfileLoaded"
  profile: Profile
}

export type Msg = HashUpdated | LoadProfile | NameUpdated | ProfileLoaded
