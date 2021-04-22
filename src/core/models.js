const WorkOrder = {
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
    created_date: 'date',
    modified_date: 'date',
  },
};


module.exports = {
  WorkOrder,
};