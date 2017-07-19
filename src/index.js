export default function({ init, update, view }) {
  let model = null;

  model = handleUpdate(init());

  function cmd(msg, payload) {
    const result = update({ cmd, model, msg, payload });

    if (!result) {
      throw Error(`Msg '${msg}' not handled`);
    }

    model = handleUpdate(result);
  }

  function handleCommand(command) {
    requestAnimationFrame(() => {
      if (Array.isArray(command)) {
        const [msg, promise] = command;
        promise.then(payload => cmd(msg, payload));
      } else {
        cmd(command);
      }
    });
  }

  function handleModelUpdate(updatedModel) {
    if (process.env.NODE_ENV != "production") {
      require("./utils").deepFreeze(updatedModel);
    }

    model = updatedModel;
    view({ cmd, model });
  }

  function handleUpdate(update) {
    const [updatedModel, command] = update;

    command && handleCommand(command);
    updatedModel && handleModelUpdate(updatedModel);

    return updatedModel;
  }
}
