interface Config<Model, Msg> {
  init(): Model | [Model, Promise<Msg>]
  subscriptions(emit: (msg: Msg) => void): void
  update(model: Model, msg: Msg): Model | [Model, Promise<Msg>]
  view(model: Model, emit: (msg: Msg) => void): void
}

export function program<Model, Msg>(config: Config<Model, Msg>) {
  const { init, subscriptions, update, view } = config
  let model: Model

  performUpdate(init())
  subscriptions(emit)

  function emit(msg: Msg) {
    performUpdate(update(model, msg))
  }

  function performUpdate(update: Model | [Model, Promise<Msg>]) {
    if (Array.isArray(update)) {
      model = update[0]
      update[1].then(msg => emit(msg))
    } else {
      model = update
    }

    view(model, emit)
  }
}
