Ext.define("App.View.OrdenesTrabajo.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: '',
    pieTitulo: '',
    editar: false,
    initComponent: function () {
        var me = this;

        if (me.opcion == "GridOTTipo1") {
            me.title = "Detalles de Reemplazo o Reparacion";
            me.pieTitulo = "Reemplazo o Reparacion";
            me.CargarComponentesGridOTTipo1();
            /*  me.bbar = Ext.create('Ext.PagingToolbar', {
                  store: me.store,
                  displayInfo: true,
                  displayMsg: 'Desplegando {0} - {1} de {2}',
                  emptyMsg: "No existen " + me.pieTitulo + "."
  
              });*/
        }
        else if (me.opcion == "OTSeleccionadas") {
            me.title = "OT Seleccionadas para Asignacion";
            me.CargarComponentesSeleccionados();
        }
        else if (me.opcion == "OTSeleccionadasReasignar") {
            me.title = "OT Seleccionadas para Reasignacion";
            me.CargarComponentesSeleccionados();
        }
        else if (me.opcion == "MaterialesOT") {
            me.title = "Devolucion de Materiales de OT";
            me.CargarComponentesMaterialesOT();
        }
        else if (me.opcion == "GridPlanillaMTyBT") {
            me.title = "Detalle Planilla de Inspeccion de Redes de Media y Baja Tensíon";
            me.CargarComponentesGridPlanillaMTyBT();
        }
        else if (me.opcion == "GridPlanillaMTyBTConsulta") {
            me.title = "Detalle Planilla de Inspeccion de Redes de Media y Baja Tensíon";
            me.CargarComponentesGridPlanillaMTyBTConsulta();
        }//OTElegidas
        else if (me.opcion == "OTElegidas") {
            me.title = "Ordenes de Trabajo Asignados";
            me.CargarComponentesGridPlanillaMTyBT();
        }
        else if (me.opcion == "PresupuestoMaterialMO") {

            me.title = me.title == null ? "Presupuesto por Materiales" : me.title;
            me.pieTitulo = "Presupestos";
            me.CargarPresupuestoMaterialMO();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "DevoluciontoMaterial") {
            //alert("entro");
            me.title = me.title == null ? "Devolucion de Materiales" : me.title;
            me.pieTitulo = "Devoluciones de Materiales";
            me.CargarDevolucionesMateriales();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "MaterialEjecutados") {
            //alert("entro");
            me.title = me.title == null ? "Materiales Ejecutados" : me.title;
            me.pieTitulo = "Materiales Ejecutados";
            me.CargarMaterialesEjecutados();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });
        }
        else if (me.opcion == "MaterialesPreEjeDev") {
            //alert("entro");
            me.title = me.title == null ? "Materiales" : me.title;
            me.pieTitulo = "Materiales";
            me.CargarMaterialesPreEjeDev();
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });

        }
            //MaterialEjecutados
        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarComponentesGridOTTipo1: function () {
        var me = this;
        me.store = Ext.create('App.Store.OrdenesTrabajo.DetallesReemplazo');
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Cod. Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Cod. Mantenimiento", width: 80, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Centro Costo", width: 80, sortable: true, dataIndex: "DESCRIPCION_CC" },
           // { header: "Detalle<br>Corto UC", width: 150, sortable: true, dataIndex: "DESC_CORTA" },

        ];
    },
    CargarComponentesSeleccionados: function () {
        var me = this;
        //******************************
        me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        //******************************
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "ID OT", width: 70, sortable: true, dataIndex: "ID_OT" },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Asignado a", width: 80, sortable: true, dataIndex: "NOMBRE_ASIGNADO" },
            { header: "Tipo<br>OT", width: 70, sortable: true, dataIndex: "TIPO_OT" },
            { header: "Lugar Trabajo", width: 120, sortable: true, dataIndex: "LUGAR_TRABAJO" },
            { header: "Cod. Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            {
                header: "Cod. Defecto", width: 70, sortable: true, dataIndex: "COD_DEF", editor: {
                    xtype: 'textfield',
                }
            },
            { header: "Cod. Solucion", width: 100, sortable: true, dataIndex: "COD_SOL" },
            { header: "Problema", width: 100, sortable: true, dataIndex: "DESC_PROBL" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarComponentesMaterialesOT: function () {
        var me = this;
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Cod Material", width: 100, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "UNIDAD_REPORTA" },
            { header: "Unidad", width: 150, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Cantidad<br>Asignada", width: 150, sortable: true, dataIndex: "TIPO_DOCUMENTO1" },
            { header: "Cantidad<br>Devuelta", width: 150, sortable: true, dataIndex: "TIPO_DOCUMENTO1" },

        ];
    },
    BorrarOT: function () {
        var me = this;
        var data = me.getSelectionModel().getSelection()[0];
        if (data != null) {
            me.getStore().remove(data);
        }
        else {
            Ext.MessageBox.alert('Error', 'Seleccione Un registro ...');
        }
    },


    CargarComponentesGridPlanillaMTyBT: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPlanilla");
        //me.selType = 'cellmodel';
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.get('ID_PLA_DET') == 0) {
                    return "EditarDetalleOT";
                }
                //return Constantes.CargarCssEditarDetallePlanilla(record.get("ESTADO"), 'OT');
            }
        };
        me.pieTitulo = "Detalles";
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + "."

        });
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Codigo Poste<br>Conductor", width: 70, sortable: false, dataIndex: "CODIGO" },
           {
               header: "Piq", width: 50, sortable: false, dataIndex: "PIQUETE", editor: {
                   xtype: 'numberfield',
               }
           },
           {
               text: 'Unidad Constructiva', columns: [
                   { header: "Nivel<br>Tensíon", width: 50, sortable: false, dataIndex: "TENSION" },
                   { header: "Codigo <br>UC", width: 50, sortable: false, dataIndex: "COD_UC" },
                   { header: "Form", width: 70, sortable: false, dataIndex: "FORMACION_CND" },
                   { header: "Descripcion", width: 150, sortable: false, dataIndex: "DESCRIPCION" },
                   {
                       header: "Nivel", width: 70, sortable: false, dataIndex: "NIVEL", editor: {
                           xtype: 'numberfield',
                       }
                   },
                   {
                       header: "Cant UC", width: 50, sortable: false, dataIndex: "CANTIDAD", editor: {
                           xtype: 'numberfield',
                       }
                   },
                   {

                       header: "Cod Mant.", width: 70, sortable: false, dataIndex: "COD_MAN", editor: {
                           xtype: 'textfield',
                       }
                   },
               ]
           },
            {
                text: 'Codigo Solucion y Materiales a Usar', columns: [
                   {
                       header: "Codigo <br>Solucion", width: 50, sortable: false, dataIndex: "COD_SOL", editor: {
                           xtype: 'textfield',
                       }
                   },
                   {
                       header: "Codigo<br>Material", width: 50, sortable: false, dataIndex: "COD_PROD", editor: {
                           xtype: 'textfield',
                       }
                   },
                   { header: "Descripcion <br>Material", width: 100, sortable: false, dataIndex: "DESC_PROD" },
                   { header: "Unidad", width: 50, sortable: false, dataIndex: "UNID_PROD" },

                   {
                       header: "Cantidad<br>Material", width: 50, sortable: false, dataIndex: "CANT_PRE", editor: {
                           xtype: 'numberfield',
                       }
                   },
                ]
            },
           {
               header: "Cantidad<br>Acometida", width: 70, sortable: false, dataIndex: "CANT_ACOM", editor: {
                   xtype: 'numberfield',
               }
           },
           {
               header: "AP[si]o[no]", width: 70, sortable: false, dataIndex: "AP", editor: {
                   xtype: 'combo',
                   store: ["SI", "NO"]
               }
           },
           {
               header: "Distancia<br>Aprox. Poste<br>Camino", width: 80, sortable: true, dataIndex: "DIST_POS_CAMI", editor: {
                   xtype: 'numberfield',
                   allowBlank: false
               }
           },
           {
               header: "Observaciones", width: 100, sortable: false, dataIndex: "OBSERV", editor: {
                   xtype: 'textfield',
               }
           },

        ];
    },
    CargarComponentesGridPlanillaMTyBTConsulta: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPlanilla");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Codigo Poste<br>Conductor", width: 70, sortable: true, dataIndex: "COD_POSTE" },
           {
               header: "Piq", width: 50, sortable: true, dataIndex: "PIQUETE"
           },
           {
               text: 'Unidad Constructiva', columns: [
                   { header: "Nivel<br>Tensíon", width: 50, sortable: true, dataIndex: "TENSION" },
                   { header: "Codigo <br>UC", width: 50, sortable: true, dataIndex: "COD_UC" },
                   { header: "Form", width: 70, sortable: true, dataIndex: "FORMACION_CND" },
                   { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
                   {
                       header: "Nivel", width: 70, sortable: true, dataIndex: "NIVEL"
                   },
                   {
                       header: "Cant UC", width: 50, sortable: true, dataIndex: "CANTIDAD"
                   },
                   {

                       header: "Cod Mant.", width: 70, sortable: true, dataIndex: "COD_MAN"
                   },
               ]
           },
           {
               text: 'Codigo Solucion y Materiales a Usar', columns: [
                  {
                      header: "Codigo <br>Solucion", width: 50, sortable: false, dataIndex: "COD_SOL"
                  },
                  {
                      header: "Codigo<br>Material", width: 50, sortable: false, dataIndex: "COD_PROD"
                  },
                  { header: "Descripcion <br>Material", width: 100, sortable: false, dataIndex: "DESC_PROD" },
                  { header: "Unidad", width: 50, sortable: false, dataIndex: "UNID_PROD" },

                  {
                      header: "Cantidad<br>Material", width: 50, sortable: false, dataIndex: "CANT_PRE"
                  },
               ]
           },
           {
               header: "Cantidad<br>Acometida", width: 70, sortable: true, dataIndex: "CANT_ACOM"
           },
           {
               header: "AP[si]o[no]", width: 70, sortable: true, dataIndex: "AP"
           },
           {
               header: "Distancia<br>Aprox. Poste<br>Camino", width: 70, sortable: true, dataIndex: "DIST_POS_CAM"
           },
           {
               header: "Observaciones", width: 100, sortable: true, dataIndex: "OBSERV"
           },

        ];
    },
    CargarPresupuestoMaterialMO: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesPresupuesto");
        if (me.editar) {
            me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
            ];
            me.columnCantPre = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Presupuestada",
                width: 75,
                sortable: true,
                dataIndex: "CANT_PRE",
                editor: {
                    xtype: 'numberfield',
                }
            });
            me.columnCunetaContable = Ext.create("Ext.grid.column.Column", {
                header: "Cuenta<br>Contable",
                width: 70,
                sortable: true,
                dataIndex: "CODCUENTA",
                editor: {
                    xtype: 'textfield',
                }
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'delete',
                        tooltip: 'Eliminar',
                        handler: me.handler
                    }]
            });
        }
        else {
            me.columnCantPre = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Presupuestada",
                width: 75,
                sortable: true,
                dataIndex: "CANT_PRE"
            });
            me.columnCunetaContable = Ext.create("Ext.grid.column.Column", {
                header: "Cuenta<br>Contable",
                width: 70,
                sortable: true,
                dataIndex: "CODCUENTA"
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                hidden: true,
                //items: [
                //    {
                //        iconCls: 'delete',
                //        tooltip: 'Eliminar',
                //        //hidden: me.btnEliminarRecord,
                //        handler: me.handler
                //    }]
            });
        }
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Poste/Conductor", width: 70, sortable: true, dataIndex: "CODIGO" },
           { header: "Unidad/Constructiva", width: 70, sortable: true, dataIndex: "CODIGO_UC" },
            { header: "Tipo <br>Item", width: 55, sortable: true, dataIndex: "TIPO_PROD" },
            { header: "Codigo<br>Item", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            me.columnCantPre,
            me.columnCunetaContable,
            me.columnAction

        ];
    },
    CargarDevolucionesMateriales: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesDevolucion");
        if (me.editar) {
            me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
            ];
            me.columnCantDev = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Devolucion",
                width: 75,
                sortable: true,
                dataIndex: "CANT_DEV",
                editor: {
                    xtype: 'numberfield',
                }
            });
            me.columnObservacion = Ext.create("Ext.grid.column.Column", {
                header: "Observacion",
                width: 150,
                sortable: true,
                hidden: true,
                dataIndex: "OBSERVACION",
                editor: {
                    xtype: 'textfield',
                }
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                items: [
                    {
                        iconCls: 'delete',
                        tooltip: 'Eliminar',
                        handler: me.handler
                    }]
            });
        }
        else {
            me.columnCantDev = Ext.create("Ext.grid.column.Column", {
                header: "Cantidad<br>Devolucion",
                width: 75,
                sortable: true,
                dataIndex: "CANT_DEV"
            });
            me.columnObservacion = Ext.create("Ext.grid.column.Column", {
                header: "Observacion",
                width: 150,
                sortable: true,
                hidden: true,
                dataIndex: "OBSERVACION"
            });
            me.columnAction = Ext.create("Ext.grid.column.Action", {
                width: 27,
                align: 'center',
                hidden: true,
            });
        }
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 150, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            me.columnCantDev,
            me.columnObservacion,
            me.columnAction

        ];
    },
    CargarMaterialesEjecutados: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesMaterialEjecutado");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            { header: "Cant.<br>Ejecutada", width: 100, sortable: true, dataIndex: "CANTIDAD" },
        ];
    },
    CargarMaterialesPreEjeDev: function () {
        var me = this;
        me.store = Ext.create("App.Store.OrdenesTrabajo.DetallesMaterialPreEjeDev");
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_PROD" },
            { header: "Detalle", width: 200, sortable: true, dataIndex: "DESC_PROD" },
            { header: "Unidad", width: 55, sortable: true, dataIndex: "UNID_PROD" },
            { header: "Cant.<br>Presupuestada", width: 90, sortable: true, dataIndex: "CANT_PRE" },
            {    text: 'Materiales de Vales', columns: [
                { header: "Vale <br>Normal", width: 60, sortable: false, dataIndex: "CANT_VAL_N" },
                { header: "Vale <br>Incremental", width: 60, sortable: false, dataIndex: "CANT_VAL_I" },
                { header: "Vale <br>Cambio", width: 60, sortable: false, dataIndex: "CANT_VAL_C" },
                ]
            },
            { header: "Cant.<br>Ejecutada", width: 90, sortable: true, dataIndex: "CANT_EJE" },
            { header: "Cant.<br>Devoluciones", width: 90, sortable: true, dataIndex: "CANT_DEV" },
            { header: "Total", width: 90, sortable: true, dataIndex: "TOTAL" },
        ];
    }
});

