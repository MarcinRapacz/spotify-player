# Spotify Player

Find and play spotify music sample
[Live](https://mr-spotify-player.herokuapp.com/)

### Development

- [add new app in the SpotifyAPI](https://developer.spotify.com/dashboard/applications)
- set Redirect URIs in the SpotifyAPI (same as in the sample.env)
- set environment variables in sample.env and rename the file to .env
- install dependencies

```sh
$ npm install && cd client && npm install
```

- run server on the port 5000(default), in the root directory run

```sh
$ npm run dev
```

- run application on the port 3000

```sh
$ npm start
```

- open localhost:3000

### Usege

- login to your spotify account by application
- find and listen

### Deployment

- commit and push to github

### Tech

- ReactJS
- ExpressJS
- SpotifyAPI
- Sass (BEM)
