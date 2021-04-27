export const FuelControl = {
  name: 'FuelControl',
  primaryKey: 'id',
  properties: {
    id: 'int',
    remoteId: { type: 'int', default: 0 },
    project_progress: 'int',
    day: 'int',
    month: 'string',
    year: 'string',
    quantity: 'int',
    price: 'string',
    isUploaded: { type: 'bool', default: true },
  },
};