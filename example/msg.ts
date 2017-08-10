import { Profile } from "./model";

interface UserLoadedProfile {
  type: "UserLoadedProfile";
}

interface ProfileLoaded {
  type: "ProfileLoaded";
  profile: Profile;
}

interface UserUpdatedName {
  type: "UserUpdatedName";
  name: string;
}

export type Msg = UserLoadedProfile | ProfileLoaded | UserUpdatedName;
