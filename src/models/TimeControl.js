export const TimeControl = {
  name: 'TimeControl',
  primaryKey: 'id',
  properties: {
    id: 'int',
    project_progress: 'int',
    day: 'int',
    month: 'string',
    year: 'string',
    initial_hourmeter: 'int',
    hours: 'int',
    other_works: 'string?',
    final_hourmeter: 'int'
  },
};