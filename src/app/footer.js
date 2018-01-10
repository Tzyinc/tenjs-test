import tenjs, {createElement} from '../../../Tenjs/ten';
import SignInButton from './sign-in-button'
/**
* generic footer, change internal on different page
*/
export default class Footer extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
    // this.state = this.props.state;
  }
  /**
  * @return {jsx}
  */
  render() {
    return (
      <div>
      {
        this.props.state.nowShowing === 'home' ? (
          <div className='footer'>
            <SignInButton state={this.props.state} />
          </div>
        )
        : null
      }
      </div>
    );
  }
}
