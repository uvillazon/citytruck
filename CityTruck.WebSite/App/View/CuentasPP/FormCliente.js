Ext.define("App.View.CuentasPP.FormCliente", {
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
            name: "ID_CLIENTE"

        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "C\u00F3digo",
            //            readOnly : true,
            name: "CODIGO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 350

        });

        me.txt_razon = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Razon Social",
            name: "RAZON_SOCIAL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 350
        });

        me.num_nit = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "NIT",
            name: "NIT",
            maxValue: 999999999999999,
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 350
        });

        me.txt_contacto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Contacto",
            name: "CONTACTO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 350
        });

        me.txt_email = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Email",
            name: "EMAIL",
            width: 350
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false
        });

        me.txt_telf = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tel\u00E9fono",
            name: "TELEFONO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 350
        });

        me.txt_dir = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direcci\u00F3n",
            name: "DIRECCION",
            allowBlank: false,
            width: 350
        });

        me.txt_observaciones = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACIONES",
            width: 350
        });

        me.items = [
            me.txt_id,
            me.txt_codigo,
            me.txt_razon,
            me.num_nit,
            me.txt_contacto,
            me.txt_telf,
            me.txt_email,
            me.txt_dir,
            me.txt_observaciones
        ];



    }
});
