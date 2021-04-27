export const NonWorkingHours = {
  name: 'NonWorkingHours',
  primaryKey: 'id',
  properties: {
    id: 'int',
    remoteId: { type: 'int', default: 0 },
    project_progress: 'int',
    day: 'int',
    month: 'string',
    year: 'string',
    reason: 'string',
    reason_str: 'string',
    observations: 'string?',
    hours: 'int',
    isUploaded: { type: 'bool', default: true },
  },
};