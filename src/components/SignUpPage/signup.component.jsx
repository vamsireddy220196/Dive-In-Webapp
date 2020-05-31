import React, { useState, Fragment } from 'react';
import { Row, Label, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import './signup.css';

export default function SignupPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/home" } };
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let signup = () => {

    // make db call and then update session mein user details. then pushback to prev page
    // fakeAuth.authenticate(() => {
    //   history.replace(from);
    // });
    // sessionStorage.setItem("isLoggedIn", true);
    // sessionStorage.setItem("user", { name: 'bhanu', age: '10' });
    // history.replace(from);
  };

  return (
    <Fragment>
      <div>
        <div className='logo'></div>
        <div className='body'>
          <div className='signup-body'>
            <Container>
              <h4>Dive In!</h4>
              <h5>Start Learning Right Away</h5>
              <br />
              <div className='login-form'>
                <Label for='name'>Name</Label>
                <Input type='text' name='name' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                <Label for='email'>Email Id</Label>
                <Input type='text' name='email' type={'email'} placeholder='Enter Valid Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Label for='username'>UserName</Label>
                <Input type='text' name='username' placeholder='Enter Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Label for='password'>Password</Label>
                <Input type='text' name='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Label for='confirm'>Confirm Password</Label>
                <Input type='text' name='confirm' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <br />
                <Button color='success' onClick={signup}>SignUp</Button>
              </div>
              <div className='signup-form'>
                <p>Already have an account? <Link to='/login'>Login </Link></p>
              </div>
            </Container>
          </div>
        </div>
        {/* <button onClick={login}>Log in</button> */}
      </div >
    </Fragment >

  );
}
