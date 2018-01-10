import tenjs, {createElement} from '../../../Tenjs/ten';
import Login from './login';
import Footer from './footer';
/**
* @param {event} e
*/
export default class App extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: 'home',
    };
  }

   handleClick = (e) => {
     alert('test');
   };
  /**
  * @return {object}
  */
  render() {
    /*
    <div onClick = {this.handleClick}>
      hello {this.props.name}
    </div>
    */
    return (
      <div className='backdrop background-alt'>
        <Login state={this.state}/>
        <Footer state={this.state}/>
      </div>
    );
  }
}

// tenjs.render(<App name='test'/>, document.getElementById('root'));
