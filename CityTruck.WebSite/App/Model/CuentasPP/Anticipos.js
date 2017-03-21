Ext.define('App.Model.CuentasPP.Anticipos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
               { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_ANTICIPO" },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_CONTRATO" },
            { type: "int", name: "ID_EGRESO" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "NRO_COMP" },
            { type: "float", name: "IMPORTE_BS" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "GLOSA" },
            { type: "string", name: "CONCEPTO" }
    ]
});