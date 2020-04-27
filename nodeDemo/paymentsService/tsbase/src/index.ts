import * as express from "express";
import axios from "axios";
import { Stripe } from "stripe";

const stripe = new Stripe("sk_test_iQ9JlfjHiRlfoj54ArWReYs200HDotDXbL", {
  apiVersion: null,
});
const app = express();

app.post("/pay", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "T-shirt",
        description: "Comfortable cotton t-shirt",
        images: [
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.98147221.2262%2Fthrowpillow%2Csmall%2C750x1000-bg%2Cf8f8f8.u2.jpg&f=1&nofb=1",
        ],
        amount: 500,
        currency: "usd",
        quantity: 1,
      },
    ],
    success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://example.com/cancel",
  });
  console.log(session);
  res.send({ sessionId: session.id });
});

app.listen(3010, () => console.log("listening"));
