import { User, UserProps } from '../model/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetRandomAge,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveModel,
    };
  }

  onSetRandomAge = (): void => {
    this.model.setRandomAge();
  };

  onSaveModel = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector(
      'input.change-name'
    )! as HTMLInputElement;
    const name = input.value;
    this.model.set({ name });
  };

  template(): string {
    return `<div>
        <input type="text" class="change-name" placeholder="${this.model.get(
          'name'
        )}"/>
        <button class="set-name">Change name</button>
        <button class="set-age">Set random age</button>
        <button class="save-model">Save User</button>
      </div>`;
  }
}
