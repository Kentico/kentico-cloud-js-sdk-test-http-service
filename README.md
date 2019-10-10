# Kentico Kontent Test HTTP Service for Kontent JavaScript SDKs

[![npm](https://img.shields.io/npm/v/%40kentico%2Fkontent-test-http-service-js.svg?maxAge=1000)](https://www.npmjs.com/package/%40kentico%2Fkontent-test-http-service-js)
[![npm](https://img.shields.io/npm/dt/%40kentico%2Fkontent-test-http-service-js.svg?maxAge=1000)](https://www.npmjs.com/package/%40kentico%2Fkontent-test-http-service-js)
[![npm](https://img.shields.io/npm/l/%40kentico%2Fkontent-test-http-service-js.svg?maxAge=1000)](%40kentico%2Fkontent-test-http-service-js)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

[![Build Status](https://img.shields.io/travis/Kentico/kontent-test-http-service-js.svg?maxAge=1000)](https://travis-ci.com/Kentico/kontent-test-http-service-js)
[![dependency Status](https://img.shields.io/david/Kentico/%40kentico%2Fkontent-test-http-service-js.svg?maxAge=1000)](https://david-dm.org/Kentico/kontent-test-http-service-js)

[![Maintainability](https://api.codeclimate.com/v1/badges/f22cad469cc8779c2583/maintainability)](https://codeclimate.com/github/Kentico/kontent-test-http-service-js/maintainability)

This is the source for the npm package called `@kentico/kontent-test-http-service-js`.

This package is meant to be used as a fake HTTP Service when testing the [Kentico Kontent Delivery SDK](https://github.com/Kentico/kontent-delivery-sdk-js) and [Kentico Kontent Management SDK](https://github.com/Kentico/kontent-management-sdk-js). It is basically an implementation of [IHttpService](https://github.com/Kentico/kontent-core-js/blob/master/lib/http/ihttp.service.ts) that could be used when [configuring the Delivery client](https://github.com/Kentico/kontent-delivery-sdk-js/blob/master/DOCS.md#client-configuration) or [configuring Management client](https://github.com/Kentico/kontent-management-sdk-js#configuration).

## Install

With `npm`:

```sh
npm install @kentico/kontent-test-http-service-js
```

## Usage

This it the example of the usage. The object `fakeResponseConfig` could contain multiple entries. An entry is chosen by matching the request url against the regular expression pattern provided as a key.

> The full example is in [delivery client tests](/src/__tests__/delivery-client.test.ts).

```typescript
const fakeResponseConfig = new Map<RegExp, FakeResponseConfig>()
fakeResponseConfig.set(
  // THIS IS A PATTERN THAT WOULD BE USED FOR MATCHING WHEN
  // QUERYING THE DATA AGAINST THE URL
  /https:\/\/deliver.kontent.ai\/.*\/items/,  
  {
    // HERE YOU PROVIDE YOUR FAKE RESPONSE FOR THIS PATTERN
    fakeResponseJson: {
      items: [
        {
          system: {...},
          elements: {...}
        }
      ],
      pagination: {
        continuation_token: null,
        next_page: null
      }
    },
    throwError: false
  });

const fakeHttpService =
 new KontentTestHttpService(fakeResponseConfig);

const deliveryClientConfig = {
      projectId: 'dummyProject',
      typeResolvers: [],
      httpService: fakeHttpService
    };

const client = new DeliveryClient(deliveryClientConfig)
```

## Author

Ondřej Chrastina — [@Simply007](https://twitter.com/Simply007)

### Thanks

- Author of the [typescript module boilerplate](https://github.com/jeffijoe/ts-module-boilerplate) Jeff Hansen — [@Jeffijoe](https://twitter.com/Jeffijoe)

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/kontent-test-http-service-js?pixel)
