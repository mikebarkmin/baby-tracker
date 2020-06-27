# Baby Tracker

![logo](https://github.com/mikebarkmin/baby-tracker/raw/master/logo.png)

**A progressive web app to track your baby and share the data with your family in real-time.**

[![Contributors](https://img.shields.io/github/contributors/mikebarkmin/baby-tracker.svg "Contributors")](https://github.com/mikebarkmin/baby-tracker/graphs/contributors)
[![Docker Cloud container status](https://img.shields.io/docker/cloud/build/mikebarkmin/baby-tracker.svg "Docker Cloud container status")](https://hub.docker.com/r/mikebarkmin/baby-tracker)
[![Docker Pulls](https://img.shields.io/docker/pulls/mikebarkmin/baby-tracker)](https://cloud.docker.com/repository/docker/mikebarkmin/baby-tracker)
[![Maintainability](https://api.codeclimate.com/v1/badges/ac5730932862bc3cfa78/maintainability)](https://codeclimate.com/github/mikebarkmin/baby-tracker/maintainability)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmikebarkmin%2Fbaby-tracker.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmikebarkmin%2Fbaby-tracker?ref=badge_shield)

## Demo

You can use the demo baby (ID: ZTeEim9l). Visit [www.babytracker.live](https://www.babytracker.live) and open the baby with the id (ZTeEim9l). Toy around and if you like it you can create a unique id for your own baby.

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

The data can be exported by clicking export in the bottom right-hand corner.

You can also activate a dark mode.

[Screenshots at the features page](https://github.com/mikebarkmin/baby-tracker/wiki/Features)

## Translations

[:de:](https://raw.githubusercontent.com/mikebarkmin/baby-tracker/master/client/src/locales/de-DE/messages.po) [:fr:](https://raw.githubusercontent.com/mikebarkmin/baby-tracker/master/client/src/locales/fr/messages.po) [:us:](https://raw.githubusercontent.com/mikebarkmin/baby-tracker/master/client/src/locales/en-US/messages.po)
[🇩🇰](https://raw.githubusercontent.com/mikebarkmin/baby-tracker/master/client/src/locales/da-DK/messages.po)

To correct a translation simply edit the corresponding message.po file.

To add a new language you can do this:

```sh
# Fork https://github.com/mikebarkmin/baby-tracker.git
git clone https://github.com/{your_username}/baby-tracker.git
cd baby-tracker.git
git checkout -b languages/{languagecode}
yarn install
yarn locale:add {languagecode}
yarn locale:extract
# Edit client/src/locale/{languagecode}/messages.po
yarn locale:compile
Update client/src/locales/catalogs.js
Update client/src/hooks/useLocale.js
# Submit a pull request
```

## [Feature Requests and Bugs](https://github.com/mikebarkmin/baby-tracker/issues)

Please add your questions as GitHub issue: [Baby-Tracker Feature Requests and Bugs](https://github.com/mikebarkmin/baby-tracker/issues).

## Develop

```sh
# Fork https://github.com/mikebarkmin/baby-tracker.git
git clone https://github.com/{yourusername}/baby-tracker.git
cd baby-tracker
cd client
yarn install
cd ..
docker-compose up
# Submit a pull request
```

## Deploy

```sh
wget https://github.com/mikebarkmin/baby-tracker/raw/master/docker-compose.prod.yml
wget https://github.com/mikebarkmin/baby-tracker/raw/master/mongo-init.js
# Change username and password to something other than server/test
docker-compose -f docker-compose.prod.yml up
# Visit localhost:8080
```

## Backup & Restore

```sh
# backup
docker-compose -f docker-compose.prod.yml exec -T mongo sh -c 'mongodump --username=root --password=example --archive' > db.dump.archive

# restore
docker-compose -f docker-compose.prod.yml exec -T mongo sh -c 'mongorestore --username=root --password=example --archive' < db.dump.archive
```


## License

Licensed under the MIT License, Copyright © 2019-present Mike Barkmin.

See [LICENSE](https://raw.githubusercontent.com/mikebarkmin/baby-tracker/master/LICENSE) for more information.
