// import * as Sentry from '@sentry/browser';

function init() {
  // Sentry.init({dsn: "https://a1c41dab50d44f2bbc40a51ba41c40c2@o775356.ingest.sentry.io/5797004"});

}

function log(error) {
  console.log(error);
  // Sentry.captureException(error);
}

export default {
  init,
  log
}