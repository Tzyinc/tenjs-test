import tenjs, {createElement} from '../../../Tenjs/ten';
import {paths} from './filepaths';
/**
* login main page
*/
export default class Login extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = this.props.state;

    // this.setState(inputState);
  }

  /**
  * @param {object} e
  */
  inputChange = (e) => {
    let inputState = {};
    inputState[e.target.name]= e.target.value;

    this.setState(inputState);
    this.props.updateParent(this.state);
  }


  /**
  * @return {jsx}
  */
  render() {
    return (
        <div >
          {this.state.nowShowing === 'home' ?
          (
            <div>
              <div className='height-90 opacity-full'>
                <div className='center-text login-subtext'>
                  FIND THE MOST LOVED ACTIVITIES
                </div>
                <div className='center-text login-maintext'>
                  BLACK CAT
                </div>
                <div className='center-block login-logo-circle'>
                  <object type="image/svg+xml"
                    data={this.state.homeAddress
                      + paths.assets + 'logo-cat.svg'}
                    className='center-block login-logo'>
                  </object>
                </div>
                <div className='center-text login-input-div'>
                    <div className='left-inner-image'>
                      <input
                        name = "username"
                        className="login-input"
                        placeholder="username"
                        onchange={this.inputChange}
                      />
                      <img role="img" src={this.state.homeAddress
                        + paths.assets + 'user.svg'} />
                    </div>
                </div>
                <div className='center-text login-input-div'>
                    <div className='left-inner-image'>
                      <input
                        name = "password"
                        type = "password"
                        className="login-input"
                        placeholder="password"
                        onchange={this.inputChange}
                      />
                      <img role="img" src={this.state.homeAddress
                        + paths.assets + 'password.svg'} />
                    </div>
                </div>
              </div>
              <div className='login-backdrop backdrop'>
              </div>
              </div>
            )
          : null
          }
        </div>
    );
  }
}
