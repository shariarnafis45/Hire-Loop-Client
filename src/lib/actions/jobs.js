
// new job post

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
console.log(serverUrl);
export const createNewJob = async (newJobData) => {
  const res = await fetch(`${serverUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });
  return res.json();
};
