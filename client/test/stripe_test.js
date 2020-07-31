const axios = require("axios");

describe('Stripe', function () {
  describe('Get Stripe Card Token', function () {
    const shopifyPaymentsAccountId = 'acct_1GzoKLJhIpu1hGO5';
    const secretKey = 'sk_test_IA886Yk0AyaSZksEvQjdcgHB';
    it('should save without error', function (done) {
      const httpCient = axios.create({
        'baseURL': 'https://api.stripe.com',
        'headers': {
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': `Bearer ${secretKey}`,
          'stripe-account': shopifyPaymentsAccountId
        }
      });

      let creditCard = new URLSearchParams();
      creditCard.append("card[number]", 4242424242424242);
      creditCard.append("card[exp_month]", 12);
      creditCard.append("card[exp_year]", 2024);
      creditCard.append("card[cvc]", 123);
      httpCient.post("/v1/tokens", creditCard).then((res) => {
        console.log(res);
        done();
      }).catch((err) => {
        console.error(err);
      });
    });
  });
});