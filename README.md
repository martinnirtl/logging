# Logging Utility

Opinionated logging utility for unified logging in distributed systems based on winston.

- [Logging Utility](#logging-utility)
- [Install](#install)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Logging Middlewares](#logging-middlewares)
    - [Express](#express)

# Install

Install via `npm`:

```
npm install --save @martinnirtl/logging
```

Or `yarn`:

```
yarn add @martinnirtl/logging
```

# Configuration

Programmatically configure library:

```javascript
import logger, { setDefaults } from '@martinnirtl/logging'

setDefaults({
  level: 'warn',
  metadata: { service: 'foo-service' },
  prettyPrint: process.env.NODE_ENV !== 'production',
})

logger.info('hello world') // will not be printed
```

Or use environment variables:

```env
# Specify log-level (default: info, options: [silly, debug, info, warn, error])
LOG_LEVEL=debug

# Add metadata tags with `LOG_METADATA_`-prefix, e.g. set { service: 'foo-service' }
LOG_METADATA_SERVICE=foo-service

# Pretty-print json-logs on truthy value (default: false)
LOG_PRETTY=true

# Silent logger on truthy value (default: false)
LOG_SILENT=0
```

# Usage

Singleton pattern:

```javascript
import logger, { setDefaults } from '@martinnirtl/logging'

setDefaults({
  level: 'debug',
  metadata: { 'process-id': process.pid },
})

logger.debug('just set the logger-defaults')

logger.info('starting application...', { date: new Date() })
```

Or dedicated loggers:

```javascript
import { getLogger, setDefaults } from '@martinnirtl/logging'

setDefaults({
  level: 'debug',
  metadata: { service: 'foo-service' },
})

const logger = getLogger({
  metadata: { context: 'initialization' },
})

logger.info('starting application...', { date: new Date() })
```

## Logging Middlewares

The lib also ships middlewares to optimally integrate into popular 3rd party frameworks.

At the moment, only the express framework is supported.

### Express

The express middleware allows to add a logger instance to every request-handler. Also it enables logging of incoming requests plus automatic request-`body|headers|query|params` to logging object's metadata mapping.

```javascript
const { getLogger, middleware, setDefaults } = require('@martinnirtl/logging')
const express = require('express')

setDefaults({
  level: 'debug', // default 'info'
})

const logger = getLogger({
  metadata: { context: 'init' },
})

const app = express()

app.use(middleware('express', {
  addToRequestObject: true, // default true
  logIncoming: {
    level: "debug", // default 'info'
    metadata: {
      body: true, // add body as a whole
      headers: ['host'], // add host field of headers to metadata
    }
  }
}))

app.all('/', (req, res) => {
  req.logger.debug('it works!')

  return res.status(200).send('Hello World')
})

app.listen(3000, () => logger.info(`app listening on port 3000`))

```

