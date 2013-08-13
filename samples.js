// Samples for Stripe payments.
var config = require('./local-config.js')
var stripe = require('stripe')(config.test_api_key)
// First sample: create a customer
function sample1() {
  console.log('=== Sample 1 ===');
  console.log('Create a customer.');
  var customer =  {
    email: 'zladuric@gmail.com'
    , card: {
      number: '4242424242424242'
      , exp_month: '02'
      , exp_year: '15'
      , cvc: '312'
      , name: 'Zlatko Duric'
    }
  }
  var cb = function(err, customer) {
    if (err) throw err;
    console.log(customer);
    console.log('Customer created.');
    obj.card = customer.default_card;
    sample2();
  }
  stripe.customers.create(customer, cb);
}

// Second sample. Make a charge. Use a card from a customer in sample one.
function sample2() {
  console.log('=== Sample 2 ===');
  console.log('Make a small charge from customer from sample 1');
  stripe.charges.create({
    customer: 'cus_2NXuCBrz9s6YcD'
    , amount: '300'
    , currency: 'usd'
  }, function(err, charge) {
    if(err) console.log('Error charging: ', err);
    console.log(charge);
  });
};

sample2();


