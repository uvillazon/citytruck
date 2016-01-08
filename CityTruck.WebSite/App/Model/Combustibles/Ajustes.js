Ext.define('App.Model.Combustibles.Ajustes', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "AJUSTE" },
            { type: "string", name: "PRODUCTO" },
            { type: "string", name: "CODIGO" },
            { type: "int", name: "ID_POS" },
            { type: "int", name: "ID_AJUSTE" }
        ]
});