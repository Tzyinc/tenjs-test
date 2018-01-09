import tenjs, {createElement} from '../../Tenjs2/ten';
/**
*/
class App extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }
  /**
  * @return {object}
  */
  render() {
    return (<div>helloworld</div>);
  }
}

tenjs.render(<App/>, document.getElementById('root'));
