# cpanel-zone-file

> Export DNS Zone from Cpanel

## Install

```
$ npm install cpanel-zone-file
```

## Usage

```js
import cpanelZoneFile from 'cpanel-zone-file';
import cpanelZoneData from 'cpanel-api-response';

// Simple
cpanelZoneExport(cpanelZoneData);

// Specify domain
cpanelZoneExport(cpanelZoneData, {domain: 'example.com'});
```

## API

### cpanelZoneFile(json, options?)

#### json

Type: `Object`

JSON data from Cpanel

#### options

Type: `object`

##### domain

Type: `string`\
Default: `''`

Specify a domain for the zone file

##### datetime

Type: `string`\
Default: `new Date().toISOString()`

Specify a datetime for the zone file, defaults to current date
