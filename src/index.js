console.log('test');
import tenjs, {createElement} from '../../Tenjs2/ten';
/**
*/
class App extends tenjs.Component {
  /**
  * @return {object}
  */
  render() {
    return (<div>hello {this.props.name} </div>);
  }
}

tenjs.render(<App name='test'/>, document.getElementById('root'));
