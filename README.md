# Show&Tell

Show&Tell is a full-stack web application built with next.js (React) and Express.js (Node) which let users easily create, publish and view articles. The backend source code of the app can be viewed [here](https://github.com/AnonimDevelope/show-and-tell-api).

## Features

One of the important features of the app is performance, achieved by server-side rendering, static generation, prefetching, and caching data.
All articles are statically generated on the server, so the navigation is very fast. 
Users can like-dislike articles, save, and comment.
Comments also can be liked-disliked.
Users have their profile which can be edited, a history that can be all cleared or cleared selectively, and saves where are saved articles.

## How it works

The project stack is [Next.js](https://nextjs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/).
[Editor.js](https://editorjs.io/) is used as an editor.
Some components are from [Ant Design](https://ant.design/) library.
The global state is controlled by [Redux](https://redux.js.org/).
[SWR](https://swr.vercel.app/) library is used for data caching.
All user media is stored on [AWS S3](https://aws.amazon.com/s3/).

## Installation

Install the dependencies and start the server.

```sh
npm i
npm run dev
```

For production environments...

```sh
npm i
npm run build
npm start
```

## License

MIT
