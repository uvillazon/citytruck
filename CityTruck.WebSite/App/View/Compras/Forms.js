Ext.define("App.View.Compras.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formDetalle") {
            me.title = "Formulario Detalle de Compras";
            me.CargarFormDetalle();

        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        this.callParent(arguments);
    },
    CargarFormDetalle : function(){
        var me = this;
        me.txt_detalle = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Detalle",
            name: "DETALLE",
            width: 480,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
         me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.items = [
            me.txt_detalle,
            me.num_importe
        ];
    },
    CargarFormResumen: function () {
        var me = this;
        var label1 = Ext.create("Ext.form.Label", {
            text: 'TOTAL CONSUMO',
            cls : 'resaltarAzul',
            colspan : 3

        });
        var label2 = Ext.create("Ext.form.Label", {
            text: 'DIESEL',
            cls : 'resaltarAzulRight',
        });
        var label3 = Ext.create("Ext.form.Label", {
            text: 'GASOLINA',
            cls : 'resaltarAzul',
        });
        me.txt_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "CANTIDAD",
            name: "CANTIDAD_DIESEL",
        });
        me.txt_cant_diesel = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "CANTIDAD_GASOLINA",
        });
        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "IMPORTE",
            name: "IMPORTE_DIESEL"
        });
        me.txt_imp_diesel = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "IMPORTE_GASOLINA"
        });
        
        var label01 = Ext.create("Ext.form.Label", {
            text: 'COMPRAS COMBUSTIBLE (Lts.)',
            cls : 'resaltarAzul',
            colspan : 3

        });
        var label02 = Ext.create("Ext.form.Label", {
            text: 'DIESEL',
            cls : 'resaltarAzulRight',
        });
        var label03 = Ext.create("Ext.form.Label", {
            text: 'GASOLINA',
            cls : 'resaltarAzul',
        });
        
        me.txt_asignacion = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "ASIGNACION",
            name: "CANTIDAD_DIESEL",
        });
        me.txt_asignacion_gas = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "CANTIDAD_GASOLINA",
        });
        me.txt_adicional = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "ADICIONAL",
            name: "IMPORTE_DIESEL"
        });
        me.txt_adicional_diesel = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "IMPORTE_GASOLINA",
            
        });
         me.txt_total = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "TOTAL",
            name: "TOTAL_DIESEL"
        });
        me.txt_total_diesel = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_GASOLINA"
        });

        var label04 = Ext.create("Ext.form.Label", {
            text: 'COMPRAS COMBUSTIBLE (Bs.)',
            cls : 'resaltarAzul',
            colspan : 3,

        });
        var label05 = Ext.create("Ext.form.Label", {
            text: 'DIESEL',
            cls : 'resaltarAzulRight',
        });
        var label06 = Ext.create("Ext.form.Label", {
            text: 'GASOLINA',
            cls : 'resaltarAzul',
        });
        
        me.txt_asignacion1 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "ASIGNACION",
            name: "CANTIDAD_DIESEL",
        });
        me.txt_asignacion_gas1 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "CANTIDAD_GASOLINA",
        });
        me.txt_adicional1 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "ADICIONAL",
            name: "IMPORTE_DIESEL"
        });
        me.txt_adicional_diesel1 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "IMPORTE_GASOLINA"
        });
         me.txt_total1 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "TOTAL",
            name: "TOTAL_DIESEL"
        });
        me.txt_total_diesel1 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_GASOLINA"
        });

        me.items = [
//        label1,
//        label2,
//        label3,
//        me.txt_cantidad,
//        me.txt_cant_diesel,
//        me.txt_importe,
//        me.txt_imp_diesel,
        label01,
        label02,
        label03,
        me.txt_asignacion,
        me.txt_asignacion_gas,
        me.txt_adicional,
        me.txt_adicional_diesel,
        me.txt_total,
        me.txt_total_diesel,
        {
            xtype : 'component',
            height: 50,
            colspan : 3
                    
        },
        label04,
        label05,
        label06,
        me.txt_asignacion1,
        me.txt_asignacion_gas1,
        me.txt_adicional1,
        me.txt_adicional_diesel1,
        me.txt_total1,
        me.txt_total_diesel1
        ];
    }
});
