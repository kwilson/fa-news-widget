import fetchMock from 'jest-fetch-mock'

import { getSources } from './getSources';
import response from './getSources-news-api-response-test-data.json';

describe(`${getSources.name}`, () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('it returns data from the API endpoint', async () => {
    const apiKey = 'api-key-value';
    fetchMock.mockResponseOnce(JSON.stringify(response));

    const result = await getSources(apiKey);

    result.forEach((source, i) => {
      const responseSource = response.sources[i];

      expect(source.id).toEqual(responseSource.id);
      expect(source.name).toEqual(responseSource.name);
    });

    const [lastCall] = fetchMock.mock.calls[0];
    expect(lastCall).toBeInstanceOf(Request);

    const q = lastCall as Request;
    const params = new URLSearchParams(q.url.substr(q.url.indexOf('?')));

    expect(params.get('apiKey')).toEqual(apiKey);
    expect(params.get('language')).toEqual('en');
  });
});
