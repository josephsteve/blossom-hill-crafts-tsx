export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json'})
  });
  return res.json();
}
