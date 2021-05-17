export const FuelControl = {
  name: 'FuelControl',
  primaryKey: 'id',
  properties: {
    id: 'int',
    order_progress: 'int',
    day: 'int',
    month: 'string',
    year: 'string',
    quantity: 'int',
    price: 'string',
    is_uploaded: { type: 'bool', default: true },
  },
};