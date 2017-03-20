Ext.define("App.View.CuentasPP.FormAnticipo", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    
    CargarComponentes: function () {
        var me = this;
        me.txt_id_contrato = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_CONTRATO"

        });

        me.txt_id_cliente = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_CLIENTE"

        });
       
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Comprobante",
            readOnly : true,
            name: "NRO_COMP",

        });

         me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
       
         me.txt_cliente = Ext.create("App.Config.Componente.TextFieldBase", {
             fieldLabel: "Cliente",
             readOnly: true,
             name: "RAZON_SOCIAL",

         });
         me.txt_contrato = Ext.create("App.Config.Componente.TextFieldBase", {
             fieldLabel: "Nro Contrato",
             readOnly: true,
             name: "NRO_COMP_CONTRATO",

         });
   
        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO_CONTRATO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.txt_glosa = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Glosa",
            name: "GLOSA",
            maxLength: 400,
            width: 240,
            //            afterLabelTextTpl: Constantes.REQUERIDO,
            //            allowBlank: false,

        });
  
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE_BS",
            allowDecimals: true,
            maxValue: 999999999
        });

         me.store_cuenta = Ext.create('App.Store.Cajas.Cajas').load();
        me.cbx_cuenta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Caja Saliente",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField : 'ID_CAJA',
            store: me.store_cuenta,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            maxLength: 400,
            width: 240,
//            afterLabelTextTpl: Constantes.REQUERIDO,
//            allowBlank: false,

        });
       
         
        me.items = [
                me.txt_id_contrato,
                me.txt_id_cliente,
                me.txt_nro_cmp,
                me.date_fecha,
                me.txt_cliente,
                me.txt_contrato,
                me.num_saldo,
                me.txt_glosa,
                me.num_importe,
                me.cbx_cuenta,
                me.txt_observacions
        ];
       
      

    },
});
