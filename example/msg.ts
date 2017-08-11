import { Profile } from "./model"

interface HashUpdated {
  type: "HashUpdated"
  hash: string
}

interface LoadProfile {
  type: "LoadProfile"
}

interface NameUpdated {
  type: "NameUpdated"
  name: string
}

interface ProfileLoaded {
  type: "ProfileLoaded"
  profile: Profile
}

export type Msg = HashUpdated | LoadProfile | NameUpdated | ProfileLoaded
