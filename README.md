# Epik.com API Client for Node.js

A Node.js wrapper for the Epik.com domain registration API.

## • Installation

Latest version: 0.0.2

`npm install epik.com`

## • Testing

`npm  test`

## • Epik API Documentation

For complete API documentation, up-to-date parameters, reponses and errors, please refer to https://registrar.epik.com/docs/epik-API.pdf.

## • Getting your API Signature

Access to the Epik.com API requires an account. Sign up at https://www.epik.com.

Log into your account and navigate to the API settings page at https://registrar.epik.com/account/api-settings by selecting Account > View/Manage Profile > then select API Settings in the left sidebar.

Generate your IP Address and find your `Signature` at the top of the page.

## • Quick Start Example

```javascript
//1. Import epik.com
const Epik = require('epik.com');

//2. Initiate the Epik API Client with your API Signature
const EpikClient = new Epik(EPIK_API_SIGNATURE);

//3. Make calls
var func = async() => {
  let data = await EpikClient.domains.checkAvailability('giraffecookie.com');
};
```

## • Setting your Initial Epik Parameters

You'll need to set up a one parameter before using the Epik.com module.
Upon instantiation, set the API Signature.

### Signature
The API Signature is required to be set before making any valid requests.


#### Setting the Key
```javascript
EpikClient.setSignature(EPIK_API_SIGNATURE);
//Alternatively
EpikClient.signature = EPIK_API_SIGNATURE;
```

## • Constants

This module provides helper constants for use in calls.

___
#### • `EpikClient.PERIODS`
The acceptable time periods for domain registrations.

| Key | Usage | Description |
| --- | --- | --- |
`ONE_YEAR` | `EpikClient.PERIODS.ONE_YEAR` | 1 Year
`TWO_YEARS` | `EpikClient.PERIODS.TWO_YEARS` | 2 Years
`THREE_YEARS` | `EpikClient.PERIODS.THREE_YEARS` | 3 Years
`FOUR_YEARS` | `EpikClient.PERIODS.FOUR_YEARS` | 4 Years
`FIVE_YEARS` | `EpikClient.PERIODS.FIVE_YEARS` | 5 Years
`SIX_YEARS` | `EpikClient.PERIODS.SIX_YEARS` | 6 Years
`SEVEN_YEARS` | `EpikClient.PERIODS.SEVEN_YEARS` | 7 Years
`EIGHT_YEARS` | `EpikClient.PERIODS.EIGHT_YEARS` | 8 Years
`NINE_YEARS` | `EpikClient.PERIODS.NINE_YEARS` | 9 Years
`TEN_YEARS` | `EpikClient.PERIODS.TEN_YEARS` | 10 Years


___
## • Making Calls
All calls using the `EpikClient` are asynchronous.

All calls are returned in the following format:
```javascript
{
    success: Boolean,
    message: String,
    code: Number,
    data: Object
}
```

The EpikClient splits up the currently available calls outline in the official Epik.com API documentation into one part.

| Namespace | Usage | Description |
| --- | --- | --- |
`domains` | `EpikClient.domains[...]` | Calls related to domains


___
### • Domains
Calls related to domains.


#### `domains.lock()`
Lock method is called to update domain statuses and change them from `Ok` to `ClientUpdateProhibited`, `ClientTransferProhibited`, `ClientDeleteProhibited`.

Params:

- `domains`: `string|array` - A single domain or array of domains
             
Usage Example:
```javascript
let data = await EpikClient.domains.lock('giraffecookie.com');
//
let data = await EpikClient.domains.lock(
  ['giraffecookie.com', 'giraffecookies.com']
);
```

___
#### `domains.unlock()`
The Unlock method sets domain status to `Ok`.

Params:

- `domains`: `string|array` - A single domain or array of domains
             
Usage Example:
```javascript
let data = await EpikClient.domains.unlock('giraffecookie.com');
//
let data = await EpikClient.domains.unlock(
  ['giraffecookie.com', 'giraffecookies.com']
);
```

___
#### `domains.setAuthCode()`
This call sets desired authorization code for a domain. As per official documentaion, there is a code format you need to follow for this operation to succeed: 8 (eight) alphanumeric characters, having at least 1 (one) numeric, 1 (one) alphabetic, and 1 (one) special character.

Params:

- `domain`: `string` - A single domain
- `code`: `string` - The auth code
             
Usage Example:
```javascript
let data = await EpikClient.domains.setAuthCode('giraffecookie.com', '1234!ABCD');
```

___
#### `domains.setNameServers()`
This call sets name servers for a single domain.

Params:

- `domain`: `string` - A single domain
- `nameservers`: `string|array` - A single nameserver or an array of nameservers
             
Usage Example:
```javascript
let data = await EpikClient.domains.setNameServers('giraffecookie.com', 'ns.giraffecookie.com');
//
let data = await EpikClient.domains.setNameServers('giraffecookie.com',
  ['ns.giraffecookie.com', 'ns1.giraffecookie.com']
);
```

