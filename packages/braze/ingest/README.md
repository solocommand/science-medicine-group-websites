IdentityX+Braze User API
===

This API supports creating/updating (via POST request), retrieving (via GET request), deleting (via DELETE request) IdentityX user data, questions, and braze integration features.

It accepts a JSON POST request at the endpoint `/api/identity-x`. The `email` field is the only required value.

It accepts the following core IdentityX fields:
- `email` String (required)
- `givenName` String
- `familyName` String
- `street` String
- `addressExtra` String
- `city` String
- `countryCode` String _must be a valid ISO 3166-1 alpha-2 country code, aka US, MX, etc._
- `regionCode` String _must be a valid ISO 3166-2 region code for the selected country, aka WI, NLE, ON, etc._
- `postalCode` String
- `organization` String
- `organizationTitle` String
- `phoneNumber` String

It accepts the following keyed custom selects:
- `org_type` String
- `profession` String
- `subspecialties` String[]
- `technologies` String[]

It accepts a list of subscription group opt-in/out preferences, keyed by the group id:
- `subscriptions: { 'xxx-yyy-zzz': false }`

It accepts the following Braze custom attributes (`last_email_activity_legacy` and `outside_source`) via the following:
- `brazeCustomAttributes: { 'last_email_activity_legacy': 'mm/dd/yyyy', 'outside_source': String }`

And finally, it supports the following feature flags:
- `automaticOptIn` Bool (default `false`) If enabled, the user will be automatically added to the default subscription group. Overrides preference for group in `subscriptionGroups` if present.
- `automaticConfirm` Bool (default `false`) If enabled, the user will be marked as verified and opted out of the unconfirmed subscription group.
- `sendVerificationEmail` Bool (default `false`) If enabled, the login link email will be sent to the user to verify/confirm
- `updateBraze` Bool (default `true`) If enabled, the user data will be sent to Braze after updating in IdentityX.

In order to change a feature flag away from the default value, a Bearer auth header must be sent, and a valid pre-configured APi key supplied. Valid keys are to be stored in the `IDENTITYX_APP_API_KEYS` env var, which should be formatted as a JSON array string.


```
# all values
POST https://auntminnie.com/api/identity-x
{
	"email": "josh+dne1@parameter1.com",
	"givenName": "Joshua",
	"familyName": "Worden",
	"street": "1234 Fake Street",
	"addressExtra": "Apt. C",
	"city": "Madison",
	"countryCode": "US",
	"regionCode": "WI",
	"postalCode": "53711",
	"organization": "Parameter1, LLC",
	"organizationTitle": "Director, Cloud Operations",
	"phoneNumber": "317-605-0395",

	"org_type": "Independent contractor",
	"profession": "IT Professional",
	"subspecialties": ["Imaging Informatics", "Screening"],
	"technologies": ["Artificial Intelligence/Computer-aided detection or diagnosis"],

  "subscriptions": {
    "29j28h2-l2k2dk2j2-2dj28dj2d": true,
    "92h229dj0-d2jd20d2hdh2-d22d": false
  },

	"brazeCustomAttributes": {
		"last_email_activity_legacy": "05/13/2024",
		"outside_source": "Parameter1"
	},

	"automaticConfirm": false,
	"automaticOptIn": false,
	"sendVerificationEmail": false,
	"updateBraze": true
}
```

```
# minimal
POST https://staging.drbicuspid.com/api/identity-x
{ "email": "josh+new-user123@parameter1.com" }
```

```
# with auth
POST https://staging.labpulse.com/api/identity-x
{
  "email": "lisa.ryan@scienceandmedicinegroup.com",
  "givenName": "Lisa",
  "sendVerificationEmail": false,
}
```

GET requests must contain a query parameter of `userId` or `email` (One or the other, not both):

```
GET https://auntminnie.com/api/identity-x?email=email@email.com
```

```
GET https://auntminnie.com/api/identity-x?userId=65e09b514c0157c4845edaca"
```

DELETE requests must contain a body value for `userId` or `email` (One or the other, not both):

```
DELETE https://auntminnie.com/api/identity-x
{ "email": "email@email.com" }
```

```
DELETE https://auntminnie.com/api/identity-x
{ "userId": "65e09b514c0157c4845edaca" }
```
