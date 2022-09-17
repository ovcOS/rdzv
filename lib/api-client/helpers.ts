export const post = async (endpoint: string, data: any) => {
  const body = JSON.stringify(data);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };
  const response = await fetch(endpoint, options);
  const result = await response.json();
  return result;
};
