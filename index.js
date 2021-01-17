import {
  groupByType,
  getRecorsFromData,
  pipe,
  recordsFormat,
  zoneFile
} from './lib/utils.js';

const cpanelZoneFile = (json, {domain, datetime} = {}) => {
  const records = getRecorsFromData(json);
  const filterTypes = (data) =>
    data.filter((item) => Object.keys(recordsFormat).includes(item.type));
  const group = (data) => groupByType(data, 'type');
  const getEntries = (data) => Object.entries(data);
  const formatSections = ([type, records]) =>
    recordsFormat.formatSection(type, records);
  const generateSection = (data) =>
    data.map((records) => formatSections(records)).join('\n');
  const composeRecords = pipe(filterTypes, group, getEntries, generateSection);

  return zoneFile(domain, datetime, composeRecords(records));
};

export default cpanelZoneFile;
