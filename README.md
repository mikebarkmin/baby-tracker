# Baby Tracker

![logo](logo.png)

**A progressive web app to track your baby and share the data with your family in real-time.**

[![Contributors](https://img.shields.io/github/contributors/mikebarkmin/baby-tracker.svg "Contributors")](https://github.com/mikebarkmin/baby-tracker/graphs/contributors)
[![Docker Hub container status](https://img.shields.io/docker/build/mikebarkmin/baby-tracker.svg "Docker Hub container status")](https://hub.docker.com/r/mikebarkmin/baby-tracker)
[![Docker Pulls](https://img.shields.io/docker/pulls/mikebarkmin/baby-tracker)](https://cloud.docker.com/repository/docker/mikebarkmin/baby-tracker)
[![Maintainability](https://api.codeclimate.com/v1/badges/ac5730932862bc3cfa78/maintainability)](https://codeclimate.com/github/mikebarkmin/baby-tracker/maintainability)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmikebarkmin%2Fbaby-tracker.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmikebarkmin%2Fbaby-tracker?ref=badge_shield)

## Features

Create a new baby by entering his/her name in the designated field. Afterwards
you will receive a unique id which represents your baby. Share this id with
your husband, family and friends. All inserts, updates and deletes will be
synced to everyone in realtime, thanks to the magic of websockets.

At the moment these activities can be tracked:

* Diaper
* Nursing
* Food
* Sleep
* Measurement

[Screenshots at the features page](https://github.com/mikebarkmin/baby-tracker/wiki/Features)

## Translations

:de: :fr: :us: :gb:

To correct a translation simply edit the corresponding message.po file.

To add a new language you can do this:

```
Fork https://github.com/mikebarkmin/baby-tracker.git
git clone https://github.com/{your_username}/baby-tracker.git
cd baby-tracker.git
git checkout -b languages/{languagecode}
yarn install
yarn locale:add {languagecode}
yarn locale:extract
Edit client/src/locale/{languagecode}/messages.po
yarn locale:compile
Submit a pull request
```

## [Feature Requests and Bugs](https://github.com/mikebarkmin/baby-tracker/issues)

Please add your questions as GitHub issue: [Baby-Tracker Feature Requests and Bugs](https://github.com/mikebarkmin/baby-tracker/issues).

## Develop

`docker-compose up`

## Deploy

`docker-compose -f docker-compose.prod.yml up`

## License

Licensed under the MIT License, Copyright © 2019-present Mike Barkmin.

See [LICENSE](./LICENSE) for more information.
