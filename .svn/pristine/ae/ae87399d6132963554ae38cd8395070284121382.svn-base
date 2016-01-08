 Ext.define("App.View.BandejasEntrada.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Responsables',
    accionGrabar: 'GrabarResponsableSP',
    view: '',
    win: null,
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            region: 'west',
            width: '45%',
            opcion: 'Bandeja'
        });
        me.CargarBotones();

        //Funciones.CrearMenu('id13', 'Nombre2', Constantes.ICONO_EDITAR, me.CargarEventos, me.toolbar, this);
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        
        me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", { cargarStores: false });
        me.formulario.BloquearFormulario();
        me.form.add(me.formulario);
        me.items = [me.grid
            //{
            //    region: 'west',
            //    //autoScroll : true,
            //    width: '45%',
            //    items: [me.grid,/* me.CargarTabPanel()*/]
            //}
            , me.form
        ];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarBotones: function () {
        var me = this;
        me.grupo = Funciones.CrearGrupoBoton("3", "opciones de Solicitudes");
        Funciones.CrearMenu('btn_AprobarSolicitud', 'Aprobar<br>Solicitud', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_RechazarSolicitud', 'Rechazar<br>Solicitud', Constantes.ICONO_BAJA, me.EventosBoton, me.grupo, this);
        //Funciones.CrearMenu('btn_ContinuarSolicitud', 'RechazarContinuar<br>Solicitud', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
    },
    CargarTabPanel: function () {
        var me = this;
        var gridSolicitutesAceptadas = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridSolicitudesAceptadas", width: '100%',
            height: 200,
        });
        var gridSolicitutesRechazadas = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridSolicitudesRechazadas", width: '100%',
            height: 200,
        });
        me.TabPanel = Ext.create("Ext.tab.Panel", {
            items: [gridSolicitutesAceptadas, gridSolicitutesRechazadas]
        });
        return me.TabPanel;
    },
    EventosBoton: function (btn) {
        var me = this;

        if (btn.getItemId() == "btn_AprobarSolicitud") {
            if (me.formulario.record != null) {
                //alert(me.formulario.record.get('ESTADO'));
                if (me.formulario.record.get('ESTADO') == 'NUEVA' || me.formulario.record.get('ESTADO') == 'APR_JF_MN') {
                    if (me.win == null) {
                        me.win = Ext.create("App.Config.Abstract.Window", { textGuardar: "Aprobar Solicitudes", botones: true });
                        me.formAprobacion = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "FormAprobacion" });
                        me.formAprobacion.CargarFormularioAprobacion(me.formulario.record);
                        me.win.btn_guardar.on('click', me.GuardarFormulario, this);
                        me.win.add(me.formAprobacion);
                        me.win.show();
                    }
                    else {
                        me.formAprobacion.CargarFormularioAprobacion(me.formulario.record);
                        me.win.show();
                    }
                }
                else {
                    Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado NUEVA");
                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado NUEVA");
            }

        }
        else if (btn.getItemId() == "btn_RechazarSolicitud") {
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == 'NUEVA') {
                if (me.winRechazo == null) {
                    me.winRechazo = Ext.create("App.Config.Abstract.Window", { textGuardar: "Rechazar Solicitud", botones: true });
                    me.formRechazo = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "FormRechazo" });
                    me.formRechazo.CargarFormularioRechazo(me.formulario.record);
                    me.winRechazo.btn_guardar.on('click', me.GuardarFormulario, this);
                    me.winRechazo.add(me.formRechazo);
                    me.winRechazo.show();
                }
                else {
                    me.formRechazo.CargarFormularioRechazo(me.formulario.record);
                    me.winRechazo.show();
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en Estado NUEVA");
            }
        }
        else if (btn.getItemId() == "btn_ContinuarSolicitud") {
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == 'NUEVA') {
                if (me.winContinuar == null) {
                    me.winContinuar = Ext.create("App.Config.Abstract.Window", { textGuardar: "Rechazar Solicitud", botones: true });
                    me.formContinuar = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "ReiterarContinuar" });
                    me.formContinuar.CargarFormularioRechazo(me.formulario.record);
                    me.winContinuar.btn_guardar.on('click', me.GuardarFormulario, this);
                    me.winContinuar.add(me.formContinuar);
                    me.winContinuar.show();
                }
                else {
                    me.formContinuar.CargarFormularioRechazo(me.formulario.record);
                    me.winContinuar.show();
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en Estado NUEVA");
            }
        }
        else {
            alert("No se Selecciono ningun botton");
        }
    },
    GuardarFormulario: function (btn) {
        var me = this;
        if (btn.getText() == 'Rechazar Solicitud') {
            Funciones.AjaxRequestWin("SolicitudesMantenimiento", "AprobarRechazarSolicitudesMantenimiento", me.winRechazo, me.formRechazo, me.grid, "Esta Seguro de Rechazar la Solicitud", { ESTADO: 'NUEVA', ESTADO_DESTINO: 'RECH_INSP', OPCION: 'RECHAZADA', duplicado: '-' }, me.winRechazo);
        } else {

            me.AjaxRequestWinAprobado("SolicitudesMantenimiento", "GrabarAprobacionSolicitudMantenimientoVerificar", me.win, me.formAprobacion.formAprobacion, me.grid, "Esta Seguro de Confirmar la Aprobacion", { ID_SOL_MAN: me.formAprobacion.formSolicitud.txt_id.getValue(), ESTADO: 'NUEVA', ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', duplicado: '-' }, me.win);
        }
    },
    AjaxRequestWinAprobado: function (controlador, accion, mask, form, grid, msg, param, win) {
        var me = this;
        var formSend = form.getForm();
        var mensaje = (msg == null) ? 'Esta Seguro de Guardar Los cambios?' : msg;
        if (formSend.isValid()) {

            Ext.MessageBox.confirm('Confirmacion?', mensaje, function (btn) {
                if (btn == 'yes') {
                    mask.el.mask('Procesando...', 'x-mask-loading');
                    formSend.submit({
                        submitEmptyText: false,
                        timeout :1200,
                        url: Constantes.HOST + '' + controlador + '/' + accion + '',
                        params: param,
                        success: function (form, action) {
                            mask.el.unmask();
                            Ext.MessageBox.alert('Exito', action.result.msg);
                            //me.Formulario.Bloquear();
                            if (grid != null) {
                                try {
                                    grid.getStore().load();
                                }
                                catch (err) {
                                    grid.load();
                                }
                            }
                            if (win != null) {
                                win.hide();
                            }
                        },
                        failure: function (form, action1) {
                            mask.el.unmask();
                            me.VerificarCampoMensaje(action1.result.msg, action1.result.ID_SOL_MAN, action1.result.objeto, win);
                            //alert(action1.result.msg);
                            //var valor = accion1.result.msg;
                            //alert(valor);
                            //Ext.MessageBox.alert('Error', action1.result.msg);
                            //if (Ext.util.Format.substr(accion1.result.msg, 0, 2) == '01') {
                            //    var ventana = Ext.create("App.Config.Abstract.Window").show();
                            //}
                        }
                    });

                }
            });

        }
        else {
            Ext.MessageBox.alert('Error', "Falta Parametros. Revisar Formulario.");
        }
    },
    VerificarCampoMensaje: function (msg,ID,objeto,win) {
        //alert(hola);
        var me = this;
        if (Ext.util.Format.substr(msg, 0, 2) == '01') {
            me.ventana = Ext.create("App.Config.Abstract.Window", {botones : true , textGuardar : 'Confirmar'});
            me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: 'ReiterarContinuar', msg: msg, hiddentxt_obs: true });
            me.ventana.add(me.formulario);
            me.ventana.show();
            me.ventana.btn_guardar.on('click', function () {
                if (me.formulario.isValid()) {
                    Funciones.AjaxRequestWinArray("SolicitudesMantenimiento", "GrabarAprobacionSolicitudMantenimiento", me.ventana, me.formAprobacion, me.grid, "Esta Seguro de Continuar", { ID_SOL_MAN: ID, ESTADO: 'NUEVA', ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', elemento: objeto, duplicado: me.formulario.grpb_grupoBoton.getValue().duplicado }, [me.win, me.ventana]);
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
    
});
