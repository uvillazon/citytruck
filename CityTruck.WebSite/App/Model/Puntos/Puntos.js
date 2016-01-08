Ext.define('App.Model.Puntos.Puntos', {
    extend: 'Ext.data.Model',
    fields: [
//            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            {type: "int", name: "ID_POS" },
            { type: "string", name: "COMBUSTIBLE" },
            { type: "string", name: "CODIGO" },
            { type: "float", name: "PRECIO_VENTA" },
            { type: "float", name: "PRECIO_COMPRA" },
            { type: "int", name: "ID_COMBUSTIBLE" }
        ]
});