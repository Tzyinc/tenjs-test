(function () {
'use strict';

const TEXT_ELEMENT = 'TEXT ELEMENT';

/**
* @param {object} type
* @param {object} config
* @return {object}
*/
function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  // if props has children, concat arguments to an empty array
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren.filter(child => child != null && child !== false)
  // if its an object just put it back, else replace it with text element
  .map(child => child instanceof Object ? child : createTextElement(child));
  return { type, props };
}

/**
 * @param {text} value
 * @return {function}
 */
function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

let rootInstance = null;
/**
@param {object} element
@param {object} container
*/
function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

/**
* @param {object} parentDom
* @param {object} instance
* @param {object} element
* @return {object}
*/
function reconcile(parentDom, instance, element) {
  if (instance == null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if (element == null) {
    parentDom.removeChild(instance.dom);
    return null;
  } else if (instance.element.type !== element.type) {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else if (typeof element.type === 'string') {
    // update dom instance
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    return instance;
  } else {
    // update composite instance
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
}

/**
* @param {object} instance
* @param {object} element
* @return {object}
*/
function reconcileChildren(instance, element) {
  const dom = instance.dom;
  const childInstances = instance.childInstances || [];
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(instance => instance != null);
}

/**
 * @param {object} element
 * @return {object}
 */
function instantiate(element) {
  const { type, props } = element;
  const isDOMElement = typeof type === 'string';
  if (isDOMElement) {
    const isTextElement = type === TEXT_ELEMENT;
    // create dom
    const dom = isTextElement ? document.createTextNode('') : document.createElement(type);
    updateDomProperties(dom, [], props);

    // instantiate and append children
    const childElements = props.children;
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));

    const instance = { dom, element, childInstances };
    return instance;
  } else {
    const instance = {};
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render();
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    Object.assign(instance, { dom, element, childInstance, publicInstance });
    return instance;
  }
}

/**
 * dom utilities
 * @param {object} dom
 * @param {object} prevProps
 * @param {object} nextProps
 */
function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = name => name.startsWith('on');
  const isAttribute = name => !isEvent(name) && name != 'children';

  // Remove event listeners
  Object.keys(prevProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  });

  // Remove attributes
  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    dom[name] = null;
  });

  // Set attributes
  Object.keys(nextProps).filter(isAttribute).forEach(name => {
    dom[name] = nextProps[name];
  });

  // Add event listeners
  Object.keys(nextProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, nextProps[name]);
  });
}

/**
*/
class Component {
  /**
   *  @param {object} props
   */
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  /**
  * @param {object} partialState
  */
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateInstance(this._internalInstance);
  }
}

/**
 * @param {object} internalInstance
 */
function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;
  reconcile(parentDom, internalInstance, element);
}

/**
 * @param {object} element
 * @param {object} internalInstance
 * @return {object}
 */
function createPublicInstance(element, internalInstance) {
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance._internalInstance = internalInstance;
  return publicInstance;
}

var tenjs = {
  createElement,
  Component,
  render
};

const paths = {
  assets: 'assets/'
};

/**
* login main page
*/
class Login extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);

    this.inputChange = e => {
      let inputState = {};
      inputState[e.target.name] = e.target.value;

      this.setState(inputState);
      this.props.updateParent(this.state);
    };

    this.state = this.props.state;

    // this.setState(inputState);
  }

  /**
  * @param {object} e
  */


  /**
  * @return {jsx}
  */
  render() {
    return createElement(
      'div',
      null,
      this.state.nowShowing === 'home' ? createElement(
        'div',
        null,
        createElement(
          'div',
          { className: 'height-90 opacity-full' },
          createElement(
            'div',
            { className: 'center-text login-subtext' },
            'FIND THE MOST LOVED ACTIVITIES'
          ),
          createElement(
            'div',
            { className: 'center-text login-maintext' },
            'BLACK CAT'
          ),
          createElement(
            'div',
            { className: 'center-block login-logo-circle' },
            createElement('object', { type: 'image/svg+xml',
              data: this.state.homeAddress + paths.assets + 'logo-cat.svg',
              className: 'center-block login-logo' })
          ),
          createElement(
            'div',
            { className: 'center-text login-input-div' },
            createElement(
              'div',
              { className: 'left-inner-image' },
              createElement('input', {
                name: 'username',
                className: 'login-input',
                placeholder: 'username',
                onchange: this.inputChange
              }),
              createElement('img', { role: 'img', src: this.state.homeAddress + paths.assets + 'user.svg' })
            )
          ),
          createElement(
            'div',
            { className: 'center-text login-input-div' },
            createElement(
              'div',
              { className: 'left-inner-image' },
              createElement('input', {
                name: 'password',
                type: 'password',
                className: 'login-input',
                placeholder: 'password',
                onchange: this.inputChange
              }),
              createElement('img', { role: 'img', src: this.state.homeAddress + paths.assets + 'password.svg' })
            )
          )
        ),
        createElement('div', { className: 'login-backdrop backdrop' })
      ) : null
    );
  }
}

/**
* generic footer, change internal on different page
*/
class SignInButton extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);

    this.handleClick = e => {
      if (this.state.nowShowing === 'home') {
        this.setState({ nowShowing: 'checkUser' });
      } else {
        this.setState({ nowShowing: 'home' });
      }
      // alert(updateParent);
      this.props.updateParent(this.state);
      // alert(JSON.stringify(this.state));
    };

    this.state = this.props.state;
  }

  /**
  * @param {object} e
  */


  /**
  * @return {jsx}
  */
  render() {
    return createElement(
      'div',
      { className: 'fill-parent' },
      this.state.nowShowing === 'home' ? createElement(
        'div',
        { onClick: this.handleClick,
          className: 'login-button-text center-text fill-parent' },
        'SIGN IN'
      ) : null
    );
  }
}

/**
* generic footer, change internal on different page
*/
class Footer extends tenjs.Component {
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
    return createElement(
      'div',
      null,
      this.state.nowShowing === 'home' ? createElement(
        'div',
        { className: 'footer' },
        createElement(SignInButton, { updateParent: this.handleChildState,
          state: this.state })
      ) : null
    );
  }
}

/**
*
*/
class App extends tenjs.Component {
  /**
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      nowShowing: 'home',
      homeAddress: document.location.href,
      loggedIn: false
    };
    this.handleChildState = this.handleChildState.bind(this);
  }

  /**
  * @param {object} state
  */
  handleChildState(state) {
    this.setState(state);
    alert(JSON.stringify(state));
    this.checkLoginStatus();
    alert(JSON.stringify(state));
    if (!this.state.loggedIn) {
      this.setState({ nowShowing: 'home' });
      alert(JSON.stringify(state));
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
        if (user.name === this.state.username && user.password === this.state.password) {
          this.setState({ loggedIn: 'true' });
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
    return createElement(
      'div',
      null,
      this.state.nowShowing === 'home' ? createElement(
        'div',
        { className: 'backdrop background-alt' },
        createElement(Login, { updateParent: this.handleChildState, state: this.state }),
        createElement(Footer, { updateParent: this.handleChildState, state: this.state })
      ) : null
    );
  }
}

// tenjs.render(<App name='test'/>, document.getElementById('root'));

// import 'todomvc-common';
// import 'todomvc-common/base.css';
// import 'todomvc-app-css/index.css';
let defaultUser = [{
  name: 'asdf',
  password: 'asdf'
}];

localStorage.setItem('users', defaultUser);
tenjs.render(createElement(App, { name: 'test' }), document.getElementById('root'));

}());
//# sourceMappingURL=index.js.map
