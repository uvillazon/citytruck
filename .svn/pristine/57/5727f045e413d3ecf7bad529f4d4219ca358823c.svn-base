Ext.define("App.View.OrdenesOperacion.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
     if (me.opcion == "secuencia") {
            me.columns = 2;
            me.CargarFormCrearSecuencia();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormCrearSecuencia: function () {
        var me = this;
        me.txt_id_sec = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SEC",
            hidden: true

        });
        me.txt_id_oo = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OO",
            hidden: true

        });
        me.txt_hora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Hora",
            name: "HORA",
            vtype: 'Hora',
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txta_descripcionManiobra = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion Maniobra",
            name: "DESCRIP_MANIOBRA",
         //   width: 980,
            maxLength: 250,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Código",
            name: "CODIGO",
            maxLength: 50,
            // colspan: 2
        });
        me.txt_operador = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Operador",
            name: "OPERADOR",
            maxLength: 50,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
      /*  me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ESTADO",
            // hidden: true,
        });
        me.txt_nroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",

        });*/

        me.items = [
            me.txt_id_sec,
            me.txt_id_oo,
            me.txt_hora,
            me.txt_codigo,
            me.txt_operador,
            me.txta_descripcionManiobra,
        ];
    },
    CargarDatos: function (record) {
        var me = this;
        me.getForm().reset();
        me.getForm().loadRecord(record);
    },
});
