Ext.define("App.View.OrdenesTrabajo.FormDetallePlanilla", {
    extend: "App.Config.Abstract.Form",
    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    columns: 2,
    opcion: '',
    winUC: null,
    initComponent: function () {
        var me = this;

        if (me.opcion == "FormDetalleItem") {
            me.title = "Crear Detalles de Planilla";
            me.CargarDetallePlanilla();
            me.eventosDetallePlanilla();
        }
        else {
            alert("No selecciono ninguna Opcion");
        }
        me.callParent(arguments);
    },

    CargarDetallePlanilla: function () {
        var me = this;
        me.label_poste = Ext.create("Ext.form.Label", {
            text: "Cabecera del Poste o Conductor",
            cls: 'resaltarAzul',
            colspan: 3
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_OT",
            hidden: true,
        });
        //me.label_conductor = Ext.create("Ext.form.Label", {
        //    text: "Cabecera del Conductor",
        //    cls: 'resaltarAzul',
        //    colspan: 3
        //});
        me.label_unidadConstructiva = Ext.create("Ext.form.Label", {
            text: "Cabecera Unidades Constructivas",
            cls: 'resaltarAzul',
            colspan: 3
        });
        me.grpb_grupoBoton = Ext.create("Ext.form.RadioGroup", {
            colspan: 3,
            width: 720,
            vertical: false,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            items: [
                { boxLabel: 'P/ Poste', name: 'rb', inputValue: "POSTE" },
                { boxLabel: 'P/ Conductor', name: 'rb', inputValue: "CONDUCTOR" }
            ]
        });
        me.store_codPoste = Ext.create("App.Store.Postes.Postes");
        me.cbx_poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Poste',
            displayField: 'COD_POSTE',
            valueField: 'COD_POSTE',
            name: 'COD_POSTE',
            colspan: 1,
            store: me.store_codPoste,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_POSTE}&tamano=150&TABLA=MN_POSTES" /> <h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
                return '<h3>{COD_POSTE} - {DESC_TIPO} - {AREA_UBIC}</h3>';
            },
        });
        me.cmp_cod_poste = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: '',
            btn_iconCls: 'wrench',
            btn_tooltip: 'Configurar Poste Por OT',
            colspan: 1,
            componente: me.cbx_poste,
        });
        me.num_pique = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Piquete",
            name: "PIQUETE",
            maxLength: 2,
            colspan: 2,
            maxValue: 99,
            allowNegative: false,
            allowDecimals: false
        });
        me.store_cnd = Ext.create("App.Store.Postes.Conductores");
        me.cbx_conductor = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Conductor',
            displayField: 'COD_CONDUCTOR',
            valueField: 'COD_CONDUCTOR',
            name: 'COD_CONDUCTOR',
            colspan: 1,
            width: 190,
            labelWidth: 80,
            store: me.store_cnd,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_CONDUCTOR} - {DESC_TIPO} - {AREA_UBIC}</h3>';
            },
        });
        me.store_codMan = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.cbx_codigoMantenimientoConductor = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mant. Conductor',
            displayField: 'COD_MAN',
            valueField: 'COD_MAN',
            name: 'COD_MAN_CND',
            colspan: 1,
            width: 170,
            labelWidth: 100,
            store: me.store_codMan,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_MAN} - {DESCRIP_MAN}</h3>';
            }
        });
        me.txt_formacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Formacion",
            name: "FORMACION",
            readOnly: true,
            width : 190,
            labelWidth : 80,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_desc_cnd = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_MAN_CONDUCTOR",
            maxLength: 500,
            width: 200,
        });
        me.cnt_conductor = Ext.create("App.Config.Componente.FieldContainerBase", {
            columns: 4,
            colspan: 3,
            cmpArray: [me.cbx_conductor, me.txt_formacion, me.cbx_codigoMantenimientoConductor, me.txt_desc_cnd]
        });
        me.store_uc = Ext.create("App.Store.Postes.UnidadesConstructivas");
        me.cbx_unidadConstructivas = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Unidad Constructivas',
            displayField: 'COD_UC',
            valueField: 'COD_UC',
            name: 'COD_UC',
            colspan: 1,
            //width: 220,
            store: me.store_uc,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                //return '<img src="' + Constantes.getUrlImagen() + 'id={ID_UC}&tamano=150&TABLA=MN_UNIDADES_CONS" /><h3>{COD_UC} - {DESCRIPCION}</h3>';
                return '<h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
        });
        me.txt_desc_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION",
            maxLength: 500,
            width: 240,
        });
        me.cmp_cod_uc = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: '',
            btn_iconCls: 'wrench',
            btn_tooltip: 'Configurar Poste Unidad Constructivas',
            colspan: 2,
            columns : 3,
            botton: true,
            cmpArray: [me.cbx_unidadConstructivas, me.txt_desc_uc]
            //componente: ,
        });
        
        me.store_codManUC = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.cbx_codigoMantenimiento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mantenimiento UC',
            displayField: 'COD_MAN',
            valueField: 'COD_MAN',
            name: 'COD_MAN_UC',
            //colspan: 3,
            width: 240,
            store: me.store_codManUC,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_MAN} - {DESCRIP_MAN}</h3>';
            }
        });
        me.txt_cod_man = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_MAN",
            maxLength: 500,
            width: 240,
        });
        me.cnt_codman = Ext.create("App.Config.Componente.FieldContainerBase", {
            columns: 2,
            colspan: 2,
            cmpArray: [me.cbx_codigoMantenimiento, me.txt_cod_man]
        });
        me.store_codSol = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'COD_SOL',
            name: 'COD_SOL',
            //colspan: 1,
            width: 240,
            store: me.store_codSol,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            }
        });
        me.txt_cod_sol = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIP_SOL",
            maxLength: 500,
            width: 240,
        });
        me.cmp_cod_sol = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Materiales',
            btn_iconCls: 'add',
            btn_tooltip: 'Cargar Materiales',
            btn_id: 'btn_materiales_add',
            colspan: 3,
            columns : 3,
            botton: true,
            cmpArray: [me.cbx_codigoSolucion, me.txt_cod_sol],
            //componente: me.cbx_codigoSolucion,
        });
        me.store_otros_materiales = Ext.create("App.Store.Postes.Materiales");
        me.cbx_materiales = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Materiales',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'COD_ALTERNATIVO',
            name: 'COD_ALTERNATIVO',
            //colspan: 1,
            width: 240,
            store: me.store_otros_materiales,
            textoTpl: function () {
                return '<h3>{COD_ALTERNATIVO} - {DESCRIPCION}</h3>';
            }
        });
        me.txt_cod_mat = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "DESCRIPCION_MAT",
            maxLength: 500,
            width: 240,
        });
        me.cmp_materiales = Ext.create("App.Config.Componente.FieldContainerBase", {
            btn_titulo: 'Agregar Material',
            btn_iconCls: 'add',
            btn_tooltip: 'Se Agregar los materiales seleccionados',
            btn_id: 'btn_material_otros_add',
            colspan: 3,
            columns: 3,
            botton: true,
            cmpArray: [me.cbx_materiales, me.txt_cod_mat],
            //componente: me.cbx_codigoSolucion,
        });
        me.num_cantidadUC = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad Cod Man",
            name: "CANTIDAD",
            maxLength: 2,
            maxValue: 99,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_nivelUC = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nivel UC",
            name: "NIVEL",
            maxLength: 2,
            maxValue: 99,
            allowNegative: false,
            allowDecimals: false
        });
        me.num_cantidadAcometida = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad Acometida",
            name: "CANT_ACOM",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });
        me.num_distanciaAproximada = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Distancia Aproximada al Camino",
            name: "DIST_POS_CAMI",
            maxLength: 10,
            maxValue: 9999999999,
            allowNegative: false,
            allowDecimals: false
        });
        me.cbx_ap = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: 'Cantidad Acometida',
            name: 'AP',
            store: ["SI", "NO"],
        });
        me.store_materiales = Ext.create("App.Store.Postes.Materiales");
        //me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_AgregarMaterial', "Agregar Materiales", "add", me.EventosBotonDetallePlanilla, me.toolbar, this);
        //Funciones.CrearMenu('btn_QuitarMaterial', "Quitar Materiales", "delete", me.EventosBotonDetallePlanilla, me.toolbar, this);
        me.gridDetalleMaterial = Ext.create("App.View.Postes.Grids", { opcion: 'GridMaterialSolucionesEditar', width: 740, height: 200, colspan: 3 });
        //me.gridDetalleMaterial.addDocked(me.toolbar, 1);

        me.items = [
            me.txt_id,
            me.grpb_grupoBoton,
            me.label_poste,
            me.cmp_cod_poste,
            me.num_pique,
            //me.cbx_codigoMantenimientoPoste,
            //me.label_conductor,
            //me.cbx_conductor,
            //me.txt_formacion,
            //me.cbx_codigoMantenimientoConductor,
            me.cnt_conductor,
            me.label_unidadConstructiva,
            me.cmp_cod_uc,
           
            me.num_nivelUC,
            me.cnt_codman,
            me.num_cantidadUC,
            me.cmp_cod_sol,
            me.cmp_materiales,
            me.num_cantidadAcometida,
            me.cbx_ap,
            me.num_distanciaAproximada,
            me.gridDetalleMaterial
        ];
    },
    eventosDetallePlanilla: function () {
        var me = this;
        me.grpb_grupoBoton.on('change', me.CargarRadioButton, this);
        me.cbx_conductor.on('select', function (cmb, record) {
            me.txt_formacion.setValue(record[0].get('FORMACION'));
        });
        me.cbx_poste.on('select', function (cmb, record) {
            
            //Funciones.resetForm(me, ["rb"]);
            Funciones.resetCmpArray([me.cbx_unidadConstructivas, me.txt_desc_uc, me.cbx_codigoMantenimiento, me.txt_cod_man, me.cbx_codigoSolucion, me.txt_cod_sol, me.cbx_materiales, me.txt_cod_mat]);
            me.store_uc.setExtraParam("ID_POSTE", record[0].get('ID_POSTE'));
            me.store_uc.load();
        });
        me.cbx_unidadConstructivas.on('select', function (cmb, record) {
            me.store_codManUC.setExtraParam("ID_UC", record[0].get('ID_UC'));
            me.store_codManUC.load();
            me.txt_desc_uc.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_unidadConstructivas.on('focus', function () {
            me.store_uc.load();
        });
        me.cbx_codigoMantenimiento.on('select', function (cmb, record) {
            me.store_codSol.setExtraParam("ID_COD_MAN", record[0].get('ID_COD_MAN'));
            me.store_codSol.load();
            me.txt_cod_man.setValue(record[0].get('DESCRIP_MAN'));
        });
        me.cbx_codigoMantenimientoConductor.on('select', function (cmb, record) {
            me.store_codSol.setExtraParam("ID_COD_MAN", record[0].get('ID_COD_MAN'));
            me.store_codSol.load();
            me.txt_desc_cnd.setValue(record[0].get('DESCRIP_MAN'));
        });
        me.cbx_materiales.on('select', function (cmb, record) {
            me.txt_cod_mat.setValue(record[0].get('DESCRIPCION'));
        });
        me.cbx_codigoSolucion.on('select', function (cmb, record) {
            me.store_materiales.setExtraParam("ID_COD_SOL", record[0].get('ID_COD_SOL'));
            me.store_materiales.load();
            me.txt_cod_sol.setValue(record[0].get('DESCRIP_SOL'));
        });
        me.cmp_materiales.btn.on('click', me.cargarOtrosMateriales, me);

        me.cmp_cod_uc.btn.on('click', me.cargarVentanaUC, this);
        me.cmp_cod_poste.btn.on('click', me.cargarVentanaPosteOT, this);
        me.cmp_cod_sol.btn.on('click', function () {
            if (me.isValid()) {
                if (me.store_materiales.count() > 0) {
                    var codigo = "";
                    var id_poste = 0;
                    var id_conductor = 0;
                    if (me.cbx_poste.isDisabled() == true) {
                        var recordConductor = me.cbx_conductor.datos[0];
                        id_poste = 0;
                        id_conductor = recordConductor.get('ID_CONDUCTOR');
                        codigo = recordConductor.get('COD_CONDUCTOR');
                        formacion = recordConductor.get('FORMACION');
                    }
                    else {
                        var recordPuesto = me.cbx_poste.datos[0];
                        id_conductor = 0;
                        id_poste = recordPuesto.get('ID_POSTE');
                        codigo = recordPuesto.get('COD_POSTE');
                        formacion = null;
                    }
                    var recordUC = me.cbx_poste.isDisabled() ? null : me.cbx_unidadConstructivas.datos[0];
                    me.store_materiales.each(function (record) {
                        if (me.gridDetalleMaterial.getStore().existeRecord('IDPRODUCTO', record.get('IDPRODUCTO')) && (me.gridDetalleMaterial.getStore().existeRecord('COD_SOL', me.cbx_codigoSolucion.datos[0].get('COD_SOL')))) {
                            //Ext.MessageBox.alert('Error', "Ya Selecciono Ese Material");
                        }
                        else {
                            var rec = Ext.create("App.Model.OrdenesTrabajo.DetalleMaterial", {
                                IDPRODUCTO: record.get('IDPRODUCTO'),
                                ID_POSTE: id_poste,
                                ID_CONDUCTOR: id_conductor,
                                FORMACION_CND : formacion,
                                CODIGO: codigo,
                                ID_UC: me.cbx_poste.isDisabled()? null :recordUC.get('ID_UC'),
                                COD_UC: me.cbx_poste.isDisabled()? null : recordUC.get('COD_UC'),
                                TENSION: me.cbx_poste.isDisabled() ? null : recordUC.get('TENSION'),
                                DESCRIPCION_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('DESCRIPCION'),
                                ID_COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('ID_COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                                COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                                COD_ALTERNATIVO: record.get('COD_ALTERNATIVO'),
                                DESCRIPCION: record.get('DESCRIPCION'),
                                UNIDAD: record.get('IDUNIDAD'),
                                CANT_PRE: 1,
                                CANTIDAD: me.num_cantidadUC.isDisabled() ? 1 : me.num_cantidadUC.getValue(),
                                ID_COD_SOL: me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                                COD_SOL: me.cbx_codigoSolucion.datos[0].get('COD_SOL')
                            });
                            me.gridDetalleMaterial.getStore().insert(0, rec);
                            me.gridDetalleMaterial.getView().refresh();
                        }
                    });
                }
                else {
                    Ext.Msg.alert("Aviso", "No Existe Materiales para Agregar Seleccione otro Codigo de solucion que Contenga  Materiales");
                }
            }
            else {
                Ext.Msg.alert("Error", "Complete el Formulario para Agregar un material");
            }
        });
    },
    cargarOtrosMateriales : function(){
        var me = this;
        if (me.isValid() && me.cbx_materiales.getValue()!= null) {
            var codigo = "";
            var id_poste = 0;
            var id_conductor = 0;
            if (me.cbx_poste.isDisabled() == true) {
                var recordConductor = me.cbx_conductor.datos[0];
                id_poste = 0;
                id_conductor = recordConductor.get('ID_CONDUCTOR');
                codigo = recordConductor.get('COD_CONDUCTOR');
                formacion = recordConductor.get('FORMACION');
            }
            else {
                var recordPuesto = me.cbx_poste.datos[0];
                id_conductor = 0;
                id_poste = recordPuesto.get('ID_POSTE');
                codigo = recordPuesto.get('COD_POSTE');
                formacion = null;
            }
            var record = me.cbx_materiales.datos[0];
            if (me.gridDetalleMaterial.getStore().existeRecord('IDPRODUCTO', record.get('IDPRODUCTO')) && (me.gridDetalleMaterial.getStore().existeRecord('COD_SOL', me.cbx_codigoSolucion.datos[0].get('COD_SOL')))) {
                Ext.MessageBox.alert('Error', "Ya Selecciono Ese Material con esa solucion Seleccione Otra");
            }
            else {
                
                var recordUC = me.cbx_poste.isDisabled() ? null : me.cbx_unidadConstructivas.datos[0];
                var rec = Ext.create("App.Model.OrdenesTrabajo.DetalleMaterial", {
                    IDPRODUCTO: record.get('IDPRODUCTO'),
                    ID_POSTE: id_poste,
                    ID_CONDUCTOR: id_conductor,
                    FORMACION_CND: formacion,
                    CODIGO: codigo,
                    ID_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('ID_UC'),
                    COD_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('COD_UC'),
                    TENSION: me.cbx_poste.isDisabled() ? null : recordUC.get('TENSION'),
                    DESCRIPCION_UC: me.cbx_poste.isDisabled() ? null : recordUC.get('DESCRIPCION'),
                    ID_COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('ID_COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('ID_COD_MAN'),
                    COD_MAN: me.cbx_poste.isDisabled() ? me.cbx_codigoMantenimientoConductor.datos[0].get('COD_MAN') : me.cbx_codigoMantenimiento.datos[0].get('COD_MAN'),
                    COD_ALTERNATIVO: record.get('COD_ALTERNATIVO'),
                    DESCRIPCION: record.get('DESCRIPCION'),
                    UNIDAD: record.get('IDUNIDAD'),
                    CANT_PRE: 1,
                    CANTIDAD: me.num_cantidadUC.isDisabled() ? 1 : me.num_cantidadUC.getValue(),
                    ID_COD_SOL: me.cbx_codigoSolucion.datos[0].get('ID_COD_SOL'),
                    COD_SOL: me.cbx_codigoSolucion.datos[0].get('COD_SOL')
                });
                me.gridDetalleMaterial.getStore().insert(0, rec);
                me.gridDetalleMaterial.getView().refresh();
            }
        }
        else {
            Ext.Msg.alert("Error", "Complete el Formulario para Agregar un material o Seleccione un Material para Añadir a DETALLE...");
        }
    },
    cargarVentanaUC: function () {
        var me = this;
        if (me.cbx_poste.getValue() != null) {
            if (me.winPoste == null) {
                me.winPoste = Ext.create("App.Config.Abstract.Window");
                me.formConfigPuesto = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPoste' });
                me.formConfigPuesto.loadRecord(me.cbx_poste.datos[0]);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: me.cbx_poste.datos[0].get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.add(me.formConfigPuesto);
                me.winPoste.show();
            }
            else {
                me.formConfigPuesto.getForm().reset();
                me.formConfigPuesto.loadRecord(me.cbx_poste.datos[0]);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: me.cbx_poste.datos[0].get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winPoste.show();
            }
        }
        else {
            Ext.Msg.alert("Error", "Seleccione Primero un Poste para Configurar UC con Postes")
        }
    },
    cargarVentanaPosteOT: function () {
        var me = this;

        if (me.winPosteOT == null) {
            me.winPosteOT = Ext.create("App.Config.Abstract.Window");
            me.formConfigPuestoOT = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPosteOT' });
            me.formConfigPuestoOT.loadRecord(me.OT);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: me.OT.get('ID_OT') });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.add(me.formConfigPuestoOT);
            me.winPosteOT.show();
        }
        else {
            me.formConfigPuestoOT.getForm().reset();
            me.formConfigPuestoOT.loadRecord(me.OT);
            me.formConfigPuestoOT.grid.getStore().setExtraParams({ ID_OT: me.OT.get('ID_OT') });
            me.formConfigPuestoOT.grid.getStore().load();
            me.winPosteOT.show();
        }
    },
    CargarRadioButton: function (rdb, newValue, oldValue, eOpts) {
        var me = this;
        if (newValue.rb == "POSTE") {
            Funciones.resetForm(me, ["rb"]);
            me.DesbloquearFormulario(["COD_CONDUCTOR", "FORMACION", "COD_MAN_CND", "DESCRIP_MAN_CONDUCTOR"]);
            //me.gridDetalleMaterial.getStore().removeAll();
            //me.gridDetalleMaterial.getView().refresh();
        }
        else {
            Funciones.resetForm(me, ["rb"]);
            me.BloquearFormulario(["COD_CONDUCTOR", "FORMACION", "COD_MAN_CND", "COD_SOL", "DESCRIP_SOL", "rb", "btn_materiales_add", "btn_material_otros_add", "DESCRIPCION_MAT", "COD_ALTERNATIVO", "CANT_PRE", "DESCRIP_MAN_CONDUCTOR"]);
            //me.gridDetalleMaterial.getStore().removeAll();
            //me.gridDetalleMaterial.getView().refresh();
        }
    },
    //Cargar Postes y Conductores de una ot usado para Formulario Planilla
    CargarOT: function (record) {
        //alert(record.get('ID_OT'));
        //this.txt_id.setValue()
        this.OT = record;
        this.store_codPoste.setExtraParam("ID_OT", record.get('ID_OT'));
        this.store_cnd.setExtraParam("ID_OT", record.get('ID_OT'));
        this.store_codPoste.load();
        this.store_cnd.load();
    },
    ValidarValoresGrid: function (store1, store2) {
        var me = this;
        store2.each(function (record) {
            if (store1.existeRecord('ID_PRODUCTI', record.get('ID_PRODUCTO'))) {
                alert("Existe ese Producto" || record.get('ID_PRODUCTO'));
                return false;
            }
        });

    }
});
