import { HasId, Model } from '../model/Model';

// @ts-ignore
export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    Object.keys(eventsMap).forEach((event) => {
      const [eventName, elemtnName] = event.split(':');
      fragment.querySelectorAll(elemtnName).forEach((element) => {
        element.addEventListener(eventName, eventsMap[event]);
      });
    });
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    Object.keys(regionsMap).forEach((key) => {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    });
  }

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
