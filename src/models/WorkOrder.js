export const WorkOrder = {
  name: 'WorkOrder',
  primaryKey: 'id',
  properties: {
    id: 'int',
    order_number: 'string',
    road_master: 'int',
    project: 'int',
    project_name: 'string',
    status: 'string',
    status_str: 'string',
    observations: 'string?',
    distances_by_work: 'DistanceByWork[]',
    hours_by_vehicle: 'HourByVehicle[]',
    order_progress: 'OrderProgress[]',
    created_date: 'date',
    modified_date: 'date',
  },
};