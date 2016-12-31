Ext.define("App.View.Tanques.FormAjustarTanque", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    initComponent: function () {
        var me = this;
        if(me.opcion == ''){
            me.CargarComponentes();
            me.cargarEventos();
        }
        else if (me.opcion == 'FormEditarAjuste' ){
            me.CargarFormEditarAjuste();
//            me.EventosFormEditarFactura();
        }
        this.callParent(arguments);
    },
    CargarEditarAjuste: function(tanque , combustible){
        var me = this;
        me.tanque = tanque;
//        me.loadRecord(venta);
        me.loadFormulario('Combustibles','ObtenerAjuste',{FECHA : me.tanque.get('FECHA') , ID_COMBUSTIBLE : combustible});
        me.date_fecha.setValue(me.tanque.get('FECHA'));
        me.cbx_combustible.setValue(combustible);
        me.date_fecha.setReadOnly(true);
        me.cbx_combustible.setReadOnly(true);
    },
    CargarEditarAjusteMN: function(tanque , combustible){
        var me = this;
        me.tanque = tanque;
//        me.loadRecord(venta);
        me.loadFormulario('Combustibles','ObtenerAjusteMN',{FECHA : me.tanque.get('FECHA') , ID_COMBUSTIBLE : combustible});
        me.date_fecha.setValue(me.tanque.get('FECHA'));
        me.cbx_combustible.setValue(combustible);
        me.date_fecha.setReadOnly(true);
        me.cbx_combustible.setReadOnly(true);
    },
    CargarFormEditarAjuste : function(){
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_AJUSTE",
            hidden : true
        });
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Comprobante",
            readOnly: true,
            name: "NRO_COMP"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField : 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{DESCRIPCION}" }
        });
        me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "CANTIDAD",
            allowDecimals: false,
            allowNegative: true,
            minValue: -999999999,
//            readOnly : true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_obs = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            width: 480,
            name: "OBSERVACION"
        });
        me.items = [
            me.txt_id,
            me.txt_nro_cmp,
            me.date_fecha,
            me.cbx_combustible,
            me.num_litros,
            me.txt_obs

        ];
    },
    CargarComponentes: function () {
        var me = this;
        
        me.gridAjuste = Ext.create('App.View.Tanques.Grids', {
            opcion: 'GridAjustesPos',
            width: 250,
            height: 250
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total",
            readOnly: true,
            name: "TOTAL"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            readOnly: true,
        });
        //        me.gridAjuste.getStore().load();
        me.items = [me.date_fecha,me.gridAjuste, me.txt_total];
        //        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
        //            fieldLabel: "Nro Ajuste",
        //            readOnly: true,
        //            name: "NRO_AJUSTE"

        //        });

        //        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        //        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
        //            fieldLabel: "Combustible",
        //            name: "ID_COMBUSTIBLE",
        //            displayField: 'NOMBRE',
        //            valueField: 'ID_COMBUSTIBLE',
        //            store: me.store_combustible,
        //            colspan: 2,
        //            afterLabelTextTpl: Constantes.REQUERIDO,
        //            allowBlank: false,
        //            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        //        });

        //        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
        //            fieldLabel: "Fecha",
        //            name: "FECHA",
        //            afterLabelTextTpl: Constantes.REQUERIDO,
        //            allowBlank: false
        //        });

        //        me.num_saldo_actual = Ext.create("App.Config.Componente.NumberFieldBase", {
        //            fieldLabel: "Saldo Actual",
        //            name: "SALDO",
        //            readOnly: true,
        //            allowDecimals: true,
        //            maxValue: 999999999
        //        });

        //        me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
        //            fieldLabel: "Cantidad",
        //            name: "CANTIDAD",
        //            allowDecimals: false,
        //            allowNegative: true,
        //            minValue: -99999999,
        //            maxValue: 999999999
        //        });

        //        me.num_nuevo_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
        //            fieldLabel: "Nuevo Saldo",
        //            name: "NUEVO_SALDO",
        //            readOnly: true,
        //            allowDecimals: true,
        //            maxValue: 999999999
        //        });

        //        me.txt_obs = Ext.create("App.Config.Componente.TextAreaBase", {
        //            fieldLabel: "Observaciones",
        //            width: '90%',
        //            name: "OBSERVACION"

        //        });

        //        me.items = [
        //            me.txt_nro_cmp,
        //            me.cbx_combustible,
        //            me.date_fecha,
        //            me.num_saldo_actual,
        //            me.num_cantidad,
        //            me.num_nuevo_saldo,
        //            me.txt_obs
        //        ];



    },
    cargarEdtiar: function (venta) {
        var me = this;
        me.date_fecha.setValue(venta.get('FECHA'));
        me.date_fecha.setReadOnly(true);
        me.venta = venta;
    },
    cargarEventos: function () {
        var me = this;
        //        me.gridAjuste.
        me.gridAjuste.getStore().on('load', function (str, records, success) {
            //            alert("entro Credito");
            if (!success) {
                str.removeAll();
                Ext.Msg.alert("Error", "Ocurrio algun Error Informar a TI.");
            }
            else {
                me.CargarTotales();
            }
        });
        me.gridAjuste.on('edit', function (editor, e) {

            if (e.field == "AJUSTE") {
                me.CargarTotales();
            }
        });
    },
    CargarTotales: function () {
        var me = this;
        var total = 0;
        me.gridAjuste.getStore().each(function (record) {
            total = total + record.get('AJUSTE');
        });
        me.txt_total.setValue(total);
    },
    VerReporteAjuste: function () {
        var me = this;
        if (me.txt_id.getValue() == 0) {
            Ext.Msg.alert("Error", "Seleccione un Registro que tenga Ajuste");
        }
        else {
            window.open(Constantes.HOST + 'ReportesPDF/ReporteAjuste?ID=' + me.txt_id.getValue());
//             window.open(Constantes.HOST + 'ReportesPDF/ReporteIngreso?ID=' + id);
        }
    }
});
