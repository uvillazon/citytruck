Ext.define('App.Model.Clientes.ClientesPorPagar', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            {type: "int", name: "ID_CLIENTE" },
            { type: "int", name: "CODIGO" },
            { type: "float", name: "SALDO" },
            { type: "string", name: "RAZON_SOCIAL" },
            { type: "string", name: "NIT" },
            { type: "string", name: "CONTACTO" },
            { type: "string", name: "TELEFONO" },
            { type: "string", name: "DIRECCION" },
            { type: "string", name: "EMAIL" },
            { type: "string", name: "OBSERVACIONES" }
        ]
});