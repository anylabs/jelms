# Jelms

Elm inspired state management for [TypeScript](https://www.typescriptlang.org) apps. Tiny size (**223 bytes** minified and gzipped) makes it a perfect partner with [Preact](https://preactjs.com/).

## Examples

You can some some examples under the [Jelms Examples](https://github.com/hfjallemark/jelms-examples) repo. Here is the canonical counter app:

```typescript
import * as React from "react"
import { render } from "react-dom"
import { program } from "jelms"

type Model = {
  readonly counter: number
}

type Decrement = {
  type: "Decrement"
}

type Increment = {
  type: "Increment"
}

type Msg = Decrement | Increment

program<Model, Msg>({
  init() {
    return { counter: 0 }
  },

  update(model, msg) {
    switch (msg.type) {
      case "Decrement":
        return { ...model, counter: model.counter - 1 }

      case "Increment":
        return { ...model, counter: model.counter + 1 }
    }
  },

  view(model, emit) {
    render(
      <div>
        <h1>{model.counter}</h1>
        <button onClick={() => emit({ type: "Decrement" })}>-</button>
        <button onClick={() => emit({ type: "Increment" })}>+</button>
      </div>,
      document.getElementById("app"),
    )
  },
})
```
