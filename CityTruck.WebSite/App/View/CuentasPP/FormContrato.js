Ext.define("App.View.CuentasPP.FormContrato", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    defaults: {
        width: 350
    },
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },

    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_CONTRATO"

        });
        me.txt_nro_comp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Comprobante",
            //            readOnly : true,
            name: "NRO_COMP",
            readOnly : true,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
            width: 200

        });

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.date_fecha_ven = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Vencimiento",
            name: "FECHA_VENCIMIENTO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_cliente = Ext.create('App.Store.CuentasPP.Clientes');
        me.cbx_cliente = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Cliente",
            name: "ID_CLIENTE",
            displayField: 'RAZON_SOCIAL',
            valueField: 'ID_CLIENTE',
            store: me.store_cliente,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{RAZON_SOCIAL}" }
        });

        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe (Bs)",
            name: "IMPORTE",
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_respaldo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Comp. Resplado",
            name: "COMPROBANTE_RES",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });

        me.txt_glosa = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Glosa",
            name: "GLOSA",
            width: 240,
            height : 50
        });

        me.txt_observaciones = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACIONES",
            width: 240,
            height: 50
        });

        me.items = [
            me.txt_id,
            me.txt_nro_comp,
            me.date_fecha,
            me.cbx_cliente,
            me.num_importe,
            me.txt_respaldo,
            me.txt_glosa,
            me.txt_observaciones
        ];



    },
    cargarCliente: function (id_cliente) {

    }
});
