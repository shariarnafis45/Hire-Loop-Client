const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverMuting = async (path, data, methood = "POST") => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: methood,
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
