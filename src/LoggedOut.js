import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import React, { useState } from 'react';

function LoggedOut() {
  const [tabIndex, setTabIndex] = useState(0)

  return <>
    <div className="section px-0 py-0">
      <div className="tabs is-centered is-fullwidth">
        <ul>
          <li className={tabIndex === 0 ? "is-active" : ""}><a onClick={() => setTabIndex(0)}>Login</a></li>
          <li className={tabIndex === 1 ? "is-active" : ""}><a onClick={() => setTabIndex(1)}>Sign up</a></li>
        </ul>
      </div>
    </div>
    {tabIndex === 0 && <LoginForm />}
    {tabIndex === 1 && <SignupForm />}
  </>
}

export default LoggedOut;
