export default async function getLinkToken(userId) {
  const res = await fetch('plaid/create_link_token', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  console.log(res);
  if (res.ok) {
    const { linkToken } = await res.json();
    return linkToken;
  }
}
