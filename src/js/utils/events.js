import {isString} from 'lodash'

const EventManager = new EventTarget()

export const addListener = (target, listener) => {
  return EventManager.addEventListener(target, listener)
}

export const removeListener = (target, listener) => {
  return EventManager.removeEventListener(target, listener)
}

export const emitEvent = evt => {
  EventManager.dispatchEvent(evt)
}

export const createEvent = (target, params) => {
  return new CustomEvent(target, {detail: params})
}

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
    EventManager.addEventListener(this.name, handler)
  }

  unsubscribe (id) {
    EventManager.removeEventListener(this.name, this.subscribers[id])
  }

  publish (data) {
    const event = createEvent(this.name, {detail: data})
    EventManager.dispatchEvent(event)
  }
}

export class ReadOnlyEventSource extends EventSource {
  publish(data) {
    throw Error('can\'t call this method!')
  }
}
