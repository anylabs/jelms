import * as React from "react"
import { render } from "react-dom"
import { Model } from "./model"
import { Msg } from "./msg"
import { program } from "../../"
import View from "./view"

program<Model, Msg>({
  init() {
    return [{ name: "hfjallemark", profile: null }, loadProfile("hfjallemark")]
  },

  subscriptions(emit) {
    window.addEventListener("hashchange", e => {
      emit({ type: "HashUpdated", hash: location.hash.substring(1) })
    })
  },

  update(model, msg) {
    switch (msg.type) {
      case "HashUpdated":
        return [{ ...model, name: msg.hash }, loadProfile(msg.hash)]

      case "LoadProfile":
        return [{ ...model }, loadProfile(model.name)]

      case "NameUpdated":
        return { ...model, name: msg.name }

      case "ProfileLoaded":
        return { ...model, profile: msg.profile }
    }
  },

  view(model, emit) {
    render(
      <View emit={emit} name={model.name} profile={model.profile} />,
      document.getElementById("app"),
    )
  },
})

async function loadProfile(name: string): Promise<Msg> {
  const response = await fetch("https://api.github.com/users/" + name)
  const profile = await response.json()

  return { type: "ProfileLoaded", profile }
}
