export default function({ init, update, view }) {
  let model = null;

  handleUpdate(init());

  function cmd(msg, payload) {
    const result = update({ cmd, model, msg, payload });

    if (!result) {
      throw Error(`Msg '${msg}' not handled`);
    }

    handleUpdate(result);
  }

  function handleCommand(command) {
    if (Array.isArray(command)) {
      const [msg, promise] = command;
      promise.then(payload => cmd(msg, payload));
    } else {
      cmd(command);
    }
  }

  function handleUpdate(update) {
    const [updatedModel, command] = update;

    if (process.env.NODE_ENV != "production") {
      require("./utils").deepFreeze(updatedModel);
    }

    model = updatedModel;
    view({ cmd, model });
    command && handleCommand(command);
  }
}
