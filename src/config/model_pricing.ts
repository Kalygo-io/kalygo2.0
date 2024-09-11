/*
reference OpenAI documentation that defines pricing and rate limits...

https://openai.com/pricing
https://platform.openai.com/account/rate-limits
https://platform.openai.com/docs/guides/rate-limits/overview
*/

export default {
  models: {
    "gpt-3.5-turbo": {
      minimumCreditsRequired: 10,
      context: 4000,
      tpm: 90000,
      rpm: -1, // TODO
      pricing: {
        markUp: 1.5,
        input: {
          rate: 0.0015, // USD
          perTokens: 1000,
        },
        output: {
          rate: 0.002, // USD
          perTokens: 1000,
        },
      },
    },
    "gpt-3.5-turbo-16k": {
      minimumCreditsRequired: 12,
      context: 16000,
      tpm: 180000,
      rpm: -1, // TODO
      pricing: {
        markUp: 1.5,
        input: {
          rate: 0.003, // USD
          perTokens: 1000,
        },
        output: {
          rate: 0.004, // USD
          perTokens: 1000,
        },
      },
    },
    "gpt-4o": {
      minimumCreditsRequired: 0,
      context: 128000,
      tpm: 30000,
      rpm: -1, // TODO
      pricing: {
        markUp: 1.4,
        input: {
          rate: 5.0, // USD
          perTokens: 1000000,
        },
        output: {
          rate: 15.0, // USD
          perTokens: 1000000,
        },
      },
    },
    "gpt-4o-mini": {
      minimumCreditsRequired: 0,
      context: 128000,
      tpm: 200000,
      rpm: -1, // TODO
      pricing: {
        markUp: 1.4,
        input: {
          rate: 0.15, // USD
          perTokens: 1000000,
        },
        output: {
          rate: 0.6, // USD
          perTokens: 1000000,
        },
      },
    },
    "text-embedding-ada-002": {
      minimumCreditsRequired: 10,
      context: 0,
      tpm: 1000000,
      rpm: 3000,
      pricing: {
        markUp: 1.5,
        usage: {
          rate: 0.0001, // USD
          perTokens: 1000,
        },
      },
    },
  },
};
