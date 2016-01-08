Ext.define("App.View.OrdenesTrabajo.PrincipalOTIns", {
    extend: "App.Config.Abstract.PanelPrincipal",
    alias: "widget.PrincipalOT",
    controlador: 'OrdenesTrabajo',
    accionGrabar: 'Seleccionar',
    accionGrabarAsignar: 'GuardarAsignarOrdenesTrabajo',
    accionGrabarEjecucion: 'GuardarEjecucionOrdenesTrabajo',
    view: '',
    lat: -66.1325,
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
            imagenTrabEje: false,
            storeInspector: true,
        });

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        var calendarStore = Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoCalendario', {
            autoLoad: true

        });
        calendarStore.setExtraParams({ Inspector: true });

        var item = Ext.create("App.view.OrdenesTrabajo.CalendarPanelOrdenTrabajo", {
            store: calendarStore,
            alto : 150
        });
        item.on('dayclick', function () {
            alert("asdasd");
            return false;
        });
        me.panelMapa = Ext.create('App.Config.ux.GMapPanelv02', {
            itemId : "map-google",
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
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de OT Por Inspector");
        Funciones.CrearMenu('btn_CrearOT', 'Crear <br>Editar OT', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_PresupuestoOT', 'Crear <br>Presupuesto', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_AsignarOTs', 'Asignar <br>OTs', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_ReasignarOTs', 'Reasignar <br>OTs', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        

        Funciones.CrearMenu('btn_CerrarOT', 'Cerrar OT <br>Rep. y Rempl.', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_MostrarMateriales', 'Mostrar<br>Materiales', Constantes.ICONO_CREAR, me.EventosBoton, me.grupo, this);
     
      
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
            var latlng = new google.maps.LatLng(-17.4194, me.lat);

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
    EventosBoton : function(btn){
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
        else if (btn.getItemId() == "btn_CerrarOT") {
            me.verVetanaCierreReparacionReemplazo();
        }
        else if (btn.getItemId() == "btn_MostrarMateriales") {
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
        }
    },

    verVentanaMaterialesyMO: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null) {
            if (me.winMaterialesMO == null) {
                me.winMaterialesMO = Ext.create("App.Config.Abstract.Window", { botones: false });
                me.formMaterialesyMO = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO", { botones: false, columns: 1, opcion: 'PrincipalInspector' });
                me.formMaterialesyMO.CargarDatosPrincipalInsp(datosOT)
                me.winMaterialesMO.add(me.formMaterialesyMO);
                me.winMaterialesMO.show();
            }
            else {
                me.formMaterialesyMO.CargarDatosPrincipalInsp(datosOT)
                me.winMaterialesMO.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un Regsitro")
        }
    },
    verVetanaCierreReparacionReemplazo: function () {
        var me = this;
        var datosOT = me.formulario.record;
        if (datosOT != null /*& datosOT.get('TIPO_OT') == "REPARACION_REEMPLAZO"*/) {
            if (me.winCierre == null) {
                me.winCierre = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Confirmar Cierre' });
                me.formCierre = Ext.create("App.View.OrdenesTrabajo.FormMaterialesyMO", { botones: false, columns: 1, opcion: 'PrincipalInspectorCierre' });
                me.formCierre.CargarDatosPrincipalInspCierre(datosOT)
                me.winCierre.add(me.formCierre);
                me.winCierre.btn_guardar.on('click', me.GuardarCierre, this);
                me.winCierre.show();
            }
            else {
                me.formCierre.CargarDatosPrincipalInspCierre(datosOT)
                me.winCierre.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione un Regsitro")
        }
    },
    GuardarCierre : function(){
        var me = this;
        me.formCierre.VerificarCierre();
        if (me.formCierre.VerificarCierre()) {
            //alert("Se Efectuara el ")
            //Ext.Msg.alert("Exito", "Se Ejecuto Correctamente el Cierre de OT");
            //me.winCierre.hide();
            Funciones.AjaxRequestWin(me.controlador, "GuardarCerrarOT", me.winCierre, me.formCierre, me.grid, 'Esta seguro de Cerrar la OT?', null, me.winCierre);
        }
        else {
            Ext.Msg.alert("Error", "No se puede cerrar la OT por que los datos son incorrectos");
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
});
