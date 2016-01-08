Ext.define("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", {
    extend: "App.Config.Abstract.Form",
    cargarStores: true,
    botones: false,
    align: 'top',
    hiddentxt_obs : false,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormAprobacion") {
            me.title = "Formulario de Aprobacion de Solicitud";
            me.CargarFormAprobacion();
        }
        else if (me.opcion == "FormRechazo") {
            me.title = "Formulario de Rechazo de Solicitud";
            me.CargarFormRechazo();
        }
        else if (me.opcion == "ReiterarContinuar") {
            me.columns = 1;
            me.title = "Reiterar o Continuar una Solicitud de Mantenimiento";
            me.CargarFormReiterarContinuar();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarFormAprobacion: function () {
        var me = this;
        me.formSolicitud = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", { botones: false, rowspan: 2, cargarStores: false });
        me.formSolicitud.BloquearFormularioReadOnly();
        me.formSolicitudA = Ext.create("App.View.SolicitudesMantenimiento.Forms", { opcion: "FormConfirmacion", botones: true, textGuardar: "Confirmar" });
        me.formSolicitudA.btn_guardar.on('click', me.GuardarConfirmacion, this);
        me.formAprobacion = Ext.create("App.View.SolicitudesMantenimiento.Forms", { opcion: "FormAprobacion" });
        me.items = [
            me.formSolicitud,
            me.formSolicitudA,
            me.formAprobacion
        ];
    },
    CargarFormularioAprobacion: function (record) {
        var me = this;
        me.getForm().reset();
        me.formSolicitud.loadRecord(record);
        me.formSolicitudA.loadRecord(record);
        me.formAprobacion.loadRecord(record);

    },
    GuardarConfirmacion: function () {
        var me = this;
        Ext.MessageBox.confirm('Confirmacion?', "Esta Seguro de Confirmar la Solicitud", function (btn) {
            if (btn == 'yes') {
                //metodo que actualizara el formulario de solicitud
                Funciones.cargarFormDesdeOtroForm(me.formSolicitud, me.formSolicitudA);
                Funciones.AjaxRequestFormSC("SolicitudesMantenimiento", "GrabarSolicitudMantenimientoSP", me, me.formSolicitud, null, null, null);
            }
        });
    },
    CargarFormRechazo: function () {
        var me = this;
        me.formSolicitud = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", { botones: false, rowspan: 2, cargarStores: false });
        me.formSolicitud.BloquearFormulario();
        me.formRechazo = Ext.create("App.View.SolicitudesMantenimiento.Forms", { opcion: "FormRechazo", botones: false });
        me.items = [
            me.formSolicitud,
            me.formRechazo

        ];
    },
    CargarFormularioRechazo: function (record) {
        var me = this;
        me.getForm().reset();
        me.formSolicitud.loadRecord(record);
    },
    CargarFormReiterarContinuar: function () {
        var me = this;
        me.txt_Observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            maxLength: 500,
            height: 70,
            hidden : me.hiddentxt_obs,
            afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false,
        });
        me.grpb_grupoBoton = Ext.create("Ext.form.RadioGroup", {
            colspan: 2,
            width: 480,
            vertical: false,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            items: [
                { boxLabel: 'Reiterar', name: 'duplicado', inputValue: "S" },
                { boxLabel: 'Continuar', name: 'duplicado', inputValue: "N" },

            ]
        });
        me.items = [
            {
                xtype: 'label',
                text: me.msg,
                cls: 'resaltarRojo',
            },
            me.grpb_grupoBoton,
            me.txt_Observacion
        ];
        //me.formAprobacion = Ext.create("App.View.SolicitudesMantenimiento.Forms", { opcion: "FormReiteracionContinuacion" ,msg : me.msg });
        //me.items = [me.formAprobacion];

    }

});
