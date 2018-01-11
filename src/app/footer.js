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
    this.state = this.props.state;
    this.handleChildState = this.handleChildState.bind(this);
  }

  /**
  * @param {object} state
  */
  handleChildState(state) {
    this.setState(state);
    this.props.updateParent(this.state);
  }
  /**
  * @return {jsx}
  */
  render() {
    return (
      <div>
      {
        this.state.nowShowing === 'home' ? (
          <div className='footer'>
            <SignInButton updateParent={this.handleChildState}
            state={this.state} />
          </div>
        )
        : null
      }
      </div>
    );
  }
}
