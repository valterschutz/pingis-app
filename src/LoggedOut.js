import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import React, { useState } from 'react';
import Navbar from './components/Navbar';

function LoggedOut() {
  const [tabIndex, setTabIndex] = useState(0)

  return <>
    <Navbar choices={['Login', 'Sign up']} fn={setTabIndex} />
    {tabIndex === 0 && <LoginForm />}
    {tabIndex === 1 && <SignupForm />}
  </>
}

export default LoggedOut;
