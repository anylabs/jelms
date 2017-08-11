import { h } from 'preact'
import { Msg } from './msg'
import { Profile } from './model'

interface Props {
  msg: (msg: Msg) => void
  name: string
  profile: Profile | null
}

export default ({ msg, name, profile }: Props) =>
  <div>
    <h1>
      {profile ? `${profile.name} (${profile.id})` : 'Enter username'}
    </h1>
    <input
      onBlur={() => msg({ type: 'LoadProfile' })}
      onInput={(e: any) => msg({ type: 'NameUpdated', name: e.target.value })}
      value={name}
    />
  </div>
