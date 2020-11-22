import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { UPSERT_GOOGLE_USER } from '../graphql/mutations';

export default function GoogleRedirect() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [googleId, setGoogleId] = useState('');
  const [picture, setPicture] = useState('');

  const history = useHistory();

  const [upsertGoogleUser] = useMutation(UPSERT_GOOGLE_USER, {
    onCompleted(data) {
      const { id, token } = data.upsertGoogleUser;
      localStorage.setItem('userId', id);
      localStorage.setItem('token', token);
      history.push('/dashboard');
    },
  });

  const location = useLocation();
  const accessToken = location.hash.match(/(?<=access_token=)[a-zA-z.0-9-=%]+/gm)[0];

  useEffect(() => {
    async function getUser() {
      const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const { email, family_name, given_name, id, picture } = await res.json();

        console.log(email, family_name, given_name, id, picture);

        setEmail(email);
        setFirstName(given_name);
        setLastName(family_name);
        setGoogleId(id);
        setPicture(picture);
      }
    }
    getUser();
  });

  useEffect(() => {
    if (email && firstName && lastName && googleId && picture)
      upsertGoogleUser({ variables: { firstName, lastName, email, password: googleId, googleId, picture } });
  }, [upsertGoogleUser, email, firstName, lastName, googleId, picture]);

  return (
    <div>
      <img src={picture} alt='profile' width='80px' />
      <div>{`${firstName} ${lastName} ${email} ${googleId} ${picture}`}</div>
    </div>
  );
}
