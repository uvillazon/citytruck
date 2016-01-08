Ext.define("App.View.OrdenesTrabajo.FormDevolucion", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    //columns: 2,
    opcion: 'Principal',
    winUC: null,
    winDetalle: null,
    EstadoDev : '',
    initComponent: function () {
        var me = this;

        if (me.opcion == "Principal") {
            //me.title = "Crear Detalles de Planilla";
            me.CargarFormPrincipal();
            //me.CargarVentanaDetalleItem();
            //me.winPrincipal.btn_guardar.on('click', me.GuardarPlanilla, this);
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    //modifcacion de la interfaz principal de Planilla Registro
    CargarFormPrincipal: function () {
        var me = this;
        me.formOT = Ext.create("App.View.OrdenesTrabajo.Forms", {
            opcion: 'FormConsultaOTSM', columns: 3,
            title: '',
            icono: false
        });
        Funciones.BloquearFormularioReadOnly(me.formOT);
        me.gridMaterialesUsados = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'DevoluciontoMaterial', title: 'Devoluciones de Materiales Usados', width: 740, height: 450, colspan: 1, editar: true, handler: me.EliminarDevolucion });
        me.toolbarMaterialesUsados = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarDevUsados', 'Devolucion Material Usuado', 'add', me.EventosDevoluciones, me.toolbarMaterialesUsados, this);
        Funciones.CrearMenu('btn_GuardarDevUsados', 'Guardar Cambios', 'disk', me.EventosDevoluciones, me.toolbarMaterialesUsados, this);
        me.gridMaterialesUsados.addDocked(me.toolbarMaterialesUsados, 1);

        me.gridMaterialesNuevos = Ext.create("App.View.OrdenesTrabajo.Grids", { opcion: 'DevoluciontoMaterial', title: 'Devoluciones de Materiales Nuevos', width: 740, height: 450, colspan: 1, editar: true, handler: me.EliminarDevolucion });
        me.toolbarMaterialesNuevos = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_AgregarDevNuevos', 'Devolucion Material Nuevos', 'add', me.EventosDevoluciones, me.toolbarMaterialesNuevos, this);
        Funciones.CrearMenu('btn_GuardarDevNuevos', 'Guardar Cambios', 'disk', me.EventosDevoluciones, me.toolbarMaterialesNuevos, this);
        me.gridMaterialesNuevos.addDocked(me.toolbarMaterialesNuevos, 1);
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [me.gridMaterialesUsados, me.gridMaterialesNuevos]
        });
        me.items = [
           me.formOT,
           me.tabPanel
        ];

    },
    CargarDatos: function (OT) {
        var me = this;
        me.OT = OT;
        me.getForm().reset();
        me.loadRecord(OT);
        me.gridMaterialesNuevos.getStore().setExtraParams({ ID_OT: OT.get('ID_OT'), ESTADO_PROD: 'NUEVO' });
        me.gridMaterialesUsados.getStore().setExtraParams({ ID_OT: OT.get('ID_OT'), ESTADO_PROD: 'USADO' });
        me.gridMaterialesNuevos.getStore().load();
        me.gridMaterialesUsados.getStore().load();
    },
    //eventos de los grid de materiales usados y nuevos
    EventosDevoluciones: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_AgregarDevUsados") {
            me.verVentanaDevolucionMaterial("USADO");
        }
        else if (btn.getItemId() == "btn_GuardarDevUsados") {
            var json = Funciones.convertirJson(me.gridMaterialesUsados);
            if (json == false) {
                Ext.Msg.alert("Error", "No Existe ningun Cambio");
            }
            else {
                Funciones.AjaxRequestGrid("Devoluciones", "CrearDevolucionPorDetalle", me, "Esta Seguro de Guardar los Cambios", { ID_OT: me.OT.get('ID_OT'), detalles: json }, me.gridMaterialesUsados);
            }
        }
        else if (btn.getItemId() == "btn_AgregarDevNuevos") {
            me.verVentanaDevolucionMaterial("NUEVO");
        }
        else if (btn.getItemId() == "btn_GuardarDevNuevos") {
            var json = Funciones.convertirJson(me.gridMaterialesNuevos);
            if (json == false) {
                Ext.Msg.alert("Error", "No Existe ningun Cambio");
            }
            else {
                Funciones.AjaxRequestGrid("Devoluciones", "CrearDevolucionPorDetalle", me, "Esta Seguro de Guardar los Cambios", { ID_OT: me.OT.get('ID_OT'), detalles: json }, me.gridMaterialesNuevos);
            }
        }
        else {
            Ext.Msg.alert("Aviso", "Seleccione una Opcion Valida Verificar Botones");
        }
    },
    verVentanaDevolucionMaterial: function (estado) {
        var me = this;
        me.EstadoDev = estado;
        if (me.winDevolucionMaterial == null) {
            
            var btn = Funciones.CrearMenu('btn_AgregarDevUsados', 'Guardar y Cerrar', 'disk', me.EventosVetanaDevoluciones, null, this);
            me.winDevolucionMaterial = Ext.create("App.Config.Abstract.Window", { botones: true, btn3: btn ,textGuardar : 'Guardar y Continuar'});
            me.formDetalle = Ext.create("App.View.OrdenesTrabajo.FormDetalleDevolucion", { opcion: "FormDetalleDevolucion", botones: false });
            me.winDevolucionMaterial.add(me.formDetalle);
            me.winDevolucionMaterial.show();
            me.winDevolucionMaterial.btn_guardar.on('click', me.EventosVetanaDevoluciones, this);
        }
        else {
            me.winDevolucionMaterial.show();
        }
    },
    EventosVetanaDevoluciones: function (btn) {
        var me = this;
        var itemId = btn.getItemId();
        if (me.isValid()) {
            var mat = me.formDetalle.cbx_materiales.datos[0];
        }
        else {
            Ext.Msg.alert("Error", "Falta Parametros...");
            return false;
        }
        if (itemId == "btn_AgregarDevUsados") {
            
            Funciones.AjaxRequestWin("Devoluciones", "CrearDevolucionMaterial", me.winDevolucionMaterial, me.formDetalle, me.EstadoDev == "USADO" ? me.gridMaterialesUsados : me.gridMaterialesNuevos, "Esta Seguro de Devolver ese Material", { ID_OT: me.OT.get('ID_OT'), IDPRODUCTO: mat.get('IDPRODUCTO'), COD_PROD: mat.get('COD_ALTERNATIVO'), DESC_PROD: mat.get('DESCRIPCION'), UNID_PROD: mat.get('IDUNIDAD'), ESTADO_PROD: me.EstadoDev }, me.winDevolucionMaterial);
        }
            //solo guardar y limpiar formulario
        else if (itemId == "btn_guardar") {
            Funciones.AjaxRequestForm("Devoluciones", "CrearDevolucionMaterial", me.winDevolucionMaterial, me.formDetalle, me.EstadoDev == "USADO" ? me.gridMaterialesUsados : me.gridMaterialesNuevos, "Esta Seguro de Devolver ese Material", { ID_OT: me.OT.get('ID_OT'), IDPRODUCTO: mat.get('IDPRODUCTO'), COD_PROD: mat.get('COD_ALTERNATIVO'), DESC_PROD: mat.get('DESCRIPCION'), UNID_PROD: mat.get('IDUNIDAD'), ESTADO_PROD: me.EstadoDev }, me.formDetalle);
        }
        else {
            Ext.Msg.alert("Error", "Avise a TI");
        }

    },
    EliminarDevolucion: function (grid, rowIndex, colIndex) {
      
        var rec = grid.getStore().getAt(rowIndex);
        Funciones.AjaxRequestGrid("Devoluciones", "EliminarDevolucion", grid, "Esta Seguro de Eliminar el Item", { ID_OT: rec.get('ID_OT'), ID_DEV: rec.get('ID_DEV') }, grid);
        //alert("Terminate " + rec.get('firstname'));

    },
});
