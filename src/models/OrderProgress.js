export const OrderProgress = {
  name: 'OrderProgress',
  primaryKey: 'id',
  properties: {
    id: 'int',
    project: 'int',
    vehicle: 'int',
    vehicle_code: 'string',
    vehicle_name: 'string',
    vehicle_driver: 'string',
    vehicle_driver_name: 'string',
    work_order: 'int',
    time_controls: 'TimeControl[]',
    fuel_controls: 'FuelControl[]',
    non_working_hours: 'NonWorkingHours[]',
    months: 'Month[]',
    is_uploaded: { type: 'bool', default: true },
  },
};