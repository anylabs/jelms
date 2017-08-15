import * as React from "react"
import { Msg } from "./msg"
import { Profile } from "./model"

type Props = {
  emit: (msg: Msg) => void
  name: string
  profile?: Profile
}

export default ({ emit, name, profile }: Props) =>
  <div>
    <h1>
      {profile ? `${profile.name} (${profile.id})` : "Enter username"}
    </h1>
    <input
      onChange={e => emit({ type: "NameUpdated", name: e.target.value })}
      value={name}
    />
    <button onClick={() => emit({ type: "LoadProfile" })}>Load!</button>
  </div>
