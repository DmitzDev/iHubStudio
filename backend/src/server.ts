import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(
    `[iHub Studio API] Listening on http://localhost:${env.PORT} (${env.NODE_ENV}, storageMode=in-memory)`
  );
});
