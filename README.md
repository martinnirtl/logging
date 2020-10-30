# Logging Utility

Preconfigured logging utility for microservices based on winston.

## Install

Install via `npm`:

```
npm install --save @cubehotels/logging
```

Or `yarn`:

```
yarn add @cubehotels/logging
```

## Configuration

Programmatically configure library:

```javascript
import logger, { setDefaults } from '@cubehotels/logging'

setDefaults({
  level: 'warn',
})

logger.info('hello world') // will not be printed
```

Or use environment variables:

```env
# Specify log-level (default: info, levels: [silly, debug, info, warn, error])
LOG_LEVEL=debug

# Pretty-print json-logs on truthy value (default: false)
LOG_PRETTY=true

# Silent logger on truthy value (default: false)
LOG_SILENT=1
```

## Usage

Singleton pattern:

```javascript
import logger, { setDefaults } from '@cubehotels/logging'

setDefaults({
  level: 'debug',
  meta: { service: 'mail-service' },
})

logger.debug('just set the logger-defaults')

logger.info('starting application...', { date: new Date() })
```

Or dedicated loggers:

```javascript
import { getLogger, setDefaults } from '@cubehotels/logging'

setDefaults({
  level: 'debug',
  meta: { service: 'mail-service' },
})

const logger = getLogger({
  meta: { context: 'initialization' },
})

logger.debug('just set the logger-defaults')

logger.info('starting application...', { date: new Date() })
```
