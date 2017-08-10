import { h, render } from "preact";
import { Model } from "./model";
import { Msg } from "./msg";
import { program } from "../src";
import View from "./view";

let root: Element;

program<Model, Msg>({
  init() {
    return [
      { name: "hfjallemark", profile: null },
      { type: "UserLoadedProfile" }
    ];
  },

  update(model, msg) {
    switch (msg.type) {
      case "ProfileLoaded":
        return { ...model, profile: msg.profile };

      case "UserUpdatedName":
        return { ...model, name: msg.name };

      case "UserLoadedProfile":
        return [{ ...model }, loadProfile(model.name)];

      default:
        return model;
    }
  },

  view(model, msg) {
    root = render(
      <View msg={msg} name={model.name} profile={model.profile} />,
      document.body,
      root
    );
  }
});

async function loadProfile(name: string): Promise<Msg> {
  const response = await fetch("https://api.github.com/users/" + name);
  const profile = await response.json();

  return { type: "ProfileLoaded", profile };
}
