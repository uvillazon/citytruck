Ext.define("App.View.OrdenesTrabajo.FormPresupuesto", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    opcion: '',
    winUC: null,
    winDetalle: null,
    initComponent: function () {
        var me = this;

        if (me.opcion == "Principal") {
            me.CargarFormPrincipal();
            me.eventosFormulario();
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    //modifcacion de la interfaz principal de Planilla Registro
    CargarFormPrincipal: function () {
        var me = this;
        me.grid = Ext.create('App.View.OrdenesTrabajo.GridOrdenesTrabajo', {
            width: 500,
            height: 570,
            storeResponsable: true,
            storeInspector: true,
            imagenPlanilla: false,
            imagenTrabEje: false,
            paramsStore: { Estados: ['APROBADA', 'CON_MAT', 'CON_MO'] }
        });
        
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
        });
        me.formularioOT = Ext.create("App.View.OrdenesTrabajo.Forms", { opcion: 'FormConsultaOTSM', columns: 3, title: 'Datos Generales OT' });
        me.formularioOT.BloquearFormulario();
        
        me.gridMateriales = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'Presupuesto por Item', width: 740, height: 350, handler: me.EliminarItem });
        toolbarMateriales = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarItemMaterial', "Agregar Item", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        Funciones.CrearMenu('btn_AgregarItemMaterialPorUC', "Agregar Item Por UC", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        Funciones.CrearMenu('btn_AgregarItemPlanilla', "Agregar Item de Planilla o Trabajos Ejecutados", Constantes.ICONO_CREAR, me.EventosBotonPresupuesto, toolbarMateriales, this);
        me.gridMateriales.addDocked(toolbarMateriales, 1);
        

        me.form.add(me.formularioOT);
        me.form.add(me.gridMateriales);
        me.items = [
           me.grid,
           me.form
        ];

    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formularioOT.CargarDatos(record);
        me.gridMateriales.getStore().setExtraParams({ ID_OT: record.get('ID_OT') });
        me.gridMateriales.getStore().load();
    },
    eventosFormulario: function () {
        var me = this;
        me.grid.on('cellclick', me.CargarDatos, this);
    },
    EventosBotonPresupuesto: function (btn) {
        //return false;
        var me = this;
        var ot = me.formularioOT.record;
        if (ot == null) {
            Ext.Msg.alert("Error", "Seleccione una OT...");
            return false;
        }
        if (btn.getItemId() == "btn_AgregarItemMaterial") {
            if (me.winPresupuestoItem == null) {
                me.winPresupuestoItem = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Crear OT'
                });
                me.formitem = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorMaterial', botones: false });
                me.formitem.CargarDatos(ot);
                me.winPresupuestoItem.add(me.formitem);
                me.winPresupuestoItem.show();
            }
            else {
                me.formitem.CargarDatos(ot);
                me.winPresupuestoItem.show();
            }
        }
        else if (btn.getItemId() == "btn_AgregarItemMaterialPorUC") {
            if (me.winPresupuestoItemUC == null) {
                me.winPresupuestoItemUC = Ext.create("App.Config.Abstract.Window", {
                    botones: false,
                    textGuardar: 'Crear OT'
                });
                me.formitemUC = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorUC', botones: false });
                me.formitemUC.CargarDatosUC(ot);
                me.winPresupuestoItemUC.add(me.formitemUC);
                me.winPresupuestoItemUC.show();
            }
            else {
                me.formitemUC.CargarDatosUC(ot);
                me.winPresupuestoItemUC.show();
            }
        }
        else if (btn.getItemId() == 'btn_AgregarItemPlanilla' || btn.getItemId() == 'btn_AgregarItemTrabEje') {
            if (me.winPresupuestoPlanilla == null) {
                var btn = Funciones.CrearMenu('btn_GuardarMatTrabEje', 'Obtener Materiales del Trabajo Ejecutado', 'disk', me.GuardarItemPlanilla   , null, this);
                me.winPresupuestoPlanilla = Ext.create("App.Config.Abstract.Window", {
                    botones: true,
                    btn3: btn,
                    textGuardar: 'Obtener Materiales de la Planilla'
                });
                me.gridOT = Ext.create("App.View.OrdenesTrabajo.GridOrdenesTrabajo", {
                    imagenPlanilla: false,
                    imagenTrabEje : false,
                    borrarParametros: true,
                    width: 600,
                    height: 500,
                });
                var toolbarOT = Funciones.CrearMenuBar();
                Funciones.CrearMenu('btn_reportePlanilla', "Ver Planilla", "report", me.verPlanilla, toolbarOT, this);
                Funciones.CrearMenu('btn_reporteTrabajoEjecutado', "Ver Trabajo Ejecutado", "report", me.verPlanilla, toolbarOT, this);
                me.gridOT.addDocked(toolbarOT, 1);
                me.ot = ot;
                //me.formitemUC = Ext.create("App.View.OrdenesTrabajo.FormDetallePresupuesto", { opcion: 'FormPresupuestoPorUC', botones: false });
                //me.formitemUC.CargarDatosUC(ot);
                me.winPresupuestoPlanilla.add(me.gridOT);
                me.winPresupuestoPlanilla.show();
                me.winPresupuestoPlanilla.btn_guardar.on('click', me.GuardarItemPlanilla, this);
            }
            else {
                me.ot = ot;
                me.gridOT.getStore().load();
                me.winPresupuestoPlanilla.show();
            }
        }
        else if (btn.getItemId() == "btn_AgregarItemTrabEje") {

        }
        else {
            Ext.Msg.alert("Error", "Seleccione una Opcion");
        }
    },
    EliminarItem: function (gr) {
        alert("se elimino" + gr.getId());
    },
    verPlanilla: function () {
        var me = this;
        Ext.Msg.alert("Aviso", "asdasdasdada");
        var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
        if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
            me.VerPlanillaOT(datosOT);
        } else {
            Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla.");
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
    GuardarItemPlanilla: function (btn) {
        var me = this;
        alert(btn.getItemId());
        var datosOT = me.gridOT.getSelectionModel().getSelection()[0];
        if (btn.getItemId() == "btn_GuardarMatTrabEje") {
            if (datosOT != null && datosOT.get('CON_TRAB_EJEC') == true) {
                Funciones.AjaxRequestWin("Presupuestos", "CrearPresupuestoPorTrabEje", me, me, me.gridMateriales, "Esta Seguro de Guardar los Item de Trabajo Ejectuado Seleccionada", { ID_OT: me.ot.get('ID_OT') ,ID_OT_SEL : datosOT.get('ID_OT')}, me.winPresupuestoPlanilla);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga registro de TRABAJO EJECTUADO.");
            }
        }
        else {
            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                Funciones.AjaxRequestWin("Presupuestos", "CrearPresupuestoPorPlanilla", me, me, me.gridMateriales, "Esta Seguro de Guardar los Item de la Planilla Seleccionada", { ID_OT: me.ot.get('ID_OT'), ID_PLA: datosOT.get('ID_PLA') }, me.winPresupuestoPlanilla);
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que Tenga Planilla.");
            }
        }
    }
});
