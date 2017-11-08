export type Config<Model, Msg> = {
  init(): UpdateResult<Model, Msg>
  subscriptions?(emit: (msg: Msg) => void): void
  update(model: Model, msg: Msg): UpdateResult<Model, Msg>
  view(model: Model, emit: (msg: Msg) => void): void
}

export type UpdateResult<Model, Msg> = Model | [Model, Promise<Msg>]

let model: any = null

export function program<Model, Msg>(config: Config<Model, Msg>) {
  const { init, subscriptions, update, view } = config

  if (model === null) {
    handleUpdate(init())
    subscriptions && subscriptions(emit)
  } else {
    handleUpdate(model)
  }

  function emit(msg: Msg) {
    handleUpdate(update(model, msg))
  }

  function handleUpdate(result: UpdateResult<Model, Msg>) {
    if (Array.isArray(result)) {
      model = result[0]
      result[1].then(msg => emit(msg))
    } else {
      model = result
    }

    view(model, emit)
  }
}
