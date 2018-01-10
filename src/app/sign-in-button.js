import tenjs, {createElement} from '../../../Tenjs/ten';
/**
* generic footer, change internal on different page
*/
export default class SignInButton extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
  }
  /**
  * @return {jsx}
  */
  render() {
    return (
      <div className='fill-parent'>
      {
        this.props.state.nowShowing === 'home' ? (
          <div className='login-button-text center-text fill-parent'>
            SIGN IN
          </div>
        )
        : null
      }
      </div>
    );
  }
}
