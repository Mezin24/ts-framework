import { AxiosPromise } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;
  /* 
  THE SAME LIKE
    get on() {
        return this.events.on;
    }

    get trigger() {
      return this.events.trigger;
    }

    get get() {
      return this.attributes.get;
    }
  */

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    const id = this.get('id');

    if (!id) {
      throw new Error("Couldn't fetch without id");
    }
    const { data } = await this.sync.fetch(id);
    this.set(data);
  }

  async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll());
      this.events.trigger('save');
    } catch (error) {
      this.events.trigger('error');
    }
  }
}
