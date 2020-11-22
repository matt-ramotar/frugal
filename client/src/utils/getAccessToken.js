//** Exchange public token for access token */

export default async function getAccessToken(publicToken) {
  const res = await fetch('plaid/exchange_public_token', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicToken }),
  });

  if (res.ok) {
    const { accessToken, itemId } = await res.json();
    return { accessToken, itemId };
  }
}
