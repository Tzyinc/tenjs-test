import tenjs, {createElement} from '../../Tenjs/ten';
import App from './app';
// import 'todomvc-common';
// import 'todomvc-common/base.css';
// import 'todomvc-app-css/index.css';
let defaultUser = [{
  name: 'asdf',
  password: 'asdf',
}];

localStorage.setItem('users', defaultUser);
tenjs.render(<App name='test'/>, document.getElementById('root'));
