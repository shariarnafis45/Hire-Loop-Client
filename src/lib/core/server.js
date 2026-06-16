const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverMuting = async (path, data) => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const serverFetch = async (path) => {
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};