___
#### `domains.setWhoIsInfo()`
This call updates whois information. Each param has a prefix which tells what type of contact needs to be updated. You can update “Administrative” – A, “Billing” – B and “Technical” – T details.

Params:

- `domain`: `string` - A single domain
- `params`: `object` - Parameters to pass through to the request
- `params.PRIVATE`: `number` - {`0`|`1`}
- `params.AORGANIZATION`: `string` - "Administrative" (A) - Organization name
- `params.ANAME`: `string` - "Administrative" (A) - Name
- `params.AEMAIL`: `string` - "Administrative" (A) - Email
- `params.AADDRESS`: `string` - "Administrative" (A) - Address
- `params.ACITY`: `string` - "Administrative" (A) - City
- `params.ASTATE`: `string` - "Administrative" (A) - State
- `params.AZIP`: `string|number` - "Administrative" (A) - Zip code
- `params.ACOUNTRY`: `string` - "Administrative" (A) - Country
- `params.ACOUNTRYCODE`: `string` - "Administrative" (A) - Coutry code
- `params.APHONE`: `string|number` - "Administrative" (A) - Phone e.g. + 1.2120001111
- `params.TORGANIZATION`: `string` - "Technical" (T) - Organization name
- `params.TNAME`: `string` - "Technical" (T) - Name
- `params.TEMAIL`: `string` - "Technical" (T) - Email
- `params.TADDRESS`: `string` - "Technical" (T) - Address
- `params.TCITY`: `string` - "Technical" (T) - City
- `params.TSTATE`: `string` - "Technical" (T) - State
- `params.TZIP`: `string|number` - "Technical" (T) - Zip code
- `params.TCOUNTRY`: `string` - "Technical" (T) - Country
- `params.TCOUNTRYCODE`: `string` - "Technical" (T) - Country code
- `params.TPHONE`: `string|number` - "Technical" (T) - Phone e.g. + 1.2120001111
- `params.BORGANIZATION`: `string` - "Billing" (B) - Organization name
- `params.BNAME`: `string` - "Billing" (B) - Name
- `params.BEMAIL`: `string` - "Billing" (B) - Email
- `params.BADDRESS`: `string` - "Billing" (B) - Address
- `params.BCITY`: `string` - "Billing" (B) - City
- `params.BSTATE`: `string` - "Billing" (B) - State
- `params.BZIP`: `string|number` - "Billing" (B) - Zip code
- `params.BCOUNTRY`: `string` - "Billing" (B) - Country
- `params.BCOUNTRYCODE`: `string` - "Billing" (B) - Country code
- `params.BPHONE`: `string|number` - "Billing" (B) - Phone e.g. + 1.2120001111
          
Usage Example:
```javascript
let data = await EpikClient.domains.setWhoIsInfo('giraffecookie.com', 
  {
    PRIVATE: 0,
    TORGANIZATION: 'The Company',
    BCITY: 'New York',
    BSTATE: 'New York',
  },
);
```

___
#### `domains.checkAvailability()`
This function is used to check if a domain is available for registration.

Params:

- `domains`: `string|array` - A single domain or array of domains
             
Usage Example:
```javascript
let data = await EpikClient.domains.checkAvailability('giraffecookie.com');
//
let data = await EpikClient.domains.checkAvailability(
  ['giraffecookie.com', 'giraffecookies.com']
);
```

___
#### `domains.register()`
Register a new domain with a given time period.

Params:

- `domain`: `string` - A single domain
- `period`: `string|number` - One of EpikClient.PERIODS
             
Usage Example:
```javascript
let data = await EpikClient.domains.register('giraffecookie.com', EpikClient.PERIODS.ONE_YEAR);
```

___
#### `domains.setHostRecords()`
Set up new host records. By using this function, all existing host records will be removed.

Params:

- `domain`: `string` - A single domain
- `hostRecordGroups`: `array` - Array of host record groups
- `hostRecordGroups[n]`: `object` - Each item of a `hostRecordGroup`
- `hostRecordGroups[n].HOST`: `string` - Host
- `hostRecordGroups[n].TYPE`: `string` - A set of predefined values (host record types). For example: `A`, `MX`, `CNAME`, etc
- `hostRecordGroups[n].AUX`: `string|number`
- `hostRecordGroups[n].DATA`: `string` - Data plays variable role for variable host record types. E.g. it is `IP` for `A` record.
- `hostRecordGroups[n].TTL`: `string|number` - Time to Live value
             
Usage Example:
```javascript
let data = await EpikClient.domains.setHostRecords('giraffecookie.com', [
  {
    HOST: 'giraffecookie.com',
    TYPE: 'CNAME',
    DATA: 'giraffecookie.com',
    TTL: '300'
  },
  {
    HOST: 'giraffecookie.com',
    TYPE: 'CNAME',
    DATA: 'thegiraffecookie.com',
    TTL: '300'
  },
]);
```


## • Say Hi

Find me on Gab: [@markmiscavage](https://gab.com/markmiscavage).

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2019 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.