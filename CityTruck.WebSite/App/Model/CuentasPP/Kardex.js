Ext.define('App.Model.CuentasPP.Kardex', {
    extend: 'Ext.data.Model',
    fields: [
           { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_KARDEX" },
            { type: "int", name: "ID_CLIENTE" },
            { type: "int", name: "ID_OPERACION" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "DETALLE" },
            { type: "float", name: "CONTRATO" },
            { type: "float", name: "AMORTIZACION" },
            { type: "float", name: "SALDO" },
            { type: "int", name: "ID_USUARIO" },
            { type: "float", name: "TOTAL_AMOR" },
            { type: "float", name: "TOTAL_CONT" },
            { type: "float", name: "SALDO_CONTRATO" },
            { name: 'SALDO_CONTRATO', mapping: 'SG_CONTRATOS.SALDO', type: 'float' },
            { name: 'RAZON_SOCIAL', mapping: 'SG_CONTRATOS.RAZON_SOCIAL', type: 'string' },
            { name: 'ID_CONTRATO', mapping: 'SG_CONTRATOS.ID_CONTRATO', type: 'int' },
            { name: 'NRO_COMP_CONTRATO', mapping: 'SG_CONTRATOS.NRO_COMP', type: 'int' },
            { name: 'IMPORTE', mapping: 'SG_CONTRATOS.IMPORTE', type: 'float' },
    ]
});