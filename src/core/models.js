const chartValues = {
  name: 'ChartValues',
  properties: {
    y: {type: 'double', optional: true},
    value: {type: 'double', optional: true},
    label: 'string',
    marker: {type: 'string', optional: true},
  },
};

const fideicomisoChart = {
  name: 'FideicomisoChart',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    type: 'string',
    year: 'string',
    values: 'ChartValues[]',
  },
};

const typeFideicomiso = {
  name: 'TypeFideicomiso',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    type: 'string',
    year: 'string',
    last_update: 'string',
  },
};

const fideicomiso = {
  name: 'Fideicomiso',
  primaryKey: 'id',
  properties: {
    id: 'string',
    id_fide: 'int',
    type: 'string',
    descripcion: 'string',
    fecha_sis: 'string',
    year: {type: 'string', optional: true},
    abreviatura: {type: 'string', optional: true},
    desembolsado: 'string',
    asignado: 'string',
    ejecutado: 'string',
    disponible: {type: 'string', optional: true},
    pendiente: {type: 'string', optional: true},
    porcentaje_ejecucion: 'int',
    porcentaje_asignado: 'int',
    porcentaje_desembolso: {type: 'int', optional: true},
  },
};

const components = {
  name: 'Component',
  primaryKey: 'id',
  properties: {
    id: 'string',
    id_de: {type: 'int', optional: true},
    id_fide: 'int',
    descripcion: 'string',
    year: {type: 'string', optional: true},
    abreviatura: {type: 'string', optional: true},
    desembolsado: 'string',
    asignado: 'string',
    ejecutado: 'string',
    disponible: {type: 'string', optional: true},
    pendiente: {type: 'string', optional: true},
    porcentaje_ejecucion: 'int',
    porcentaje_asignado: {type: 'int', optional: true},
    porcentaje_desembolso: {type: 'int', optional: true},
  },
};

const fideicomisoDetail = {
  name: 'FideicomisoDetail',
  primaryKey: 'id',
  properties: {
    id: 'string',
    id_fide: 'int',
    descripcion: 'string',
    values: 'ChartValues[]',
    components: 'Component[]',
  },
};

const profile = {
  name: 'Profile',
  primaryKey: 'id',
  properties: {
    id: 'int',
    username: 'string',
    first_name: 'string',
    last_name: 'string',
    email: 'string',
  },
};

const macrosChart = {
  name: 'MacrosChart',
  primaryKey: 'IdMacro',
  properties: {
    IdMacro: 'int',
    Macro: 'string',
    TipoValor: 'string',
    ValorActual: 'string',
    Estado: 'int',
    id_sector: 'int',
    tipo_graph: 'string',
    Color: 'string',
    Values: 'ChartValues[]',
  },
};

const sefinChart = {
  name: 'SefinChart',
  primaryKey: 'IdMacro',
  properties: {
    IdMacro: 'int',
    Macro: 'string',
    TipoValor: 'string',
    Estado: 'int',
    id_sector: 'int',
    tipo_graph: 'string',
    Values: 'ChartValues[]',
    Values2: 'ChartValues[]',
  },
};

const sectorIndicador = {
  name: 'SectorIndicador',
  primaryKey: 'id_sector',
  properties: {
    id_sector: 'int',
    sector: 'string',
    fecha_sis: 'string',
    usuario_sis: 'int',
  },
};

const programas = {
  name: 'Programas',
  primaryKey: 'id_programa',
  properties: {
    id_programa: 'int',
    id_sector: 'int',
    porcentaje: 'string',
    descripcion_programa: 'string',
  },
};

const sectores = {
  name: 'Sectores',
  primaryKey: 'id_sector',
  properties: {
    id_sector: 'int',
    descripcion_sector: 'string',
    color: 'string',
    img_sector: 'string',
    programas: 'Programas[]',
  },
};

const indicadores = {
  name: 'Indicadores',
  primaryKey: 'id_indicador',
  properties: {
    id_indicador: 'int',
    id_programa: 'int',
    nombre_indicador: 'string',
    alcance: 'int',
    unidad: 'string',
    avance: 'double',
    porcentaje: 'string',
    fecha_inicio: 'date',
    fecha_vence: 'date',
    total_dias: 'int',
    estado_indicador: 'int',
  },
};

const avances = {
  name: 'Avances',
  primaryKey: 'id_avance',
  properties: {
    id_avance: 'int',
    cantidad: 'string',
    fecha: 'date',
    id_indicador: 'int',
    indicador: 'string',
    fecha_ingreso: 'date',
  },
};


module.exports = {
  chartValues,
  fideicomisoChart,
  typeFideicomiso,
  fideicomiso,
  components,
  fideicomisoDetail,
  profile,
  macrosChart,
  sefinChart,
  sectorIndicador,
  programas,
  sectores,
  indicadores,
  avances
};
