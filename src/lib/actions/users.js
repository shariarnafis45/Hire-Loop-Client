"use server";
import { headers } from "next/headers";
import { auth } from "../auth";

export const updateUserRole = async (userId, newRole) => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: newRole,
    },

    headers: await headers(),
  });

  return data;
};
export const deleteUser = async (userId) => {
  const deletedUser = await auth.api.removeUser({
    body: {
      userId: userId,
    },

    headers: await headers(),
  });

  return deletedUser;
};
