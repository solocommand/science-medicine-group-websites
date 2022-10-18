marko-web-braze
===

Provides a service to interact with the Braze API. To install, pass your Express application instance to the middleware exported by this package:

```js
const handler = require('@parameter1/base-cms-marko-web-braze');

startServer({
  onStart: async (app) => {
    handler(app, {
      apiHost: 'https://my-braze-api.host',
      apiKey: 'my-braze-api-key'
    });
  },
}
```

You can then access the `braze` service instance off of the Express request and response objects.

```js
const user = req.braze.createUser(email, externalId);
```
