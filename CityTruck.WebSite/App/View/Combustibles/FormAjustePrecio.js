Ext.define("App.View.Combustibles.FormAjustePrecio", {
    extend: "App.Config.Abstract.Form",
    columns: 1,

    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },

    CargarStore: function () {
        var me = this;
        if (me.store_tipo) me.store_tipo.load();
    },

    CargarComponentes: function () {
        var me = this;

        // Oculto
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_AJUSTE"
        });

        // Oculto
        me.txt_id_comb = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            readOnly: true,
            name: "ID_COMBUSTIBLE"
        });

        // Visible solo lectura
        me.txt_combustible = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Combustible",
            name: "COMBUSTIBLE",
            readOnly: true
        });

        // Tipo: VENTA / COMPRA (en mayúscula)
        me.store_tipo = Ext.create('Ext.data.Store', {
            fields: ['ID', 'NOMBRE'],
            data: [
                { ID: 'V', NOMBRE: 'VENTA' },
                { ID: 'C', NOMBRE: 'COMPRA' }
            ]
        });

        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            displayField: 'NOMBRE',
            valueField: 'ID',
            store: me.store_tipo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            editable: false,
            forceSelection: true,
            textoTpl: function () { return "{NOMBRE}"; }
        });

        me.num_precio = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Precio",
            name: "PRECIO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            allowDecimals: true,
            decimalPrecision: 5,
            minValue: 0,
            maxValue: 999999999
        });

        me.date_desde = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Vigente Desde",
            name: "FECHA_VIG_DESDE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.date_hasta = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Vigente Hasta",
            name: "FECHA_VIG_HASTA",
            allowBlank: true
        });

        me.txt_obs = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observación",
            name: "OBSERVACION",
            width: 300,
            height: 60,
            maxLength: 500
        });

        me.items = [
            me.txt_id,
            me.txt_id_comb,
            me.txt_combustible,
            me.cbx_tipo,
            me.num_precio,
            me.date_desde,
            me.date_hasta,
            me.txt_obs
        ];
    },

    cargarEventos: function () {
        var me = this;
        // Si luego quieres eventos (validar fechas, etc.) se agregan aquí
    },

    // Para setear combustible desde un grid
    setCombustible: function (idComb, nombreComb) {
        var me = this;
        me.txt_id_comb.setValue(idComb);
        me.txt_combustible.setValue(nombreComb);
    },

    habilitarFormulario: function (habilitar, crear) {
        var me = this;

        // Campos que NO deberían editarse (solo lectura/ocultos)
        var fieldsBloqueados = new Array('ID_AJUSTE', 'ID_COMBUSTIBLE', 'COMBUSTIBLE');

        Funciones.BloquearFormulario(me, new Array('docked_modificar', 'docked_eliminar', 'docked_comprobante'));

        if (habilitar) {
            // Lo que sí se puede editar
            var fieldsEditables = new Array('TIPO', 'PRECIO', 'FECHA_VIG_DESDE', 'FECHA_VIG_HASTA', 'OBSERVACION');
            if (!crear) {
                // si en edición NO quieres cambiar la fecha desde, puedes comentar la siguiente línea
                // fieldsEditables = Ext.Array.remove(fieldsEditables, 'FECHA_VIG_DESDE');
            }
            Funciones.DesbloquearFormulario(me, fieldsEditables, true);
        }
    }
});
