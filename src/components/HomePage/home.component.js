import React, { useState, useEffect } from 'react';

export default function HomePage(props) {
  debugger;
  const isUserLoggedIn = sessionStorage.getItem('isLoggedIn');
  // if(!isLoggedIn)
  const user =JSON.parse(sessionStorage.getItem('user'));
  

  return (
    <div>
      home
    </div>
  )
}