ZeroBounce API
===
This package provides a service to check the validity of an email address using the [ZeroBounce API](https://www.zerobounce.net/docs/email-validation-api-quickstart). It also provides a middleware that installs the service onto the passed Express application instance.

## Usage
To use this package, ensure that the `ZERO_BOUNCE_API_KEY` environment variable is present. Then, install the middleware, or access the service directly:
```js
const zb = require('@smg/pkg-zero-bounce');
app.use(zb);

app.get('/test/:email', async (req) => {
  const { zeroBounce } = req;
  const { email } = req.params;
  const isValid = await zeroBounce.isEmailValid(email, req.ip);
  res.json({ email, isValid });
});
```
```js
const ZeroBounce = require('@smg/pkg-zero-bounce/service')
const zb = new ZeroBounce({ apiKey: 'foo.bar' });
const response = await zb.validateEmail('do_not_mail@example.com');
process.stdout.writeln(response);
// {
// 	"address": "do_not_mail@example.com",
// 	"status": "do_not_mail",
// 	"sub_status": "global_suppression",
//   ...
// }
```
