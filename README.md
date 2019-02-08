# Kentico Cloud JS SDK Test Http Service

[![npm](https://img.shields.io/npm/v/advanced-test-http-service.svg?maxAge=1000)](https://www.npmjs.com/package/advanced-test-http-service)
[![dependency Status](https://img.shields.io/david/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://david-dm.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![devDependency Status](https://img.shields.io/david/dev/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://david-dm.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![Build Status](https://img.shields.io/travis/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://travis-ci.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![Maintainability](https://api.codeclimate.com/v1/badges/f22cad469cc8779c2583/maintainability)](https://codeclimate.com/github/Kentico/kentico-cloud-js-sdk-test-http-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f22cad469cc8779c2583/test_coverage)](https://codeclimate.com/github/Kentico/kentico-cloud-js-sdk-test-http-service/test_coverage)
[![npm](https://img.shields.io/npm/dt/advanced-test-http-service.svg?maxAge=1000)](https://www.npmjs.com/package/advanced-test-http-service)
[![npm](https://img.shields.io/npm/l/advanced-test-http-service.svg?maxAge=1000)](https://github.com/Kentico/kentico-cloud-js-sdk-test-http-service/blob/master/LICENSE.md)


This is source for npm package called `kentico-cloud-js-sdk-test-http-service`.

This package is meant to be used as a fake Http Service when testing [Kentico Cloud Delivery SDK](https://github.com/Kentico/kentico-cloud-js/tree/master/packages/delivery). It is basically an implementation of [IHttpService](https://github.com/Kentico/kentico-cloud-js/blob/master/packages/core/lib/http/ihttp.service.ts) that could be used when [configuring Delivery client](https://github.com/Kentico/kentico-cloud-js/blob/master/packages/delivery/DOCS.md#client-configuration).

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

This it the example of the usage. Object `fakeResponseConfig` could contain multiple entries - entry is chosen by matching request url against the regular expression pattern provided as a key.

> Full example is in [delivery client tests](/src/__tests__/delivery-client.test.ts). 

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
