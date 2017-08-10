interface UserLoadedProfile {
  type: "UserLoadedProfile";
}

interface ProfileLoaded {
  type: "ProfileLoaded";
  profile: string;
}

interface UserUpdatedName {
  type: "UserUpdatedName";
  name: string;
}

export type Msg = UserLoadedProfile | ProfileLoaded | UserUpdatedName;
