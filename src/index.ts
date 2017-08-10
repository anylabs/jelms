interface Jelms<Model, Msg> {
  init(): Model | [Model, Command<Msg>];
  update(model: Model, msg: Msg): Model | [Model, Command<Msg>];
  view(model: Model, handleMsg: (msg: Msg) => void): void;
}

type Command<T> = Promise<T> | T;

export default function<Model, Msg>({ init, update, view }: Jelms<Model, Msg>) {
  let model: Model;

  handleUpdate(init());

  function handleMsg(msg: Msg) {
    const result = update(model, msg);

    if (!result) {
      throw Error(`Msg '${msg}' not handled`);
    }

    handleUpdate(result);
  }

  function handleUpdate(update: Model | [Model, Command<Msg>]) {
    let updatedModel: Model;
    let command: Command<Msg> | null = null;

    if (Array.isArray(update)) {
      [updatedModel, command] = update;
    } else {
      updatedModel = update;
    }

    model = updatedModel;
    view(model, handleMsg);

    if (command) {
      const promise = command as Promise<Msg>;

      if (promise.then) {
        promise.then(payload => handleMsg(payload));
      } else {
        handleMsg(<Msg>command);
      }
    }
  }
}
