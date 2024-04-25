import { User } from './model/User';
import { UserForm } from './view/UserForm';

const rootEl = document.getElementById('root')!;
const userForm = new UserForm(rootEl, User.buildUser({ name: 'Max', age: 7 }));
userForm.render();
