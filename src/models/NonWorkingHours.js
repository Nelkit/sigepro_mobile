export const NonWorkingHours = {
  name: 'NonWorkingHours',
  primaryKey: 'id',
  properties: {
    id: 'int',
    project_progress: 'int',
    day: 'int',
    month: 'string',
    year: 'string',
    reason: 'string',
    reason_str: 'string',
    observations: 'string?',
    hours: 'int',
    is_uploaded: { type: 'bool', default: true },
  },
};