Ext.define('App.Model.Transferencias.Transferencias', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE_BS" },
            { type: "int", name: "ID_TRANSFERENCIA" },
            { type: "int", name: "ID_CAJA_ORIGEN" },
            { type: "int", name: "ID_CAJA_DESTINO" },
            { type: "int", name: "NRO_COMP" },
            { type: "string", name: "CAJA_ORIGEN" },
            { type: "string", name: "CAJA_DESTINO" },
            { type: "string", name: "CONCEPTO" }
        ]
});