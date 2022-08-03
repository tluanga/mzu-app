// const sdk = require('api')('@cashfreedocs-new/v2#3pc871dl45p0wi3');

// sdk.CreateOrder({
//   order_id: 'string',
//   order_amount: 10.15,
//   order_currency: 'INR',
//   customer_details: {
//     customer_id: '7112AAA812234',
//     customer_email: 'john@cashfree.com',
//     customer_phone: '9908734801',
//     customer_bank_account_number: '1518121112',
//     customer_bank_ifsc: 'CITI0000001',
//     customer_bank_code: 3333
//   },
//   order_meta: {
//     return_url: 'https://b8af79f41056.eu.ngrok.io?order_id={order_id}&order_token={order_token}',
//     notify_url: 'https://b8af79f41056.eu.ngrok.io/webhook.php'
//   },
//   order_expiry_time: '2021-07-29T00:00:00Z',
//   order_note: 'Test order',
//   order_tags: {additionalProp: 'string'},
//   order_splits: [
//     {vendor_id: 'Vendor01', amount: '100.1'}
//   ]
// }, {'x-api-version': '2022-01-01'})
//   .then(res => console.log(res))
//   .catch(err => console.error(err));