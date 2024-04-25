import { User } from '../model/User';

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetRandomAge,
    };
  }

  onSetRandomAge = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `<div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input type="text" />
        <button>Click Me</button>
        <button class="set-age">Set random age</button>
      </div>`;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    Object.keys(this.eventsMap()).forEach((event) => {
      const [eventName, elemtnName] = event.split(':');
      fragment.querySelectorAll(elemtnName).forEach((element) => {
        element.addEventListener(eventName, eventsMap[event]);
      });
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
