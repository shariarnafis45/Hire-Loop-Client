import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const headers = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};

  return headers;
};

export const serverMuting = async (path, data, methood = "POST") => {
  const res = await fetch(`${serverUrl}${path}`, {
    method: methood,
    headers: {
      "content-type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return handleStatusCode(res);
};
export const serverFetch = async (path) => {
  const res = await fetch(`${serverUrl}${path}`);
  return res.json();
};
export const secureServerFetch = async (path) => {
  const res = await fetch(`${serverUrl}${path}`, {
    headers: {
      ...(await authHeader()),
    },
  });
  return handleStatusCode(res);
};

const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  }
  if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
