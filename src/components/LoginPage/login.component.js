import React, { useState, Fragment } from 'react';
import { Row, Label, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  useHistory,
  useLocation
} from "react-router-dom";
import axios from 'axios';
import './login.css';

export default function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/home" } };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let login = () => {

    axios({
      url: 'https://xandar.pinnium.in/api/dive-in/users/login',
      method: 'POST',
      data: {
        email: username,
        password: password
      }
    }).then((resp) => {
      debugger;
      if (resp.status === 200 && resp.data.success) {
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("user", JSON.stringify(resp.data.result));
        history.replace(from);
      }
    }).catch((ex) => {
      console.log(ex);
    });

  };

  return (
    <Fragment>
      <div>
        <div className='logo'></div>
        <div className='body'>
          <div className='login-body'>
            <Container>
              <h4>Dive In!</h4>
              <h5>Start Learning Right Away</h5>
              <br />
              <h6>
                We aim to help you develop knowledge.
                Just choose your topic of interest, and start
                reading. Each piece of content is from one
                of the top bloggers in the respective fields
                So, dive right in!
              </h6>
              <div className='login-form'>
                <Label for='username'>Email</Label>
                <Input type='email' placeholder='Enter Email' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Label for='password'>Password</Label>
                <Input type='text' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Button color='success' onClick={login}>Login</Button>
              </div>
              <div className='signup-form'>
                <p>Don't have an account? <Link to='/signup'>Signup </Link></p>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
