import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";


export default function Oauth() {
  // assuming to get google auth callback 
  // https://oauth2.example.com/callback#access_token=...
  let callbackParams = window.location.hash.slice(1)// remove hashtag at the beginning

  const authParams = new URLSearchParams(callbackParams)
  console.log(authParams.toString());
  const accessToken = authParams.get('access_token')
  const tokenType = authParams.get('token_type')
  const scope = authParams.get('scope')

  const authorization = `${tokenType} ${accessToken}`

  console.log(authorization);
  console.log(scope);
  return <p>Oauth</p>
}