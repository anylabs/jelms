import { h, render } from "preact";
import View from "./view";
import jelms from "../src";
import { Msg } from "./msg";

let root: Element;

interface Model {
  readonly name: string;
  readonly profile: any;
}

jelms<Model, Msg>({
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
