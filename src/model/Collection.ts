import axios from 'axios';
import { Eventing } from './Eventing';
import { User, UserProps } from './User';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, private deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const { data } = await axios.get<K[]>(this.rootUrl);
    data.forEach((value) => {
      this.models.push(this.deserialize(value));
    });
    this.trigger('change');
  }
}
