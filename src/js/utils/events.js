import isString from 'lodash/isString'

const EventManager = new EventTarget()

export const addListener = (target, listener) => EventManager.addEventListener(target, listener)
export const removeListener = (target, listener) => EventManager.removeEventListener(target, listener)
export const emitEvent = evt => EventManager.dispatchEvent(evt)
export const createEvent = (target, params) => new CustomEvent(target, {detail: params})

export class EventSource {
  constructor (nameOrEventSource) {
    if (isString(nameOrEventSource)) {
      this.name = nameOrEventSource
      this.subscribers = {}
    } else {
      this.name = nameOrEventSource.name
      this.subscribers = nameOrEventSource.subscribers
    }
  }

  static getReadOnlyEventSource () {
    return ReadOnlyEventSource(this)
  }

  subscribe (id, handler) {
    this.subscribers[id] = handler
    addListener(this.name, handler)
  }

  unsubscribe (id) {
    removeListener(this.name, this.subscribers[id])
  }

  publish (data) {
    const event = createEvent(this.name, {detail: data})
    emitEvent(event)
  }
}

export class ReadOnlyEventSource extends EventSource {
  publish(data) {
    throw Error('can\'t call this method!')
  }
}
