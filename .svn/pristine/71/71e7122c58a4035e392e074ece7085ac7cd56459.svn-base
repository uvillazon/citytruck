Ext.define("App.View.SolicitudesMantenimiento.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalSolicitudes",
    controlador: 'SolicitudesMantenimiento',
    accionGrabar: 'GrabarSolicitudMantenimientoSP',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            region: 'west',
            width: '45%',
            borrarParametros : true

        });

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearSolicitud', 'Crear', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarSolicitud', 'Editar', Constantes.ICONO_EDITAR, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.form = Ext.create("App.Config.Abstract.FormPanel");

        me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento");
        me.formulario.BloquearFormulario();
        //me.formulario.cmp_derivacion.btn.setDisabled(true);
        //me.formulario.cmp_poste.btn.setDisabled(true);
        me.form.add(me.formulario);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);
        //me.grid.getStore().on('load', function (store, records, successful, operation) {
        //    alert(operation.resultSet.msg);
        //});

    },
    EventosBoton: function (btn, e) {
        var me = this;
        if (btn.getItemId() == "btn_CrearSolicitud") {
            me.formulario.DesbloquearFormulario(["ESTADO", "NUS", "COD_POSTE", "DESC_TIPO", "COD_PUESTO1", "COD_PUESTO", "COD_ELEMENTO_2", "COD_ELEMENTO_1", "NRO_SOL", "DESCRIP_DEF"], true);
            //me.formulario.cmp_derivacion.btn.setDisabled(false);
            //me.formulario.cmp_poste.btn.setDisabled(false);
            me.formulario.LimpiarFormulario();
            me.formulario.BloquearBotones();
            me.formulario.btn_guardar.on('click', me.GuardarSolicitud, this);
        }
        else if (btn.getItemId() == "btn_EditarSolicitud") {//falta verificar que cuando seleccione recien desbloquee
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == "NUEVA") {
                me.formulario.DesbloquearFormulario(["ESTADO", "NUS", "COD_POSTE", "DESC_TIPO", "COD_PUESTO1", "COD_PUESTO", "COD_ELEMENTO_2", "COD_ELEMENTO_1", "NRO_SOL", "DESCRIP_DEF"], true);
                //me.formulario.cmp_derivacion.btn.setDisabled(false);
                //me.formulario.cmp_poste.btn.setDisabled(false);
                me.formulario.BloquearBotones();
                me.formulario.btn_guardar.on('click', me.GuardarSolicitud, this);
            }
            else {
                Ext.MessageBox.alert('Aviso', 'Seleccione un registro  en estado NUEVA para Editar..');
            }

        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
    GuardarSolicitud: function () {
        var me = this; 
        var objeto = null; var id_objeto = 0;
        if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'NUS') {
            if (me.formulario.num_nus.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un POSTE");
            }
            else {
                id_objeto = me.formulario.cmp_codigoPoste.txt_id.getValue();
                cod_objecto = me.formulario.cmp_codigoPoste.txt_detalleComponente.getValue();
            }
        }
        else if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'POSTE') {
            if (me.formulario.cmp_codigoPoste.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un POSTE");
            }
            else {
                id_objeto = me.formulario.cmp_codigoPoste.txt_id.getValue();
                cod_objecto = me.formulario.cmp_codigoPoste.txt_detalleComponente.getValue();
            }

        } else if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'PUESTO') {
            if (me.formulario.cmp_codigoPuesto.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un PUESTO");
            } else {
                id_objeto = me.formulario.cmp_codigoPuesto.txt_id.getValue();
                cod_objecto = me.formulario.cmp_codigoPuesto.txt_detalleComponente.getValue();
            }

        } else if (me.formulario.grpb_grupoBoton.getValue()['rb'] == 'DERIVACION') {
            if (me.formulario.cmp_codigoDerivacion.txt_detalleComponente.getValue() == '') {
                Ext.MessageBox.alert('Error', "Seleccione un DERIVACION");
            } else {
                id_objeto = me.formulario.cmp_codigoDerivacion.txt_id.getValue();
                cod_objecto = me.formulario.cmp_codigoDerivacion.txt_detalleComponente.getValue();
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un NUS, POSTE, PUESTO o DERIVACION");
        }
        objeto = me.formulario.grpb_grupoBoton.getValue()['rb'];
        //controlador, accion, mask, form, grid, msg, param, Formulario
        if (objeto != null && id_objeto != 0) {
            me.AjaxRequestForm(me.controlador, me.accionGrabar, me.form, me.formulario, me.grid, null, null, me.formulario);
        } else {
            Ext.MessageBox.alert('Error', "El objeto sujeto a inspeccion (NUS/POSTE/PUESTO/DERIVACION) debe tener VALOR.");
        }
    },
    AjaxRequestForm: function (controlador, accion, mask, form, grid, msg, param, Formulario) {
        var me = this;
        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {
            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    mask.el.mask('Procesando...', 'x-mask-loading');
                    formSend.submit({
                        submitEmptyText: false,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                grid.getStore().load();
                            }
                            if (Formulario != null) {
                                Formulario.BloquearFormulario();
                            }
                        },
                        failure: function (form, action) {
                            mask.el.unmask();
                            me.VerificarCampoMensaje(action.result.msg, action.result.ID_SOL_MAN, action.result.objeto, Formulario);
                            //Ext.MessageBox.alert('Error', action.result.msg);
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    VerificarCampoMensaje: function (msg,ID,objecto, form) {
        //alert(hola);
        var me = this;
        if (Ext.util.Format.substr(msg, 0, 2) == '01') {
            form.BloquearFormulario();
            me.ventana = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Confirmar'  , mostrarBotonCerrar : true});
            me.formReiterar = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: 'ReiterarContinuar', msg: msg, hiddentxt_obs: true });
            me.ventana.add(me.formReiterar);
            me.ventana.show();
            me.ventana.btn_guardar.on('click', function () {
                if (me.formulario.isValid()) {
                    Funciones.AjaxRequestWin("SolicitudesMantenimiento", "GrabarReiteracionSM", me.ventana, me.formReiterar, me.grid, "Esta Seguro de Continuar", { ID_SOL_MAN: ID, elemento: objecto }, me.ventana);
                }
                else {
                    Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
                }
            });
        }
        else {
            Ext.MessageBox.alert('Error', msg);
        }
    },
    GuardarReiterar: function () {
        alert("entro");
    }
});
