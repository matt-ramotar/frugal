import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getLinkToken from '../utils/getLinkToken';
import getAccessToken from '../utils/getAccessToken';
import { usePlaidLink } from 'react-plaid-link';
import { ADD_ITEM } from '../graphql/mutations';
import { GET_ACCOUNTS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
  const userId = useSelector(state => state.auth.userId);
  const history = useHistory();

  const [linkToken, setLinkToken] = useState('');

  const { loading, error, data } = useQuery(GET_ACCOUNTS, { variables: { userId } });

  useEffect(() => {
    (async () => {
      const linkToken = await getLinkToken(userId);
      setLinkToken(linkToken);
    })();
  }, [userId]);

  const [addItem] = useMutation(ADD_ITEM);

  const onSuccess = useCallback(async (token, metadata) => {
    const { accessToken, itemId } = await getAccessToken(token);
    addItem({ variables: { accessToken, itemId, userId } });
  });

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  if (loading) return 'Loading...';

  if (!linkToken) return null;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
      </div>
      <div>
        <ul>
          {data.user.accounts.map(account => (
            <li key={account.id}>{account.mask}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
