Ext.define("App.View.OrdenesTrabajo.FormPlanilla", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    //columns: 2,
    opcion: '',
    winUC: null,
    winDetalle: null,
    initComponent: function () {
        var me = this;

        if (me.opcion == "FormPlanilla") {
            me.title = "Crear Detalles de Planilla";
            me.CargarFormPlanilla();
            me.eventosBotton();
            //me.CargarVentanaDetalleItem();
            //me.winPrincipal.btn_guardar.on('click', me.GuardarPlanilla, this);
        }
        else if (me.opcion == "FormPlanillaAprobarRechazar") {
            me.CargarFormPlanillaConsulta();
        }
        else if (me.opcion == "FormPlanillaConsulta") {
            me.CargarFormPlanillaConsulta();
        }
        else {
            alert("Seleccione una Opcion");
        }
        this.callParent(arguments);
    },
    //modifcacion de la interfaz principal de Planilla Registro
    CargarFormPlanilla: function () {
        var me = this;
        me.formCabeceraPlanilla = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCabeceraPlanilla', colspan: 2, columns: 4, icono: false });
        me.gridDetallePlanilla = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridPlanillaMTyBT",
            width: 1000,
            height: 330, 
            colspan: 2
        });
        //me.toolbarMT = Funciones.CrearMenuBar();
       
        me.grp_btton = Funciones.CrearGrupoBoton(2, null);
        //me.grp_btton.colspan = ;
        me.btn_agregar = Ext.create('Ext.Button', {
            text: 'Añadir Detalle',
            iconCls: Constantes.ICONO_CREAR,
            itemId: 'btn_AnadirItem',
            cls: 'botones',
            minHeight: 27,
            minWidth: 80,
        });
        me.btn_quitar = Ext.create('Ext.Button', {
            text: 'Quitar Detalle',
            iconCls: Constantes.ICONO_BAJA,
            itemId: 'btn_QuitarItem',
            cls: 'botones',
            minHeight: 27,
            minWidth: 80,
        });
        me.grp_btton.add(me.btn_agregar);
        me.grp_btton.add(me.btn_quitar);
        //me.gridDetallePlanilla.on('beforeedit', me.CargarCodSolucion, this);
        //Funciones.CrearMenu('btn_AnadirItem', 'Añadir Detalle', Constantes.ICONO_CREAR, me.CargarVentanaDetalleItem, me.toolbarMT, me);
        //Funciones.CrearMenu('btn_QuitarItem', 'Quitar Detalle', Constantes.ICONO_BAJA, me.EliminarItemDetalle, me.toolbarMT, me);

        //me.gridDetallePlanilla.addDocked(me.toolbarMT, 1);
        me.txta_Observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERV",
            maxLength: 250,
            width: 800,
            height: 70,
            colspan: 1,
        });
        me.CargarcomponentesCodigoMantenimiento();
        me.CargarcomponentesCodigoSolucion();
        me.CargarcomponentesMateriales();
        me.items = [
           me.formCabeceraPlanilla,
           me.cbx_poste,
           me.grp_btton,
            me.txta_Observacion,
           me.gridDetallePlanilla,
          
        ];
    },
    eventosBotton : function(){
        var me = this;
        me.btn_agregar.on('click', me.CargarVentanaDetalleItem, me);
        me.btn_quitar.on('click', me.EliminarItemDetalle, me);
        me.gridDetallePlanilla.on('edit', me.CargarCodMantenimiento, this);
    },
    CargarVentanaDetalleItem: function () {
        var me = this;
        if (me.winDetalle == null) {
            me.winDetalle = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Añadir a Planilla' });
            me.formDetalle = Ext.create("App.View.OrdenesTrabajo.FormDetallePlanilla", { opcion: 'FormDetalleItem', botones: false, columns: 3 });
            me.winDetalle.add(me.formDetalle);
            me.formDetalle.getForm().reset();
            //me.formDetalle.BloquearFormulario(["rb"]);
            Funciones.BloquearFormulario(me.formDetalle, ["rb"]);
            me.winDetalle.show();
            me.winDetalle.btn_guardar.on('click', me.agregarDetallePlanilla, this);
            me.formDetalle.CargarOT(me.record);
            me.formDetalle.gridDetalleMaterial.getStore().removeAll();
        }
        else {
            me.formDetalle.getForm().reset();
            me.formDetalle.gridDetalleMaterial.getStore().removeAll();
            Funciones.BloquearFormulario(me.formDetalle, ["rb"]);
            me.formDetalle.CargarOT(me.record);
            me.winDetalle.show();
        }
    },
    EliminarItemDetalle: function () {
        var me = this;
        var data = me.gridDetallePlanilla.getSelectionModel().getSelection()[0];
        if (data != null) {
            if (data.get('ID_PLA_DET') == 0) {
                me.gridDetallePlanilla.getStore().remove(data);
                me.gridDetallePlanilla.getView().refresh();
            }
            else {
                Funciones.AjaxRequestGrid("OrdenesTrabajo", "EliminarDetallePlanilla", me, "Esta Seguro De Eliminar Ese Detalle de Planilla", { ID_PLA_DET: data.get('ID_PLA_DET') }, me.gridDetallePlanilla);

            }
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
        }
    },
    //modo consulta de la PLANILLA
    CargarFormPlanillaConsulta: function () {
        var me = this;
        me.formCabeceraPlanilla = Ext.create('App.View.OrdenesTrabajo.Forms', { opcion: 'FormCabeceraPlanilla', colspan: 2, columns: 4, icono: false });
        me.formCabeceraPlanilla.BloquearFormulario();
        me.gridDetallePlanilla = Ext.create("App.View.OrdenesTrabajo.Grids", {
            opcion: "GridPlanillaMTyBTConsulta",
            width: 900,
            height: 350,
            colspan: 2
        });
        me.txta_Observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERV",
            maxLength: 250,
            width: 800,
            height: 70,
            colspan: 1,
            disabled: true
        });
        me.items = [
           me.formCabeceraPlanilla,
           me.gridDetallePlanilla,
           me.txta_Observacion,
        ];
    },
    CargarFormPlanillaAprobarRechazar: function () {
        var me = this;
        me.CargarFormPlanillaConsulta();
        me.txta_Observacion.width = 400;
        me.txta_Comentario = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            maxLength: 250,
            width: 400,
            colspan: 1,
        });
        me.items = [
          me.formCabeceraPlanilla,
          me.gridDetallePlanilla,
          me.txta_Observacion,
          me.txta_Comentario
        ];
    },
    CargarcomponentesCodigoMantenimiento: function () {
        var me = this;
        me.gridCodigoMantenimiento = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoMantenimiento' });
        me.winCodigoMantenimiento = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: true });
        me.winCodigoMantenimiento.add(me.gridCodigoMantenimiento);
        me.gridCodigoMantenimiento.on('celldblclick', me.CargarRecord, this);
    },
    CargarcomponentesCodigoSolucion: function () {
        var me = this;
        me.gridCodigoSolucion = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { opcion: 'GridCodigoSolucion' });
        me.winCodigoSolucion = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: true });
        me.winCodigoSolucion.add(me.gridCodigoSolucion);
        //alert('entro');
        me.gridCodigoSolucion.on('celldblclick', me.CargarRecordSol, this);
    },
    CargarcomponentesMateriales: function () {
        var me = this;
        me.gridMateriales = Ext.create("App.View.Postes.GridMateriales", { opcion: 'GridMateriales' });
        me.winMateriales = Ext.create("App.Config.Abstract.Window", { mostrarBotonCerrar: false });
        me.winMateriales.add(me.gridMateriales);
        //alert('entro');
        me.gridMateriales.on('celldblclick', me.CargarRecordMat, this);
    },

    CargarCodMantenimiento: function (editor, e) {
        var me = this;

        if (e.field == "COD_MAN") {
            me.gridCodigoMantenimiento.recordEdit = e.record;
            me.gridCodigoMantenimiento.recordName = "COD_MAN";
            me.gridCodigoMantenimiento.recordId = "ID_COD_MAN";
            Funciones.AjaxRequestRecord("Codigos", "BuscarCodigoMantenimiento", e.grid, e.record, "COD_MAN", "ID_COD_MAN", { codMan: e.value }, me.winCodigoMantenimiento);
            e.record.set('ID_COD_SOL', '');
            e.record.set('COD_SOL', '');
            e.record.set('IDPRODUCTO', '');
            e.record.set('COD_PROD', '');
            e.record.set('DESC_PROD', '');
            e.record.set('UNID_PROD', '');
        }
        else if (e.field == 'COD_SOL') {
            if (e.record.get('ID_COD_MAN') != null) {
                me.gridCodigoSolucion.recordEdit = e.record;
                me.gridCodigoSolucion.recordName = "COD_SOL";
                me.gridCodigoSolucion.recordId = "ID_COD_SOL";
                me.gridCodigoSolucion.getStore().setExtraParams({ ID_COD_MAN: e.record.get('ID_COD_MAN') });
                me.gridCodigoSolucion.getStore().load();
                Funciones.AjaxRequestRecord("Codigos", "BuscarCodigoSolucion", e.grid, e.record, "COD_SOL", "ID_COD_SOL", { codSolucion: e.value }, me.winCodigoSolucion);
                //me.winCodigoSolucion.show();
                e.record.set('IDPRODUCTO', '');
                e.record.set('COD_PROD', '');
                e.record.set('DESC_PROD', '');
                e.record.set('UNID_PROD', '');
            }
        }
        else if (e.field == 'COD_PROD') {
            me.gridMateriales.recordEdit = e.record;
            me.gridMateriales.recordName = "COD_PROD";
            me.gridMateriales.recordId = "IDPRODUCTO";
            me.gridMateriales.getStore().setExtraParams({ ID_COD_SOL: e.record.get('ID_COD_SOL') });
            me.gridMateriales.getStore().load();
            Funciones.AjaxRequestRecordArray("Materiales", "BuscarMaterial", e.grid, e.record, ["COD_PROD", "IDPRODUCTO", "DESC_PROD", "UNID_PROD"], { codMaterial: e.value }, me.winMateriales);
            //me.winCodigoSolucion.show();
         
        }
        else if (e.field == "ID_COD_MAN") {
            alert(e.value);
        }
    },
    CargarRecord: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridCodigoMantenimiento.recordEdit.set(me.gridCodigoMantenimiento.recordName, record.get('COD_MAN'));
        me.gridCodigoMantenimiento.recordEdit.set(me.gridCodigoMantenimiento.recordId, record.get('ID_COD_MAN'));
        me.winCodigoMantenimiento.hide();
    },
    CargarRecordSol: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridCodigoSolucion.recordEdit.set(me.gridCodigoSolucion.recordName, record.get('COD_SOL'));
        me.gridCodigoSolucion.recordEdit.set(me.gridCodigoSolucion.recordId, record.get('ID_COD_SOL'));
        me.winCodigoSolucion.hide();
    },
    CargarRecordMat: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        me.gridMateriales.recordEdit.set(me.gridMateriales.recordName, record.get('COD_ALTERNATIVO'));
        me.gridMateriales.recordEdit.set(me.gridMateriales.recordId, record.get('IDPRODUCTO'));
        me.gridMateriales.recordEdit.set('DESC_PROD', record.get('DESCRIPCION'));
        me.gridMateriales.recordEdit.set('UNID_PROD', record.get('IDUNIDAD'));
        me.winMateriales.hide();
    },
    CargarDatosPlanilla: function (OT) {
        var me = this;
        me.getForm().reset();
        me.loadRecord(OT);
        me.txta_Observacion.setValue(OT.get('OBSERV'));
        me.record = OT;
        //if(OT.get('CON_PLA'))
        me.gridDetallePlanilla.getStore().setExtraParams({ ID_PLA: OT.get('ID_PLA') });
        me.gridDetallePlanilla.getStore().load();

    },
    GuardarAprobarRechazarPlanilla: function () {
        var me = this;
        //alert("Se Guardo Correctamente");
        if (me.winPrincipal.btn_guardar.getText() == "Aprobar Planilla OT") {
            var params = { ID_PLA: me.record.get('ID_PLA'), ESTADO: "NUEVA", ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA' };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPrincipal, me, null, "Esta Seguro de Aprobar La Planialla", params, me.winPrincipal);
        }
        else {
            var params = { ID_PLA: me.record.get('ID_PLA'), ESTADO: me.record.get('ESTADO'), ESTADO_DESTINO: 'RECHAZADA', OPCION: 'RECHAZADA' };
            Funciones.AjaxRequestWin("OrdenesTrabajo", "AprobarRechazarPlanillaInspeccion", me.winPrincipal, me, null, "Esta Seguro de Rechazar La Planialla", params, me.winPrincipal);

        }
    },
    agregarDetallePlanilla: function () {
        var me = this;
        //alert("ohas");
        //me.gridDetallePlanilla.getStore().load();
        if (me.formDetalle.isValid() && me.formDetalle.gridDetalleMaterial.getStore().count() > 0) {
            me.formDetalle.el.mask('Añadiendo a grid...', 'x-mask-loading');
            //if (me.formDetalle.grpb_grupoBoton.getValue().rb == "POSTE") {
                //if (me.gridDetallePlanilla.getStore().existeRecord('IDPRODUCTO', record.get('IDPRODUCTO')) && (me.gridDetallePlanilla.getStore().existeRecord('COD_SOL', me.cbx_codigoSolucion.datos[0].get('COD_SOL')))) {
                //    Ext.MessageBox.alert('Error', "Ya Seleccione Ese Material");
                //}
                //if (me.ValidarValoresGrid(me.gridDetallePlanilla.getStore(), me.formDetalle.gridDetalleMaterial.getStore())) {

                //}
                me.formDetalle.gridDetalleMaterial.getStore().each(function (record) {
                    if (!me.existeDetallePlanilla(record.get('IDPRODUCTO'), record.get('ID_COD_MAN'), record.get('ID_POSTE'))) {


                        var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesPlanilla", {
                            ID_PLA_DET: 0,
                            IDPRODUCTO: record.get('IDPRODUCTO'),
                            COD_PROD: record.get('COD_ALTERNATIVO'),
                            DESC_PROD: record.get('DESCRIPCION'),
                            UNID_PROD: record.get('UNIDAD'),
                            CANT_PRE: record.get('CANT_PRE'),
                            CODIGO: record.get('CODIGO'),
                            ID_POSTE: record.get('ID_POSTE'),
                            ID_CONDUCTOR: record.get('ID_CONDUCTOR'),
                            FORMACION_CND: record.get('FORMACION_CND'),
                            TENSION: record.get('TENSION'),
                            ID_UC: record.get('ID_UC'),
                            COD_UC: record.get('COD_UC'),
                            DESCRIPCION: record.get('ID_CONDUCTOR') == 0 ?record.get('DESCRIPCION_UC') : 'Conductor',
                            COD_MAN: record.get('COD_MAN'),
                            ID_COD_MAN: record.get('ID_COD_MAN'),
                            ID_COD_SOL: record.get('ID_COD_SOL'),
                            COD_SOL: record.get('COD_SOL'),
                            ID_UC: record.get('ID_UC'),
                            PIQUETE: me.formDetalle.num_pique.getValue(),
                            NIVEL: me.formDetalle.num_nivelUC.getValue(),
                            CANTIDAD: record.get('CANTIDAD'),
                            AP: me.formDetalle.cbx_ap.getValue(),
                            DIST_POS_CAMI: me.formDetalle.num_distanciaAproximada.getValue(),
                            CANT_ACOM: me.formDetalle.num_cantidadAcometida.getValue(),

                        });
                        me.gridDetallePlanilla.getStore().insert(0, rec);
                        me.gridDetallePlanilla.getView().refresh();
                    }
                });
                me.formDetalle.el.unmask();
                me.winDetalle.hide();
            //}
            //else {
            //    me.formDetalle.gridDetalleMaterial.getStore().each(function (record) {
            //        var rec = Ext.create("App.Model.OrdenesTrabajo.DetallesPlanilla", {
            //            ID_PLA_DET: 0,
            //            CODIGO: me.formDetalle.cbx_conductor.datos[0].get('COD_CONDUCTOR'),
            //            ID_CONDUCTOR: me.formDetalle.cbx_conductor.datos[0].get('ID_CONDUCTOR'),
            //            FORMACION_CND: me.formDetalle.cbx_conductor.datos[0].get('FORMACION'),
            //            TENSION: me.formDetalle.cbx_conductor.datos[0].get('TENSION'),
            //            DESCRIPCION: "Conductor",
            //            COD_MAN: me.formDetalle.cbx_codigoMantenimientoConductor.datos[0].get('COD_MAN'),
            //            ID_COD_MAN: me.formDetalle.cbx_codigoMantenimientoConductor.datos[0].get('ID_COD_MAN'),
            //            IDPRODUCTO: record.get('IDPRODUCTO'),
            //            COD_PROD: record.get('COD_ALTERNATIVO'),
            //            DESC_PROD: record.get('DESCRIPCION'),
            //            UNID_PROD: record.get('UNIDAD'),
            //            CANT_PRE: record.get('CANT_PRE'),
            //            ID_COD_SOL: me.formDetalle.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
            //            COD_SOL: me.formDetalle.cbx_codigoSolucion.datos[0].get('COD_SOL'),
            //        });
            //        me.gridDetallePlanilla.getStore().insert(0, rec);
            //        me.gridDetallePlanilla.getView().refresh();
            //    });
            //    me.formDetalle.el.unmask();
            //    me.winDetalle.hide();
            //}
        }

        else {
            Ext.MessageBox.alert('Error', "Falta Parametros o al menos debe añadir un Material.");
        }

    },
    existeDetallePlanilla: function (IDPRODUCTO, ID_COD_MAN, ID_POSTE) {
        var me = this;
        var data = me.gridDetallePlanilla.getStore().data.items,
            dLen = data.length,
            record, d;
        for (d = 0; d < dLen; d++) {
            if (data[d].get("IDPRODUCTO") == IDPRODUCTO && data[d].get("ID_COD_MAN") == ID_COD_MAN && data[d].get("ID_POSTE") == ID_POSTE) {
                return true;
            }

        }
        return false;
    },
    //ValidarValoresGrid: function (store1, store2) {
    //    var me = this;
    //    store2.each(function (record) {
    //        if (store1.existeRecord('IDPRODUCTO', record.get('IDPRODUCTO')) && store1.existeRecord('ID_COD_MAN', record.get('ID_COD_MAN'))) {
    //            alert("Existe ese Producto" || record.get('IDPRODUCTO'));
    //            return false;
    //        }
    //    });

    //}
});
