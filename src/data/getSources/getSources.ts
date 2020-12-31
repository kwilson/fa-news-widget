const baseUrl = 'https://newsapi.org/v2';

export interface ISource {
  id: string;
  name: string;
}

interface IResponse {
  status: string;
  sources: Array<{
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  }>;
}

export async function getSources(apiKey: string): Promise<ISource[]> {
  var url = `${baseUrl}/sources?apiKey=${apiKey}&language=en`;
  const req = new Request(url);

  const response = await fetch(req);
  return parseResponse(await response.json());
}

function parseResponse(response: IResponse): ISource[] {
  return response.sources.map((source) => ({
    id: source.id,
    name: source.name
  }));
}
