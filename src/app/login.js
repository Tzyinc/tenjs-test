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
    this.state = {
      nowShowing: 'home',
      loginName: '',
      loginPassword: '',
    };
  }
  /**
  * @return {jsx}
  */
  render() {
    return (
        <div >
          <div className='height-90 opacity-full'>
            <div className='center-text login-subtext'>
              FIND THE MOST LOVED ACTIVITIES
            </div>
            <div className='center-text login-maintext'>
              BLACK CAT
            </div>
            <div className='center-block login-logo-circle'>
              <object type="image/svg+xml"
                data={paths.assets + 'logo-cat.svg'}
                className='center-block login-logo'>
              </object>
            </div>
            <div className='center-text login-input-div'>
                <div className='left-inner-image'>
                  <input
                    className="login-input"
                    placeholder="username"
                    value={this.state.loginName}
                  />
                  <img role="img" src={paths.assets + 'user.svg'} />
                </div>
            </div>
            <div className='center-text login-input-div'>
                <div className='left-inner-image'>
                  <input
                    className="login-input"
                    placeholder="password"
                    value={this.state.loginPassword}
                  />
                  <img role="img" src={paths.assets + 'password.svg'} />
                </div>
            </div>
          </div>
          <div className='login-backdrop backdrop'>
          </div>
        </div>
    );
  }
}
