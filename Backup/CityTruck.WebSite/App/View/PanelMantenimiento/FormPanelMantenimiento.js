Ext.define("App.View.PanelMantenimiento.FormPanelMantenimiento", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Solicitudes de Mantenimiento",
    cargarStores: true,
    initComponent: function () {
        var me = this;
            me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.txta_descripcionProblema = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            // colspan: 2,
            height: 200,
            maxLength: 300,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOL_MAN",
            hidden: true,
        });
     /*   me.txt_numeroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",
            maxLength: 10,
            disabled:true
        });

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });*/
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            hidden: true
        });
        me.items = [
        me.txt_id,
        me.txta_descripcionProblema,
        me.txt_estado
     /*   me.txt_numeroSolicitud,
        me.txt_estado,*/
        ];


    },
});
