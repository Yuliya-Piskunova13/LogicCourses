type TagChangeListener = (tag: string | null) => void;

class TagEventEmitter {
  private static instance: TagEventEmitter;
  private listeners: TagChangeListener[] = [];

  static getInstance(): TagEventEmitter {
    if (!TagEventEmitter.instance) {
      TagEventEmitter.instance = new TagEventEmitter();
    }
    return TagEventEmitter.instance;
  }

  on(event: 'tagChanged', listener: TagChangeListener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  off(event: 'tagChanged', listener: TagChangeListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  emitTagChanged(tag: string | null) {
    this.listeners.forEach(listener => listener(tag));
  }

  clear() {
    this.listeners = [];
  }
}

export const tagEventEmitter = TagEventEmitter.getInstance();
