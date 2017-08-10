import { h } from "preact";
import { Msg } from "./msg";

interface Props {
  msg: (msg: Msg) => void;
  name: string;
  profile: any;
}

export default ({ msg, name, profile }: Props) =>
  <div>
    <h1>
      {profile ? `${profile.name} (${profile.location})` : "Enter username"}
    </h1>
    <input
      onBlur={() => msg({ type: "UserLoadedProfile" })}
      onInput={(e: any) =>
        msg({ type: "UserUpdatedName", name: e.target.value })}
      value={name}
    />
  </div>;
