import { Profile } from './model'

interface LoadProfile {
  type: 'LoadProfile'
}

interface NameUpdated {
  type: 'NameUpdated'
  name: string
}

interface ProfileLoaded {
  type: 'ProfileLoaded'
  profile: Profile
}

export type Msg = LoadProfile | NameUpdated | ProfileLoaded
