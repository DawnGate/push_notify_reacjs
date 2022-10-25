const subscriptions = {};
var crypto = require("crypto");
const webpush = require("web-push");

// const vapidKeys = {
//   privateKey: "",
//   publicKey: "",
// };

const vapidKeys = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

function createHash(input) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest();
}

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body.data;
  const subscriptionId = createHash(JSON.stringify(subscriptionRequest));
  subscriptions[subscriptionId] = subscriptionRequest;
  return res.status(201).json({ id: subscriptionId });
}

function sendPushNotification(req, res) {
  const subscriptionId = req.params.id;

  const pushSubscription = subscriptions[subscriptionId];

  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "New Product Available",
        text: "Hey! Take a look at this brand new t-shirt",
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        tag: "new-product",
        url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html",
      })
    )
    .catch((err) => {
      console.log(err);
    });

  return res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
