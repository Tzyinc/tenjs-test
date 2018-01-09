import tenjs, {createElement} from '../../Tenjs2/ten';
/**
*/
class App extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    console.log('test');
    super(props);
    this.state = {
      count: 1,
    };
  }
  /**
  * @return {object}
  */
  render() {
    return (
      <div>hello world</div>
    );
  }
}

tenjs.render(<App name = 'test'/>, document.getElementById('root'));
