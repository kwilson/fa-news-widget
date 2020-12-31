import fetchMock from 'jest-fetch-mock'

import { getTopHeadlines } from "./getTopHeadlines";
import response from './getTopHeadlines-news-api-response-test-data.json';

describe(`${getTopHeadlines.name}`, () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('it returns data from the API endpoint', async () => {
    const apiKey = 'api-key-value';
    fetchMock.mockResponseOnce(JSON.stringify(response));

    const result = await getTopHeadlines(apiKey);

    expect(result.totalResults).toBe(response.totalResults);
    result.articles.forEach((newsItem, i) => {
      const source = response.articles[i];

      expect(newsItem.sourceId).toEqual(source.source.id);
      expect(newsItem.sourceName).toEqual(source.source.name);
      expect(newsItem.title).toEqual(source.title);
      expect(newsItem.description).toEqual(source.description);
      expect(newsItem.url).toEqual(source.url);
      expect(newsItem.publishedAt).toEqual(source.publishedAt);
    });

    const [lastCall] = fetchMock.mock.calls[0];
    expect(lastCall).toBeInstanceOf(Request);

    const q = lastCall as Request;
    const params = new URLSearchParams(q.url.substr(q.url.indexOf('?')));

    expect(params.get('apiKey')).toEqual(apiKey);
    expect(params.get('page')).toEqual('1');
    expect(params.get('pageSize')).toEqual('5');
    expect(params.get('language')).toEqual('en');
  });

  test('it returns filtered data from the API endpoint with a single source', async () => {
    const apiKey = 'api-key-value';
    fetchMock.mockResponseOnce(JSON.stringify(response));

    const page = 3;
    const pageSize = 8;
    const sources = 'associated-press';

    const result = await getTopHeadlines(apiKey, {
      page,
      pageSize,
      sources: [sources]
    });

    expect(result.totalResults).toBe(response.totalResults);

    const [lastCall] = fetchMock.mock.calls[0];
    expect(lastCall).toBeInstanceOf(Request);

    const q = lastCall as Request;
    const params = new URLSearchParams(q.url.substr(q.url.indexOf('?')));

    expect(params.get('apiKey')).toEqual(apiKey);
    expect(params.get('page')).toEqual(page.toString(10));
    expect(params.get('pageSize')).toEqual(pageSize.toString(10));
    expect(params.get('language')).toEqual('en');
    expect(params.get('sources')).toEqual(sources);
  });

  test('it returns filtered data from the API endpoint with a multiple sources', async () => {
    const apiKey = 'api-key-value';
    fetchMock.mockResponseOnce(JSON.stringify(response));

    const page = 3;
    const pageSize = 8;
    const sources = 'associated-press,bbc-news';

    const result = await getTopHeadlines(apiKey, {
      page,
      pageSize,
      sources: sources.split(',')
    });

    expect(result.totalResults).toBe(response.totalResults);

    const [lastCall] = fetchMock.mock.calls[0];
    expect(lastCall).toBeInstanceOf(Request);

    const q = lastCall as Request;
    const params = new URLSearchParams(q.url.substr(q.url.indexOf('?')));

    expect(params.get('apiKey')).toEqual(apiKey);
    expect(params.get('page')).toEqual(page.toString(10));
    expect(params.get('pageSize')).toEqual(pageSize.toString(10));
    expect(params.get('language')).toEqual('en');
    expect(params.get('sources')).toEqual(sources);
  });
});
