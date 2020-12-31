# News Widget

## Usage
Register an API key from [newsapi.org](https://newsapi.org/).

```js
<NewsWidget apiKey={apiKey} />
```

## Development

### Getting Started
Register an API key from [newsapi.org](https://newsapi.org/) and add it to a .env.local file with the key:

```shell
REACT_APP_NEWSAPI_KEY=<your key value>
```

Then install pre-reqs and start the demo app using

```shell
npm i
npm start
```

## TODO Notes (if I had more time)
> do what you can and give us a rough outline of what further changes you might consider making

### Tidy up testing library tests
I'm more familiar with Jest and Cypress so thought this would be a good opportunity to brush up on `@testing-library/react`. I'm not _particularly_ happy with the tests in NewsWidget, so I'd look at refactoring these quite a bit. Although I'd favour testing a container element like this with Cypress.
### Tidy up styling
The PDF attachment doesn't contain sizing info, so I've just made a best-guess at what looks okay to me. The colours have been grabbed from there so should be okay.

### Handle data overlap issues
I'd have a look at solutions for removing the possibility of duplicate news items appearing in the list after clicking 'show more'. If a new items pops onto the stack, then the previous last item of page _x_ might now be the first item on page _x+1_. Ideally the API would offer something like `getAfter(timestamp / id)` but I didn't see anything like that in the docs.

### Handle errors
I've got data-loading errors being saved to the state, but didn't have time to do anything with them in the UI. My instinct would be to retry _x_ number of times for articles failing to load, then show an error message. For the sources, I'd ignore that error and continue to show the widget without the filter as the user still gets _some_ functionality when this happens.

Something like that would need some investigation for whatever UX is appopriate though.

### Confirm some parts of functionality:
  - should the source filter be done at the API-level or on the client? I've used the API itself to filter but it's possible that it should read more data up-front then filter based on the dropdown
  - should the data source by easily replaceable/set by consumers? e.g. some sort of provider prop to map a given API to a shape
