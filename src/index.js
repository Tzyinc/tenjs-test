import tenjs, {createElement} from '../../Tenjs/ten';
import App from './app';
// import 'todomvc-common';
// import 'todomvc-common/base.css';
// import 'todomvc-app-css/index.css';

tenjs.render(<App name='test'/>, document.getElementById('root'));
