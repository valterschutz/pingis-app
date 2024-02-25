import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.png';
import BigButton from './components/BigButton';

export default function Form({ buttonText, buttonFn }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <div className="flex flex-col justify-center items-center">
    <img className="max-h-60" src={logo} alt="logo" />
    <div className="flex flex-col justify-center items-center">
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input placeholder="pingisapp@gmail.com" className="pl-8 pr-2 shadow-md bg-white rounded-lg h-10 text-xl  ml-2" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="relative mb-8">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input placeholder="******" className="pl-8 pr-2 shadow-md bg-white rounded-lg h-10 text-xl ml-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <BigButton text={buttonText} onClick={() => buttonFn(email, password)} />
    </div>
  </div>


}
