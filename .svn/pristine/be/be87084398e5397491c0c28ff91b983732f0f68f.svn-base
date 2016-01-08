Ext.define("App.View.OrdenesTrabajo.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'OrdenesTrabajo',
    // accionGrabar: 'Seleccionar',
    accionGrabarAsignar: 'GuardarAsignarOrdenesTrabajo',
    accionGrabarEjecucion: 'GuardarEjecucionOrdenesTrabajo',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        var contador = 0;

        me.grid = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
            region: 'west',
            width: '45%',
            imagenPlanilla: false,
            imagenTrabEje: false,
            borrarParametros: true
        });

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_PlanillaInpseccion', 'Reporte Planilla Inspeccion', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de OT");
        Funciones.CrearMenu('btn_CrearOT', 'Crear <br>Editar OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_PresupuestoOT', 'Crear <br>Presupuesto', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_AsignarOTs', 'Asignar OTs', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_ReasignarOTs', 'Reasignar <br>OTs', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_ImprimirOT', 'Imprimir OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_EjecutarOT', 'Ejecutar OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
       
        //Funciones.CrearMenu('btn_CerrarOT', 'Cerrar OT', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_MostrarMaterialesMOOT', 'Mostrar<br>Mat. y/o MO', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_AprobarPlanillaOT', 'Aprobar<br>Planilla', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_RechazarPlanillaOT', 'Rechazar<br>Planilla', Constantes.ICONO_BAJA, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_VerPlanillaOT', 'Ver<br>Planilla', Constantes.ICONO_VER, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_OTProyecto', 'Aprobar o<br>Rechazar OT', Constantes.ICONO_VER, me.EventosBoton, me.grupo, this);


        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });

        me.formulario = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
            cargarStores: false
        });
        me.formulario.BloquearFormulario();

        me.form.add(me.formulario);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    EventosBoton: function (btn, e) {
        var me = this;

        if (btn.getItemId() == "btn_CrearOT") {

            if (me.winCrearOT == null) {
                me.winCrearOT = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Crear OT'
                });
                me.formCrearOT = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Creación de OT's",
                    botones: false,
                    opcion: 'Crear'
                });
                me.winCrearOT.add(me.formCrearOT);
                me.winCrearOT.show();
            }
            else {
                me.formCrearOT.gridSolicitudes.getStore().load();
                me.winCrearOT.show();
            }
        }
        else if (btn.getItemId() == 'btn_VerPlanillaOT') {
            var datosOT = me.formulario.record;
            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                me.VerPlanillaOT(datosOT);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla.");
            }
        }
        else if (btn.getItemId() == 'btn_AprobarPlanillaOT' || btn.getItemId() == 'btn_RechazarPlanillaOT') {
            var datosOT = me.formulario.record;
            if (datosOT != null && datosOT.get('CON_PLANILLA') == true && (datosOT.get('ESTADO') == 'EJECUTADA' || datosOT.get('ESTADO') == 'EN_EJEC')) {
                if (btn.getItemId() == 'btn_RechazarPlanillaOT') {
                    me.RechazarPlanilla(datosOT);
                }
                else {
                    me.AprobarPlanilla(datosOT);
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla y este en Estado EJECUTADA. o  EN_EJEC");
            }
        }
        else if (btn.getItemId() == "btn_AsignarOTs") {
            if (me.winAsignarOT == null) {
                me.winAsignarOT = Ext.create("App.Config.Abstract.Window", {
                    botones: true,
                    textGuardar: 'Confirmar Asignacion OT'
                });

                me.formOT = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Asignacion de OT's",
                    botones: false,
                    height: 600,
                    width: 900,
                    opcion: 'Asignar'
                });
                me.winAsignarOT.add(me.formOT);
                me.winAsignarOT.btn_guardar.on('click', me.grabarSeleccionOT, this);
                me.winAsignarOT.show();
            }
            else {
                me.formOT.getForm().reset();
                me.formOT.gridOTAprobados.getStore().load();
                me.formOT.gridOT.getStore().removeAll();
                me.winAsignarOT.show();
            }

        }
        else if (btn.getItemId() == "btn_ReasignarOTs") {
            if (me.winReasignarOT == null) {
                me.winReasignarOT = Ext.create("App.Config.Abstract.Window", {
                    botones: true,
                    textGuardar: 'Confirmar Reasignacion OT'
                });
                me.formOTReasignar = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Reasignacion de OT's",
                    botones: false,
                    opcion: 'Reasignar'
                });
                me.winReasignarOT.add(me.formOTReasignar);
                me.winReasignarOT.btn_guardar.on('click', me.grabarReasignarOT, this);
                me.winReasignarOT.show();
            }
            else {
                me.formOTReasignar.getForm().reset();
                me.formOTReasignar.gridOT.getStore().removeAll();
                me.winReasignarOT.show();
            }

        }
        else if (btn.getItemId() == "btn_EjecutarOT") {
            if (me.winEjecuta == null) {
                me.winEjecuta = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                });
                me.formOTEjecuta = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Ejecutar Ordenes de Trabajo",
                    botones: false,
                    opcion: 'EjecutaOT'
                });
                me.winEjecuta.add(me.formOTEjecuta);
                me.winEjecuta.show();
            }
            else {
                me.formOTEjecuta.gridOT.getStore().load();
                me.winEjecuta.show();
            }

        }
        else if (btn.getItemId() == "btn_ImprimirOT") {
            if (me.winImprimir == null) {
                me.winImprimir = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Imprimir OT'
                });
                me.formOTImprimir = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Imprimir Ordenes Asignadas",
                    botones: false,
                    opcion: 'ImprimirOT'
                });
                me.winImprimir.add(me.formOTImprimir);
                me.winImprimir.show();
            }
            else {
                me.formOTImprimir.gridOT.getStore().load();
                me.winImprimir.show();
            }
        }
        else if (btn.getItemId() == "btn_CerrarOT") {

            if (me.winCerrar == null) {
                me.winCerrar = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                });
                me.formCerrarOT = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Ejecutar Ordenes de Trabajo",
                    botones: false,
                    opcion: 'CerrarOT'
                });
                me.winCerrar.add(me.formCerrarOT);
                me.winCerrar.show();
            }
            else {
                me.winCerrar.show();
            }

        }
        else if (btn.getItemId() == "btn_MostrarMaterialesMOOT") {
            me.verVentanaMaterialesyMO();
        }
        else if (btn.getItemId() == "btn_PresupuestoOT") {

            if (me.winPresupuesto == null) {
                me.winPresupuesto = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Crear OT'
                });
                me.formPresupuesto = Ext.create("App.View.OrdenesTrabajo.FormPresupuesto", {
                    title: "Creación de Presupuesto para OT's",
                    botones: false,
                    opcion: 'Principal'
                });
                me.winPresupuesto.add(me.formPresupuesto);
                me.winPresupuesto.show();
            }
            else {
                me.formPresupuesto.grid.getStore().load();
                me.winPresupuesto.show();
            }
        } else if (btn.getItemId() == "btn_OTProyecto") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') == 'NUEVA' && datosOT.get('TIPO_OT') == 'PROYECTO') {
                me.ventanaAprobarRechazar();
                /*Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de aprobar la OT?', function (button) {
                    Ext.Ajax.request({
                        type: 'ajax',
                        url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarOTProyecto',
                        params: {
                            ID_OT: datosOT.get('ID_OT'),
                            ESTADO: 'NUEVA',
                            ACCION: 'APROBADA'
                        },
                        success: function (response, options) {
                            var data = Ext.decode(response.responseText);
                            if (data.success) {
                                Ext.Msg.show({
                                    title: 'Felicidades!',
                                    msg: data.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                            } else {
                                Ext.Msg.show({
                                    title: 'Advertencia',
                                    msg: data.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
                            }
                        }
                    })
                });*/
            } else {
                Ext.MessageBox.alert('Aviso', "Seleccionar una OT tipo PROYECTO en estado: NUEVA");
            }
        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
    EventosPlanilla: function (btn, e) {
        var me = this;
        if (btn.getItemId() == "btn_PlanillaInpseccion") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];

            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_PLA=' + datosOT.get('ID_PLA'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que tenga PLANILLA.");
            }

        }
            /* else if (btn.getItemId() == "btn_PlanillaRelevamiento") {
                 var datosOT = me.grid.getSelectionModel().getSelection()[0];
                 if (datosOT != null && datosOT.get('ESTADO') == 'ASIGNADA') {
                     window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_OT=' + datosOT.get('ID_OT'));
                 } else {
                     Ext.MessageBox.alert('Error', "Seleccione una OT en estado ASIGNADA.");
                 }
             }*/
        else if (btn.getItemId() == "btn_PlanillaRelevamiento") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') != 'CERRADA' && datosOT.get('RELEVAMIENTO') == true) {
                //   window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_OT=' + datosOT.get('ID_OT'));

                if (me.winPostes == null) {
                    me.winPostes = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Generar' });
                    me.gridPostes = Ext.create("App.View.Postes.GridPostes", { paramsStore: { ID_OT: datosOT.get('ID_OT') }, check: true });
                    me.winPostes.add(me.gridPostes);
                    me.winPostes.btn_guardar.on('click', me.grabarPlanillaRelevar, this);
                    me.winPostes.show();
                }
                else {
                    me.gridPostes.getStore().setExtraParams({ ID_OT: datosOT.get('ID_OT') });
                    me.gridPostes.moverInicio();
                    me.winPostes.show();
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en estado ASIGNADA y que este ASIGNADA A Usted.");
            }
        }
        else {
            Ext.MessageBox.alert('Aviso', "Seleccionar una OT cerrada para ver.");
        }
    },
    grabarSeleccionOT: function () {
        var me = this;
        if (me.formOT.gridOT.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione OT's para asignar.");
        }
        else {
            Funciones.AjaxRequestWin(me.controlador, me.accionGrabarAsignar, me.winAsignarOT, me.formOT, me.grid, 'Esta seguro de Asignar las OTs al responsable?', { listaOts: Funciones.convertirJson(me.formOT.gridOT) }, me.winAsignarOT);
        }
    },
    grabarPlanillaRelevar: function () {
        var me = this;

        if (me.gridPostes.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione OT's para planilla de relevamiento.");
        }
        else {
            //***********************************************************************
            var modified = me.gridPostes.getSelectionModel().getSelection();
            var count = 0;
            if (!Ext.isEmpty(modified)) {
                var recordsToSend = [];
                Ext.each(modified, function (record) {
                    //  alert(record.get("ID_POSTE"));
                    // alert(record.data.ID_OT);
                    recordsToSend.push(Ext.apply({ ID: record.get("ID_POSTE") }));
                });
                recordsToSend = Ext.JSON.encode(recordsToSend);
                //alert(recordsToSend);
                //alert(me.gridPostes.getStore().proxy.extraParams["ID_OT"]);
                window.open(Constantes.HOST + 'Reportes/PlanillaRelevamiento?OTS=' + recordsToSend + "&ID_OT=" + me.gridPostes.getStore().proxy.extraParams["ID_OT"]);

            }

        }
    },
    grabarEjecucionOT: function () {
        var me = this;
        if (me.formOT.gridCodSoluciones.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione Codigos de Solucion para registrar.");
        }
        else {
            Funciones.AjaxRequestForm(me.controlador, me.accionGrabarEjecucion, me.winEjecutaOT, me.formOT, me.grid, 'Esta seguro de Grabar los codigos de solucion para OT?', { listaCodSol: Funciones.convertirJson(me.formOT.gridCodSoluciones) }, me.winEjecutaOT);
        }
    },
    GenerarPlanilla: function (OT, editar) {
        //alert("gen")
        var me = this;
        if (editar == false) {
            me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Planilla OT' });
            me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'CrearPlanillaBTyMT', botones: false, winPrincipal: me.winPlanilla, gridPrincipal: me.grid });
            me.formPlanilla.loadRecord(OT);
            me.winPlanilla.add(me.formPlanilla);
            me.winPlanilla.show();
        }
        else {
            me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Planilla OT' });
            me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'CrearPlanillaBTyMT', botones: false, winPrincipal: me.winPlanilla, gridPrincipal: me.grid });
            me.formPlanilla.CargarDatosPlanilla(OT);
            me.winPlanilla.add(me.formPlanilla);
            me.winPlanilla.show();
        }
    },
    VerPlanillaOT: function (OT) {
        var me = this;
        me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: false, textGuardar: 'Guardar Planilla OT' });
        me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanillaConsulta', botones: false, winPrincipal: me.winPlanilla });
        me.formPlanilla.CargarDatosPlanilla(OT);
        me.winPlanilla.add(me.formPlanilla);
        me.winPlanilla.show();
    },
    AprobarPlanilla: function (OT) {
        var me = this;
        if (OT.get('ESTADO_PLA') == 'NUEVA') {
            if (me.winPlanillaConsulta == null) {
                me.winPlanillaConsulta = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Aprobar Planilla OT' });
                me.formPlanillaConsulta = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanillaAprobarRechazar', title: 'Formulario de Aprobacion y Rechazo de Planilla', botones: false });
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.add(me.formPlanillaConsulta);
                me.winPlanillaConsulta.show();
                me.winPlanillaConsulta.btn_guardar.on('click', me.GuadarAprobacion, me);
            }
            else {
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.btn_guardar.setText("Aprobar Planilla OT");
                me.winPlanillaConsulta.show();
            }
        } else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla en Estado NUEVA");
        }
    },
    GuadarAprobacion: function (btn) {
        //var winap = Ext.create
        //alert("se aprobo la planbilla");
        //alert(btn.getText());
        if (btn.getText() == "Aprobar Planilla OT") {
            Ext.MessageBox.show({
                title: 'Aprobación Planilla',
                msg: 'Comentario de Aprobacion',
                width: 300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                scope: this,
                fn: this.GuardarAprobacionPlanilla
            });
        }
        else {
            Ext.MessageBox.show({
                title: 'Rechazo de Planilla',
                msg: 'Comentario de Rechazo',
                width: 300,
                buttons: Ext.MessageBox.OKCANCEL,
                multiline: true,
                scope: this,
                fn: this.GuardarRechazoPlanilla
            });
        }
    },
    GuardarAprobacionPlanilla: function (btn, text) {
        var me = this;
        if (btn == "ok") {
            var params = { ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA', OBSERVACION: text };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPlanillaConsulta, me.formPlanillaConsulta, me.grid, "Esta Seguro de Aprobar La Planilla", params, me.winPlanillaConsulta);
        }
    },
    GuardarRechazoPlanilla: function (btn, text) {
        var me = this;
        if (btn == "ok") {
            var params = { ESTADO_DESTINO: 'RECHAZADA', OPCION: 'RECHAZADO', OBSERVACION: text };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPlanillaConsulta, me.formPlanillaConsulta, me.grid, "Esta Seguro de Rechazar La Planilla", params, me.winPlanillaConsulta);
        }
    },
    RechazarPlanilla: function (OT) {
        var me = this;
        //alert(OT.get("ESTADO_PLA"));
        if (OT.get('ESTADO_PLA') == 'NUEVA') {
            if (me.winPlanillaConsulta == null) {
                me.winPlanillaConsulta = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Rechazar Planilla OT' });
                me.formPlanillaConsulta = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanillaAprobarRechazar', title: 'Formulario de Aprobacion y Rechazo de Planilla', botones: false });
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.add(me.formPlanillaConsulta);
                me.winPlanillaConsulta.show();
                me.winPlanillaConsulta.btn_guardar.on('click', me.GuadarAprobacion, me);
            }
            else {
                me.formPlanillaConsulta.CargarDatosPlanilla(OT);
                me.winPlanillaConsulta.btn_guardar.setText("Rechazar Planilla OT");
                me.winPlanillaConsulta.show();
            }
        } else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla en Estado NUEVA");
        }
    },
    grabarReasignarOT: function () {
        var me = this;
        if (me.formOTReasignar.gridOT.getStore().getCount() == 0) {
            Ext.MessageBox.alert('Error', "Seleccione OT's para Reasignar.");
        }
        else {
            Funciones.AjaxRequestWin(me.controlador, "GuardarReasignacion", me.winReasignarOT, me.formOTReasignar, me.grid, 'Esta seguro de Asignar las OTs al responsable?', { detallesOT: Funciones.convertirJson(me.formOTReasignar.gridOT) }, me.winReasignarOT);
        }
    },
    verVentanaMaterialesyMO: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null) {
            if (me.winMaterialesMO == null) {
                me.winMaterialesMO = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.formMaterialesyMO = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO",{ botones: false ,columns : 1});
                me.formMaterialesyMO.CargarDatos(datosOT)
                me.winMaterialesMO.add(me.formMaterialesyMO);
                me.winMaterialesMO.show();
            }
            else {
                me.formMaterialesyMO.CargarDatos(datosOT)
                me.winMaterialesMO.show();
            }
        }
        else {
            Ext.Msg.alert("Error","Seleccione un Regsitro")
        }
    },

    ventanaAprobarRechazar: function () {
        var me = this;
        var form = Ext.widget('form', {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },
                items: [{
                            xtype: 'textareafield',
                            fieldLabel: 'Motivo:',
                            name: 'OBSERV',
                            labelAlign: 'top',
                            flex: 1,
                            margins: '0',
                            //allowBlank: norequerido
                        }],
                buttons: [{
                            text: 'Aprobar',
                            handler: function () {
                                return me.accionAprobarRechazar('APROBADA')
                          }
                    
                          }, {
                              text: 'Rechazar',
                              handler: function () {
                                  return me.accionAprobarRechazar('RECHAZADA')
                              }
                          }, {
                                text: 'Cancelar',
                                handler: function () {
                                this.up('form').getForm().reset();
                                this.up('window').close();
                                }
                          }]
            });

            win = Ext.widget('window', {
                title: 'Aprobar o Rechazar la OT Proyecto',
                closeAction: 'hide',
                width: 300,
                height: 300,
                layout: 'fit',
                resizable: true,
                modal: true,
                items: form
            });
            win.show();
    },

    accionAprobarRechazar: function (accion) {
        var me = this;
        Ext.Msg.confirm('Confirmar', '¿Esta usted seguro de aprobar la OT?', function (btn) {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            //var accion = btn.text == 'Aprobar' ? 'APROBADA' : 'RECHAZADA';
            Ext.Ajax.request({
            type: 'ajax',
            url: Constantes.HOST + 'OrdenesTrabajo/AprobarRechazarOTProyecto',
            params: {
                ID_OT: datosOT.get('ID_OT'),
                ESTADO: datosOT.get('ESTADO'),
                ACCION: accion
            },
            success: function (response, options) {
                var data = Ext.decode(response.responseText);
                if (data.success) {
                    Ext.Msg.show({
                        title: 'Felicidades!',
                        msg: data.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                } else {
                    Ext.Msg.show({
                        title: 'Advertencia',
                        msg: data.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                }
            }
        })
    });
    }
});
