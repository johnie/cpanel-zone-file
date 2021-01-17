import {readFile} from 'fs';
import {promisify} from 'util';
import test from 'ava';
import cpanelZoneExport from './index.js';
import * as util from './lib/utils.js';

const readFileAsync = promisify(readFile);

test.beforeEach(async (t) => {
  t.context.data = await readFileAsync('./testZoneResponse.json', 'utf8');
  t.context.validZoneFile = await readFileAsync('./validZoneFile.txt', 'utf8');
});

test('Example zone response', (t) => {
  const records = util.getRecorsFromData(t.context.data);

  t.is(typeof records, 'object');
  t.is(records.length, 20);
});

test('Group records by type', (t) => {
  const exampleRecords = [
    {
      class: 'IN',
      ttl: '14400',
      name: 'example.com.',
      type: 'A',
      record: '193.111.10.1',
      address: '193.111.10.1'
    },
    {
      type: 'CNAME',
      record: 'example.com',
      cname: 'example.com',
      class: 'IN',
      name: 'www.example.com.',
      ttl: '14400'
    },
    {
      type: 'CNAME',
      record: 'd.example.com',
      cname: 'd.example.com',
      class: 'IN',
      name: 'www.example.com.',
      ttl: '14400'
    }
  ];
  const group = util.groupByType(exampleRecords, 'type');

  t.deepEqual(group, {
    A: [
      {
        class: 'IN',
        ttl: '14400',
        name: 'example.com.',
        type: 'A',
        record: '193.111.10.1',
        address: '193.111.10.1'
      }
    ],
    CNAME: [
      {
        type: 'CNAME',
        record: 'example.com',
        cname: 'example.com',
        class: 'IN',
        name: 'www.example.com.',
        ttl: '14400'
      },
      {
        type: 'CNAME',
        record: 'd.example.com',
        cname: 'd.example.com',
        class: 'IN',
        name: 'www.example.com.',
        ttl: '14400'
      }
    ]
  });
});

test('Compose functions', (t) => {
  const lowercase = (string) => string.toLowerCase();
  const capitalize = (string) =>
    `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
  const reverse = (string) => string.split('').reverse().join('');

  const fn = util.pipe(lowercase, capitalize, reverse);

  t.is(fn('Hello World'), 'dlrow olleH');
});

test('Generate zone file', (t) => {
  const zoneFile = cpanelZoneExport(t.context.data, {
    domain: 'example.com',
    datetime: '2021-01-17T15:56:20.796Z'
  });

  t.is(zoneFile, t.context.validZoneFile);
});
