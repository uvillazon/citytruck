Ext.define("App.View.OrdenesTrabajo.PrincipalOT", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalOT",
    controlador: 'OrdenesTrabajo',
    accionGrabar: 'Seleccionar',
    accionGrabarInforme: 'GuardarInformeInspeccion',
    view: '',
    lat: -66.168383423569,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.OrdenesTrabajo.GridOrdenesTrabajo', {
            region: 'west',
            width: '45%',
            storeResponsable: true,
            imagenPlanilla: false,
            imagenTrabEje : false,
        });

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        var calendarStore = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoCalendario', {
            autoLoad: true
        });
        calendarStore.setExtraParams({ Inspector: false });
        var item = Ext.create("App.view.OrdenesTrabajo.CalendarPanelOrdenTrabajo", {
            store: calendarStore,
        });
        
        me.panelMapa = Ext.create('App.Config.ux.GMapPanelv02', {
            itemId: 'map-google',
            height: Constantes.ALTO - 120,
            zoomLevel: 15,
            title: 'Localizacion por OT',
            iconCls: 'map',
            setCenter: {
                'lat': -17.4194,
                'lng': -66.1325,
            }
        });
        me.formulario = Ext.create("App.View.OrdenesTrabajo.FormOrdenTrabajo", {
            cargarStores: false
        });
        me.formulario.BloquearFormulario();

        me.tabPanel = Ext.create('Ext.tab.Panel', {

            items: [
                 me.formulario,
                {
                    title: 'Calendario de Actividades',
                    iconCls: 'calendar',
                    items: item
                }, me.panelMapa]
        });
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de OT Por Responsable");
        Funciones.CrearMenu('btn_TrabajoEjecutado1', "Trabajos <br>Ejecutados", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this, 'App.controller.OrdenesTrabajo.TrabajoDiario');
        Funciones.CrearMenu('btn_PlanillaInspeccion', "Planilla <br>Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_InformeInspeccion', "Informe <br>Inspeccion", Constantes.ICONO_VER, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_DevolucionMat', 'Devolucion<br>Materiales', Constantes.ICONO_CREAR, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_ImprimirOT', 'Imprimir <br>OT', Constantes.ICONO_CREAR, me.EventoEjecutar, me.grupo, this);
        Funciones.CrearMenu('btn_EjecutarOT', "Ejecutar<br>OT", "add", me.EventoEjecutar, me.grupo, this);


        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        me.form.add(me.tabPanel);

        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formulario.CargarDatos(record);
        var itemId = me.tabPanel.getActiveTab().getItemId();
        if (itemId == "map-google") {
            me.panelMapa.hideMarkers();
            //Ext.each(me.grid.obtenerSeleccionados(), function (record) {
            var latlng = new google.maps.LatLng(-17.4779694517418, me.lat);

            var marker = new google.maps.Marker({
                position: latlng,
                zoom: 15,
                map: me.panelMapa.gmap
            });
            me.panelMapa.addMarkers(marker);
            me.lat = me.lat + 0.0110;
            me.panelMapa.gmap.setCenter(latlng);
        }
        //});
    },
    EventosPlanilla: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_PlanillaRelevamiento") {
            var datosOT = me.grid.getSelectionModel().getSelection()[0];
            if (datosOT != null && datosOT.get('ESTADO') == 'ASIGNADA' && datosOT.get('RELEVAMIENTO') == true) {
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
    EventoEjecutar: function (btn) {
        var me = this;
        var data = me.grid.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == 'btn_EjecutarOT') {

            if (data == null || data.get('TIPO_OT') != 'INSPECCION') {
                Ext.MessageBox.alert('Error', "Seleccione OT para Ejecutar que sea Tipo 'INSPECCION'.");
            }
            else {
                var params = { ID_OT: data.get('ID_OT'), TIPO_OT: data.get('TIPO_OT'), ESTADO_DESTINO: "EJECUTADA", ID_POSTE: 0, NRO_SOL: 0, listaCodSol: null, ID_OT_PT_INT: 0 };
                Funciones.AjaxRequestForm("OrdenesTrabajo", "GuardarEjecucionOrdenesTrabajo", me, me.formulario, me.gridOT, "Esta Seguro dar por Ejecutada esta OT?", params, null);
            }
        }
        else if (btn.getItemId() == 'btn_InformeInspeccion') {
            if (data != null) {
                me.VentanaInforme(data);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == 'btn_TrabajoEjecutado1') {
            if (me.winEjecuta == null) {
                me.winEjecuta = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                });
                me.formOTEjecuta = Ext.create("App.View.OrdenesTrabajo.FormAdministrarOT", {
                    title: "Ejecutar Ordenes de Trabajo",
                    botones: false,
                    btn_TrabajoDiario : true,
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
        else if (btn.getItemId() == 'btn_PlanillaInspeccion') {
            if (data != null) {
                me.VentanaPlanilla(data, data.get('CON_PLANILLA'));

            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT en Estado EN_EJEC.");
            }
        }
        else if (btn.getItemId() == 'btn_InformeInspeccion') {
            if (data != null) {
                me.VentanaInforme(data);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == 'btn_TrabajoEjecutado') {
            if (data == null) {
                Ext.MessageBox.alert('Error', "Seleccione una OT.");
            }
        }
        else if (btn.getItemId() == "btn_DevolucionMat") {
            me.verVentanaDevoluciones(data);
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
        else {
            alert('No existe Evento para ese boton');
        }
    },
    VentanaPlanilla: function (OT, editar) {
        var me = this;
        if (OT.get('ESTADO_PLA') != "APROBADA") {
            if (me.winPlanilla == null) {
                me.winPlanilla = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Planilla OT' });
                me.formPlanilla = Ext.create("App.View.OrdenesTrabajo.FormPlanilla", { opcion: 'FormPlanilla', botones: false, });
                me.formPlanilla.CargarDatosPlanilla(OT);
                me.winPlanilla.add(me.formPlanilla);
                me.winPlanilla.btn_guardar.on('click', me.GuardarPlanilla, this);
                me.winPlanilla.show();
            }
            else {
                me.formPlanilla.CargarDatosPlanilla(OT);
                me.winPlanilla.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione una OT con Planilla En Estado NUEVA o RECHAZADA");
        }
    },
    GuardarPlanilla: function () {
        var me = this;
        Funciones.AjaxRequestWin("OrdenesTrabajo", "GuardarPlanillaInspeccion", me.winPlanilla, me.formPlanilla.formCabeceraPlanilla, me.grid, "Esta Seguro de Guardar La Planilla", { Detalles: Funciones.convertirJson(me.formPlanilla.gridDetallePlanilla), OBSERV: me.formPlanilla.txta_Observacion.getValue() }, me.winPlanilla);
    },
    verVentanaDevoluciones: function (OT) {
        var me = this;
        if (OT != null) {
            if (me.winDevolucion == null) {
                me.winDevolucion = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.formDevolucion = Ext.create("App.View.OrdenesTrabajo.FormDevolucion", { botones: false, columns: 1, title: 'Datos de Devolucion de Materiales por OT' });
                me.formDevolucion.CargarDatos(OT);
                me.winDevolucion.add(me.formDevolucion);
                me.winDevolucion.show();
            }
            else {
                me.formDevolucion.CargarDatos(OT);
                me.winDevolucion.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un registro");
        }
    },
    VentanaInforme: function (OT) {

        var me = this;
        if (me.winInforme == null) {
            me.winInforme = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Informe OT' });
            me.formInforme = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormInforme', botones: false });
            me.formInforme.loadRecord(OT);
            me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: OT.get('ID_OT') });
            me.winInforme.add(me.formInforme);
            me.winInforme.btn_guardar.on('click', me.GrabarInformeInspeccion, this);
            me.winInforme.show();
        }
        else {
            me.formInforme.loadRecord(OT);
            me.formInforme.loadFormulario("OrdenesTrabajo", "BuscarInformeInspeccion", { ID_OT: OT.get('ID_OT') });
            me.winInforme.add(me.formInforme);
            me.winInforme.show();
        }
    },
    GrabarInformeInspeccion: function () {
        var me = this;
        Funciones.AjaxRequestWin(me.controlador, me.accionGrabarInforme, me.winInforme, me.formInforme, null, 'Esta seguro de Guardar informe de OT?', null, me.winInforme);
    },
});
