import React from 'react';
import CustomButton from '../../components/custom-button/CustomButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserStartAsync, facebookLogin,resetUserStatus } from '../../redux/user/user.actions';
import { ReactComponent as Line } from '../../assets/images/Line.svg';
import { ReactComponent as Girl } from '../../assets/images/girl.svg';
// import { ReactComponent as Google } from '../../assets/images/google.svg';
// import { ReactComponent as Facebook } from '../../assets/images/facebook.svg';
// import Toast from '../../components/toast/toast';
import { toast } from 'react-toastify';

import '../signup/sign-up.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: null,
      email: null,
      status: 'Loading...'
    };
  }

  setLoginDetails = (event) => {
    const { name, value } = event.target;
    this.setState((prevState, PrevProps) => ({ [name]: value }));
  };

  _handleFacebookSignInClick = () => {
    // Authenticate via passport api in the backend
    // Open Facebook login page
    // Upon successful login, a cookie session will be stored in the client
    window.open(`${process.env.REACT_APP_API_URL}/auth/facebook`, "_self");
    // fetch(`${process.env.REACT_APP_API_URL}/auth/facebook`,{
    //   method: 'get'
    // }).then(data => console.log(data))
  };

  _handleGoogleSignInClick = () => {
    // Authenticate via passport api in the backend
    // Open Google login page
    // Upon successful login, a cookie session will be stored in the client
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      return;
    }
    const { loginUserStartAsync } = this.props;
    loginUserStartAsync(email, password);
    
  };

  render() {
    return (
      <div className="container">
        <section>
          <h2 className="login-title">Hello</h2>

          <p id="sub-heading">Please sign in to your account</p>
          <div className="login-section">
            <form id="login" onSubmit={this.handleSubmit}>
            <p className='error-message'>{ this.props.user.login ? this.props.user.login.error : null }</p>
            <p className='signup-message'>{this.props.user.signup === 201 ? this.props.user.currentUser ? 
            this.props.user.currentUser.message : null : null }</p>
              <fieldset> 
                <div className="left">
                  <input
                    name="email"
                    type="email"
                    className="user-details"
                    placeholder='email'
                    onChange={this.setLoginDetails}
                    required
                  />

                  <input
                    name="password"
                    type="password"
                    className="user-details"
                    placeholder='password'
                    onChange={this.setLoginDetails}
                    required
                  />
                  <div id="align-psw">
                    <p className="forgot-psw">
                      <b>Forgot password?</b>
                    </p>
                  </div>
                  <CustomButton
                    className="btn-send register-btn"
                    onClick={() => (toast.current = toast(this.state.status))}
                  >
                    Login
                  </CustomButton>
                </div>
              </fieldset>
            </form>

            <div className="middle">
              <Line className="divider" />
              <p>Or</p>
              <Line className="divider" />
            </div>

            <div className="right">
              <p>Sign up with one of your social accounts</p>
              <CustomButton className="soc-btn" onClick={this._handleFacebookSignInClick}>
                <img src="images/facebook.svg" id="facebook" alt="facebook login" />
                <span>sign in with facebook</span>
              </CustomButton>

              <CustomButton className="soc-btn" onClick={this._handleGoogleSignInClick}>
                <img src="images/google.svg" alt="google login" id="google" />
                <span>sign in with google</span>
              </CustomButton>
            </div>

            <Girl id="girl" />
          </div>

          <p className="prompt-msg">
            Don't an account?
            <Link to="/sign-up" className="link" onClick={this.props.resetUserStatus}>
              <b>Sign Up</b>
            </Link>
          </p>
        </section>
      </div>
    );
  }
}

const mapDispatchToprops = (dispatch) => ({
  loginUserStartAsync: (email, password) => dispatch(loginUserStartAsync(email, password)),
  facebookLogin: () => dispatch(facebookLogin()),
  resetUserStatus: () => dispatch(resetUserStatus())
});

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToprops)(Login);
