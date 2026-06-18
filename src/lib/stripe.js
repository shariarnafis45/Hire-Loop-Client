import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const priceId = {
  seeker_pro: "price_1TjjEHGbZi0IRAz5eEzypjeS",
  seeker_premium: "price_1TjkRUGbZi0IRAz5Hu7Gnz8d",
  recruiter_growth: "price_1TjkS0GbZi0IRAz5QlaqZe0t",
  recruiter_enterprise: "price_1TjkSNGbZi0IRAz5hv2TnD20",
};
