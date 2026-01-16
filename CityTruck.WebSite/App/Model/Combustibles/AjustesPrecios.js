Ext.define('App.Model.Combustibles.AjustesPrecios', {
    extend: 'Ext.data.Model',
    fields: [
           { type: "int",    name: "ID_AJUSTE" },
        { type: "int",    name: "ID_COMBUSTIBLE" },

        // Tipo de precio: 'V' = Venta, 'C' = Compra
        { type: "string", name: "TIPO" },

        { type: "float",  name: "PRECIO" },
        { type: "float",  name: "PRECIO_ANTERIOR" },

        /* ===== FECHAS (todas con el mismo formato y convert) ===== */
        { type: "date", name: "FECHA_VIG_DESDE", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_VIG_HASTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_ALTA",      dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_BAJA",      dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_REG",       dateFormat: "d/m/Y", convert: Funciones.Fecha },

        { type: "int",    name: "ID_USUARIO" },
        { type: "string", name: "ESTADO" },
        { type: "string", name: "OBSERVACION" }
        ]
});