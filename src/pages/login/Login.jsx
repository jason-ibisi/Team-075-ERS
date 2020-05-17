import React from 'react';
import CustomButton from '../../components/custom-button/CustomButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserStartAsync } from '../../redux/user/user.actions';
import '../signup/sign-up.css';

class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      password: 'Password',
      email: 'Email address',

    }
  }

  setLoginDetails = (event) => {
    const { name, value } = event.target;
    this.setState((prevState, PrevProps) => ( {[name]: value} ));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { loginUserStartAsync } = this.props;
    loginUserStartAsync(email, password)
    this.setState((prevState, prevProps) => ({
      password: 'Password',
      email: 'Email address',
    }))
  }
  

  render() {

    return (
      <section>

        <h2 className="login-title">Hello</h2>

        <p id="sub-heading">Please sign in to your account</p>

        <div className="login-section">
          <form id="login" onSubmit={this.handleSubmit}>

            <fieldset>

              <div className="left">
                <input name="email" 
                  type="email" 
                  className="user-details" 
                  placeholder={this.state.email} 
                  onChange={this.setLoginDetails}
                />

                <input name="password" 
                  type="password" 
                  className="user-details" 
                  placeholder={this.state.password} 
                  onChange={this.setLoginDetails}
                />

                <p className="forgot-psw">
                  <b>Forgot password?</b>
                </p>

                <CustomButton className="btn-send register-btn">Login</CustomButton>

              </div>

            </fieldset>

          </form>
  
          <div className="middle">

            <img src="images/line.svg" alt="line" className="divider" />
            <p>Or</p>
            <img src="images/line.svg" alt="line" className="divider" />
          </div>
  
          <div className="right">

            <p>Sign up with one of your social accounts</p>

            <CustomButton className="soc-btn">
              <img src="images/facebook.svg" alt="facebook icon" id="facebook" />
              <span>sign in with facebook</span>
            </CustomButton>

            <CustomButton className="soc-btn">
              <img src="images/google.svg" alt="google icon" id="google" />
              <span>sign in with google</span>
            </CustomButton>

          </div>

          <img src="images/girl.svg" alt="girl" id="girl" />

        </div>

        <p className="prompt-msg">
          Don't an account?
          <Link to="/sign-up" className='link'> <b>Sign Up</b> </Link>
        </p>

      </section>
    );
  }
};

const mapDispatchToprops = (dispatch) => ({
  loginUserStartAsync: (email, password) => dispatch(loginUserStartAsync(email, password))
})

export default connect(null, mapDispatchToprops)(Login);
