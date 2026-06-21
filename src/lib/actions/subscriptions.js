import { serverFetch, serverMuting } from "../core/server";

export const createSubscription = async (subscriptionInfo) => {
  return serverMuting("/api/subscriptions", subscriptionInfo);
};