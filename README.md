# Kentico Cloud JS SDK Test HTTP Service

[![npm](https://img.shields.io/npm/v/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://www.npmjs.com/package/kentico-cloud-js-sdk-test-http-service)
[![npm](https://img.shields.io/npm/dt/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://www.npmjs.com/package/kentico-cloud-js-sdk-test-http-service)
[![npm](https://img.shields.io/npm/l/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](kentico-cloud-js-sdk-test-http-service)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-cloud)

[![Build Status](https://img.shields.io/travis/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://travis-ci.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![dependency Status](https://img.shields.io/david/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://david-dm.org/Kentico/kentico-cloud-js-sdk-test-http-service)

[![Maintainability](https://api.codeclimate.com/v1/badges/f22cad469cc8779c2583/maintainability)](https://codeclimate.com/github/Kentico/kentico-cloud-js-sdk-test-http-service/maintainability)


This is the source for the npm package called `kentico-cloud-js-sdk-test-http-service`.

This package is meant to be used as a fake HTTP Service when testing the [Kentico Cloud Delivery SDK](https://github.com/Kentico/kentico-cloud-js/tree/master/packages/delivery). It is basically an implementation of [IHttpService](https://github.com/Kentico/kentico-cloud-js/blob/master/packages/core/lib/http/ihttp.service.ts) that could be used when [configuring the Delivery client](https://github.com/Kentico/kentico-cloud-js/blob/master/packages/delivery/DOCS.md#client-configuration).

# Install

With `npm`:

```
npm install kentico-cloud-js-sdk-test-http-service
```

Or with `yarn`

```
yarn add kentico-cloud-js-sdk-test-http-service
```

# Usage

This it the example of the usage. The object `fakeResponseConfig` could contain multiple entries. An entry is chosen by matching the request url against the regular expression pattern provided as a key.

> The full example is in [delivery client tests](/src/__tests__/delivery-client.test.ts). 

```typescript
const fakeResponseConfig = new Map<RegExp, FakeResponseConfig>()
fakeResponseConfig.set(
  // THIS IS A PATTERN THAT WOULD BE USED FOR MATCHING WHEN 
  // QUERYING THE DATA AGAINST THE URL
  /https:\/\/deliver.kenticocloud.com\/.*\/items/,  
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
    throwCloudError: false
  });

const fakeHttpService = 
 new KenticoCloudJsSdkTestHttpService(fakeResponseConfig);

const deliveryClientConfig = {
      projectId: 'dummyProject',
      typeResolvers: [],
      httpService: fakeHttpService
    };

const client = new DeliveryClient(deliveryClientConfig)
```

# Author

Ondřej Chrastina — [@Simply007](https://twitter.com/Simply007)

## Thanks

- Author of the [typescript module boilerplate](https://github.com/jeffijoe/ts-module-boilerplate) Jeff Hansen — [@Jeffijoe](https://twitter.com/Jeffijoe)

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/kentico-cloud-js-sdk-test-http-service?pixel)
