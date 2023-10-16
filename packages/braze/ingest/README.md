IdentityX+Braze User API
===

This API supports creating/updating IdentityX user data, questions, and braze integration features.

It accepts a JSON post request at the endpoint `/api/identity-x`. The `email` field is the only required value.

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

And finally, it supports the following feature flags:
- `automaticOptIn` Bool (default `true`) If enabled, the user will be automatically added to the default subscription group
- `automaticConfirm` Bool (default `false`) If enabled, the user will be marked as verified and opted out of the unconfirmed subscription group.
- `sendVerificationEmail` Bool (default `true`) If enabled, the login link email will be sent to the user to verify/confirm
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

	"automaticConfirm": false,
	"automaticOptIn": true,
	"sendVerificationEmail": true,
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
Authorization: Bearer ojp2io3jrp2i3jpjp2koedp
{
  "email": "lisa.ryan@scienceandmedicinegroup.com",
  "givenName": "Lisa",
  "sendVerificationEmail": false,
}
```
