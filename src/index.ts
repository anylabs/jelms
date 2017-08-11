interface Jelms<Model, Msg> {
  init(): Model | [Model, Command<Msg>]
  update(model: Model, msg: Msg): Model | [Model, Command<Msg>]
  view(model: Model, handleMsg: (msg: Msg) => void): void
}

type Command<Msg> = Promise<Msg> | Msg

export function program<Model, Msg>({ init, update, view }: Jelms<Model, Msg>) {
  let model: Model

  handleUpdate(init())

  function handleMsg(msg: Msg) {
    handleUpdate(update(model, msg))
  }

  function handleUpdate(update: Model | [Model, Command<Msg>]) {
    let updatedModel: Model
    let command: Command<Msg> | null = null

    if (Array.isArray(update)) {
      updatedModel = update[0]
      command = update[1]
    } else {
      updatedModel = update
    }

    model = updatedModel
    view(model, handleMsg)

    if (command) {
      const promise = command as Promise<Msg>

      if (promise.then) {
        promise.then(payload => handleMsg(payload))
      } else {
        handleMsg(command as Msg)
      }
    }
  }
}
