import axios from 'axios';
import { User } from './model/User';

const user = new User({ name: 'new user', age: 199 });
user.events.on('click', () => console.log('Click #1'));
user.events.on('click', () => console.log('Click #2'));
user.events.trigger('click');
