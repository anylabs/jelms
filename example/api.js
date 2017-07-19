export function loadProfile(name) {
  return fetch("https://api.github.com/users/" + name).then(response =>
    response.json()
  );
}
