export interface INewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INewsApiResponse {
  status: string;
  totalResults: number;
  articles: INewsApiArticle[];
}

export interface INewsItem {
  sourceId: string | null;
  sourceName: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export interface INewsItemCollection {
  totalResults: number;
  articles: INewsItem[];
}

export interface IGetTopHeadlinesQueryParameters {
  /** Defaults to page 1 */
  page?: number;
  /** Defaults to 5 */
  pageSize?: number;
  sources?: string[];
}

const baseUrl = 'https://newsapi.org/v2';

export async function getTopHeadlines(apiKey: string, query?: IGetTopHeadlinesQueryParameters): Promise<INewsItemCollection> {
  const {
    page = 1,
    pageSize = 5,
    sources = []
  } = query || {};

  const queryParams = [
    { key: 'apiKey', value: apiKey },
    { key: 'page', value: page },
    { key: 'pageSize', value: pageSize },
    { key: 'sources', value: sources.join(',') },
    { key: 'language', value: 'en' },
  ].filter(x => x.value !== '').map(x => `${x.key}=${x.value}`).join('&');

  var url = `${baseUrl}/top-headlines?${queryParams}`;
  var req = new Request(url);

  const response = await fetch(req);
  return parseResponse(await response.json());
}

function parseResponse(response: INewsApiResponse): INewsItemCollection {
  return {
    totalResults: response.totalResults,
    articles: response.articles.map((article) => ({
      sourceId: article.source?.id,
      sourceName: article.source?.name,
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt
    }))
  }
}
