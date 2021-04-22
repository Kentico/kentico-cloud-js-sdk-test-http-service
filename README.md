# Kentico Kontent Test HTTP Service for Kontent JavaScript SDKs

[![No Maintenance Intended](https://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
## :warning: Deprecation Notice
> This repository is no longer being maintained for compatibility with the latest version of the product and it is deprecated. We strongly recommend using the [`TestHttpService`from `@kentico/kontent-core`](https://www.npmjs.com/package/@kentico/kontent-core).

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
      modular_content: {
        ...
      },
      pagination: {
        continuation_token: null,
        next_page: null
      }
    },
    throwError: false,
    fakeHeaders: [{
       header: 'dummy-header-name',
       value: 'dummy value'
       }],
    fakeStatus: 200
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
