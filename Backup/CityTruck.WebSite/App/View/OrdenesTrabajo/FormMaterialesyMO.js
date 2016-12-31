Ext.define("App.View.OrdenesTrabajo.FormMaterialesyMO", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Materiales y MO de Ordenes de Trabajo",
    cargarStores: true,
    opcion: 'Principal',
    initComponent: function () {
        var me = this;

        if (me.opcion == "Principal") {
            me.CargarFormPrincipal();
        }
        else if (me.opcion == "PrincipalInspector") {
            me.title = "Datos de Materiales Presupuestas , Ejecutados y Devoluciones";
            me.CargarFormPrincipalInspector();
        }
        else if (me.opcion == "PrincipalInspectorCierre") {
            me.title = "Formulario de Cierre de OT tipo Reparacion y Reemplazo";
            me.CargarFormPrincipalInspectorCierre();
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    CargarFormPrincipal: function () {
        var me = this;
        me.formOT = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormConsultaOTSM', columns: 3,
            title: '',
            icono : false
        });
        Funciones.BloquearFormularioReadOnly(me.formOT);
        me.gridMateriales = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'Presupuesto por Item', width: 740, height: 450, colspan : 1 });
        me.items = [
           me.formOT,
           me.gridMateriales
        ];

    },
    CargarFormPrincipalInspector: function () {
        var me = this;
        me.formOT = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormConsultaOTSM', columns: 3,
            title: '',
            icono: false
        });
        Funciones.BloquearFormularioReadOnly(me.formOT);
        me.gridMaterialesPre = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'Presupuesto', width: 740, height: 450, colspan: 1 });
        //me.gridMaterialesDev = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'PresupuestoMaterialMO', title: 'De por Item', width: 740, height: 450, colspan: 1 });
        me.gridMaterialesDevNuevos = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'DevoluciontoMaterial', title: 'Devol. de Mat. Nuevos', width: 740, height: 450, colspan: 1, editar: false });
        me.gridMaterialesDevUsados = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'DevoluciontoMaterial', title: 'Devol. de Mat. Usados', width: 740, height: 450, colspan: 1, editar: false });
        me.gridMaterialesEjecutados = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'MaterialEjecutados', title: 'Mat. Ejecutados', width: 740, height: 450, colspan: 1, editar: false });
        me.gridMaterialesPreEjeDev = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'MaterialesPreEjeDev', title: 'Reporte Materiales', width: 740, height: 450, colspan: 1, editar: false });
        var tabPanel = Ext.create('Ext.tab.Panel', {

            items: [
                me.gridMaterialesPre,
                me.gridMaterialesDevNuevos,
                me.gridMaterialesDevUsados,
                me.gridMaterialesEjecutados,
                me.gridMaterialesPreEjeDev
            ]
        });
        me.items = [
           me.formOT,
           tabPanel
        ];

    },
    CargarDatos: function (OT) {
        var me = this;
        me.formOT.getForm().reset();
        me.formOT.getForm().loadRecord(OT);
        me.gridMateriales.getStore().setExtraParams({ ID_OT: OT.get('ID_OT') });
        me.gridMateriales.getStore().load();
       
    },
    CargarDatosPrincipalInsp: function (OT) {
        var me = this;
        me.formOT.getForm().reset();
        me.formOT.getForm().loadRecord(OT);
        me.gridMaterialesPre.getStore().setExtraParams({ ID_OT: OT.get('ID_OT') });
        me.gridMaterialesPre.getStore().load();
        me.gridMaterialesDevNuevos.getStore().setExtraParams({ ID_OT: OT.get('ID_OT'), ESTADO_PROD: 'NUEVO' });
        me.gridMaterialesDevUsados.getStore().setExtraParams({ ID_OT: OT.get('ID_OT'), ESTADO_PROD: 'USADO' });
        me.gridMaterialesEjecutados.getStore().setExtraParams({ ID_OT: OT.get('ID_OT') });
        me.gridMaterialesPreEjeDev.getStore().setExtraParams({ ID_OT: OT.get('ID_OT') });
        me.gridMaterialesDevNuevos.getStore().load();
        me.gridMaterialesDevUsados.getStore().load();
        me.gridMaterialesEjecutados.getStore().load();
        me.gridMaterialesPreEjeDev.getStore().load();
    },
    CargarDatosPrincipalInspCierre: function (OT) {
        var me = this;
        me.formOT.getForm().reset();
        me.formOT.getForm().loadRecord(OT);
        me.gridMaterialesPreEjeDev.getStore().setExtraParams({ ID_OT: OT.get('ID_OT') });
        me.gridMaterialesPreEjeDev.getStore().load();
    },
    CargarFormPrincipalInspectorCierre: function () {
        var me = this;
        me.formOT = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormConsultaOTSM', columns: 3,
            title: '',
            icono: false
        });
        Funciones.BloquearFormularioReadOnly(me.formOT);
        me.gridMaterialesPreEjeDev = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'MaterialesPreEjeDev', title: 'Reporte Materiales', width: 740, height: 450, colspan: 1, editar: false });
        
        me.items = [
           me.formOT,
           me.gridMaterialesPreEjeDev
        ];
    },
    VerificarCierre: function () {
        var me = this;
        var store = me.gridMaterialesPreEjeDev.getStore();
        var result = true;
        store.each(function (record) {
            if (record.get('TOTAL') > 0 || record.get('TOTAL') < 0) {
                result = false;
                return false;
            }
        });
        return result;
    }
    
});
