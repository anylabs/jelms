export default ({ cmd, name, profile }) =>
  <div>
    <h1>
      {profile ? `${profile.name} (${profile.location})` : "Enter username"}
    </h1>
    <input
      onBlur={() => cmd("userLoadedProfile")}
      onInput={e => cmd("userUpdatedName", e.target.value)}
      value={name}
    />
  </div>;
