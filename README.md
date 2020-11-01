# Logging Utility

Opinionated logging utility for unified logging in distributed systems based on winston.

## Install

Install via `npm`:

```
npm install --save @martinnirtl/logging
```

Or `yarn`:

```
yarn add @martinnirtl/logging
```

## Configuration

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

## Usage

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
