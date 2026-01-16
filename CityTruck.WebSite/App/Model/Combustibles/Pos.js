Ext.define('App.Model.Combustibles.Pos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int",    name: "ID_POS" },
        { type: "int",    name: "ID_COMBUSTIBLE" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "COMBUSTIBLE" },

        { type: "float",  name: "LITTER_ACT_MN" },
        { type: "float",  name: "ENT_LITTER_INI" },
        { type: "float",  name: "ENT_LITTER_INI_MN" },
        { type: "float",  name: "LITTER_ACT" },

        { type: "string", name: "ESTADO" },

        { type: "float",  name: "LECTURA_ANTERIOR" },
        { type: "int",    name: "MEDIDOR_DECIMALES" },
        { type: "float",  name: "MEDIDOR_MAX_VALOR" },
        { type: "string", name: "MEDIDOR_ROLLOVER" }, // 'S' / 'N'

        { type: "int",    name: "ROLLOVER_CONTADOR" },
        { type: "float",  name: "ACUMULADO_TOTAL" }
    ]
});
