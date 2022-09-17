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
  console.log({ response });
  const result = response.json();
  return result;
};
