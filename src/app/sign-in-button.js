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
    this.state = this.props.state;
  }

  /**
  * @param {object} e
  */
  handleClick = (e) => {
    if (this.state.nowShowing === 'home') {
      this.setState({nowShowing: 'checkUser'});
    } else {
      this.setState({nowShowing: 'home'});
    }
    // alert(updateParent);
    this.props.updateParent(this.state);
    // alert(JSON.stringify(this.state));
  }

  /**
  * @return {jsx}
  */
  render() {
    return (
      <div className='fill-parent'>
      {
        this.state.nowShowing === 'home' ? (
          <div onClick = {this.handleClick}
          className='login-button-text center-text fill-parent'>
            SIGN IN
          </div>
        )
        :
          null
      }
      </div>
    );
  }
}
