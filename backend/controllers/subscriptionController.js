const SubscribeSchema = require("../models/subscriptionPlans");
const randomstring = require("randomstring")

const { RAZOR_PAY_KEY_ID, RAZOR_PAY_SECRET } = process.env;
const paymentSchema = require("../models/payment");
const Razorpay = require("razorpay");
let val = undefined;
let instance = new Razorpay({
  key_id: RAZOR_PAY_KEY_ID,
  key_secret: RAZOR_PAY_SECRET,
});

module.exports = {
  post: {
    async getSubscriptionOfNetflix(req, res) {
      try {
        const user = req.user;
        const { plan, amount } = req.body;
        let options = {
          amount: amount, // amount in the smallest currency unit
          currency: "INR",
          receipt: randomstring.generate(7),
          payment_capture: 1,
        };
        await instance.orders
          .create(options, (err, order) => {
            if (err) throw err;
            console.log(order);
            val = order;
          })
          .then(() => {
            let paymentobj = {
              user_id: user._id,
              order_id: val.id,
              razor_payment_id: null,
              razor_signature: null,
            };
            let yahoo = async () => {
              let order = await paymentSchema.create(paymentobj);
              order.save();
              const subscription = await SubscribeSchema.create({
                userId: user.id,
                plan: plan,
                planStartDate: Date(Date.now()).toString(),
                planExpiryDate:
                  plan === "monthly"
                    ? new Date(Date.now() + 2592000000).toString()
                    : new Date(Date.now() + 31536000000).toString(),
              });
              await subscription.save();
              console.log(subscription);
              res.json({ statusCode: 201, subscription });
            };
            yahoo();
          });
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
    async razor_pay_success(req, res) {
        console.log(req.body)
        const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body
        await payment1.findOneAndUpdate({order_id:razorpay_order_id}, {$set:{razor_payment_id:razorpay_payment_id,razor_signature:razorpay_signature}},{new:true})
     }
  },

  get: {
    async getSubscribtionDetail(req, res) {
      const user = req.user;
      const detail = await SubscribeSchema.find({ userId: user.id });
      console.log(detail);
      res.json({ status: "passed", detail });
    },
  },
};
