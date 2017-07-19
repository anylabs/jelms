import { render } from "preact";
import { loadProfile } from "./api";
import View from "./view";
import jelms from "jelms";

let root = null;

jelms({
  init() {
    return [{ name: "hfjallemark" }, "userLoadedProfile"];
  },

  update({ model, msg, payload }) {
    switch (msg) {
      case "profileLoaded":
        return [{ ...model, profile: payload }];

      case "userLoadedProfile":
        return [model, ["profileLoaded", loadProfile(model.name)]];

      case "userUpdatedName":
        return [{ ...model, name: payload }];
    }
  },

  view({ cmd, model }) {
    root = render(<View {...model} cmd={cmd} />, document.body, root);
  }
});
