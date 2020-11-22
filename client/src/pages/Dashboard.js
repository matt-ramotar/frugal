import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getLinkToken from '../utils/getLinkToken';
import { usePlaidLink } from 'react-plaid-link';
export default function Dashboard() {
  const userId = useSelector(state => state.auth.userId);

  const [linkToken, setLinkToken] = useState('');

  useEffect(() => {
    (async () => {
      const linkToken = await getLinkToken(userId);
      setLinkToken(linkToken);
    })();
  }, [userId]);

  const onSuccess = useCallback((token, metadata) => {
    console.log('token', token);
    console.log('metadata', metadata);
  });

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready, error } = usePlaidLink(config);

  if (!linkToken) return null;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
      </div>
    </div>
  );
}
