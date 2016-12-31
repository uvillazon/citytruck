Ext.define("App.View.Puntos.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormSaldoInicialMN") {
            me.title = "Formulario de Saldo Inicial MN";
            me.CargarFormSaldoInicialMN();

        }
//        else if (me.opcion == 'formResumen') {
//            me.title = "Resumen";
//            me.CargarFormResumen();
//        }
        else {
            Ext.Msg.alert("Error", "Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    CargarFormSaldoInicialMN: function () {
        var me = this;
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField: 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });

        me.num_saldo_actual = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Actual",
            name: "SALDO",
            readOnly: false,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.items = [
            me.cbx_combustible,
            me.num_saldo_actual
        ];
    }
});
