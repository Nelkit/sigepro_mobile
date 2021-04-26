export const HourByVehicle = {
  name: 'HourByVehicle',
  primaryKey: 'id',
  properties: {
    id: 'int',
    hours: 'int',
    subtotal: 'string',
    vehicle_data: 'Vehicle',
  },
};