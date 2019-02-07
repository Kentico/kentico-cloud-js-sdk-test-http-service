# Kentico Cloud JS SDK Test Http Service

[![npm](https://img.shields.io/npm/v/advanced-test-http-service.svg?maxAge=1000)](https://www.npmjs.com/package/advanced-test-http-service)
[![dependency Status](https://img.shields.io/david/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://david-dm.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![devDependency Status](https://img.shields.io/david/dev/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://david-dm.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![Build Status](https://img.shields.io/travis/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://travis-ci.org/Kentico/kentico-cloud-js-sdk-test-http-service)
[![Coveralls](https://img.shields.io/coveralls/Kentico/kentico-cloud-js-sdk-test-http-service.svg?maxAge=1000)](https://coveralls.io/github/Kentico/kentico-cloud-js-sdk-test-http-service)
[![npm](https://img.shields.io/npm/dt/advanced-test-http-service.svg?maxAge=1000)](https://www.npmjs.com/package/advanced-test-http-service)
[![npm](https://img.shields.io/npm/l/advanced-test-http-service.svg?maxAge=1000)](https://github.com/Kentico/kentico-cloud-js-sdk-test-http-service/blob/master/LICENSE.md)


This is an npm package called `kentico-cloud-js-sdk-test-http-service`.

It could be used as a fake Http Service when testing [Kentico Cloud Delivery SDK](https://github.com/Kentico/kentico-cloud-js/tree/master/packages/delivery).

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

This it the example of the usage. Object `fakeResponseConfig` could contain multiple entries - entries are chosen by matching request url against the regular expression pattern provided as a key.

> Full example is in [delivery client tests](/src/__tests__/delivery-client.test.ts). 

```typescript
const fakeResponseConfig = new Map<RegExp, FakeResponseConfig>()
fakeResponseConfig.set(
  // THIS IS A PATTERN THAT WOULD BE USED FOR MATCHING WHEN 
  // QUERYING THE DATA AGAINST THE URL
  /https:\/\/deliver.kenticocloud.com\/.*\/items/,  
  {
    // HERE YOU PROVIDE YOUR FAKE RESPONSE FOR ThIS PATTERN
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

const fakeHttpService = new KenticoCloudJsSdkTestHttpService(
      fakeResponseConfig
    );

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