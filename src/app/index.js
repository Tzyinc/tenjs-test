import tenjs, {createElement} from '../../../Tenjs/ten';
import Login from './login';
import Footer from './footer';
/**
*
*/
export default class App extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: 'home',
      homeAddress: document.location.href,
      loggedIn: false,
    };
    this.handleChildState = this.handleChildState.bind(this);
  }

  /**
  * @param {object} state
  */
  handleChildState(state) {
    this.setState(state);
    // alert(JSON.stringify(state));
    this.checkLoginStatus();
    if (!this.state.loggedIn) {
      this.setState({nowShowing: 'home'});
    }
  }

  /**
  */
  checkLoginStatus() {
    if (this.state.nowShowing != 'home') {
      if (this.state.username) {
        if (this.state.password) {
          this.checkCredentials();
        }
      }
    }
  }

  /**
  */
  checkCredentials() {
    const users = localStorage.getItem('users');
    for (index in users) {
      if (users[index]) {
        let user = users[index];
        if (user.name === this.state.username &&
          user.password === this.state.password) {
          this.setState({loggedIn: 'true'});
        }
      }
    }
  }
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
      <div>
      { this.state.nowShowing === 'home' ?
          (
            <div className='backdrop background-alt'>
              <Login updateParent={this.handleChildState} state={this.state}/>
              <Footer updateParent={this.handleChildState} state={this.state}/>
            </div>
          )
        :
          null
      }
      </div>
    );
  }
}

// tenjs.render(<App name='test'/>, document.getElementById('root'));
