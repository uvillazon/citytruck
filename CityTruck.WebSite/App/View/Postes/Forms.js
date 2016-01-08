Ext.define("App.View.Postes.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormPoste") {
            me.title = "Datos del Poste";
            me.CargarFormPoste();

        }
        else if (me.opcion == 'FormUC') {
            me.title = "Datos de la Unidad Constructiva";
            me.CargarFormUC();
        }
        else if (me.opcion == 'FormMaterial') {
            me.title = "Datos del Material";
            me.CargarFormMaterial();
        }
        else if (me.opcion == "FormImagen") {
            me.columns = 1,
            me.CargarFormImagen();
        }
        else if (me.opcion == "FormConfiguracionPoste") {
            me.columns = 1;
            me.title = "Formulario de Configuracion Poste y Unidades Constructivas";
            me.CargarFormConfiguracionPoste();
        }
        else if (me.opcion == "FormConfiguracionUC") {
            me.columns = 1;
            me.CargarFormConfiguracionUC();
        }
        else if (me.opcion == 'FormConfiguracionCodSol') {
            me.columns = 1;
            me.CargarFormConfiguracionCodSol();
        }
        else if (me.opcion == 'FormConfiguracionCodMan') {
            me.columns = 1;
            me.CargarFormConfiguracionCodMan();
        }
        else if (me.opcion == 'FormConfiguracionPosteOT') {
            me.columns = 1;
            me.title = "Formulario de Configuracion Poste Intervenidos en una OT";
            me.CargarFormConfiguracionPosteOT();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormPoste: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_POSTE",
            hidden: true,
        });
        me.txt_cod_poste = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo Poste",
            name: "COD_POSTE",
            width: 240,
            maxLength: 20,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_area_ubic = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Sistema",
            name: "AREA_UBIC",
            width: 240,
            maxLength: 8,
        });
        me.txt_ubicacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ubicacion",
            name: "UBICACION",
            width: 480,
            colspan: 2,
            maxLength: 100,
        });
        me.num_cod_tipo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cod Tipo",
            name: "COD_TIPO",
            width: 240,
            maxLength: 5,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_desc_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descripcion Tipo",
            name: "DESC_TIPO",
            width: 240,
            maxLength: 30,
        });
        me.dat_fecha_oper = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Operacion",
            name: "FECHA_OPER",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [
        me.txt_id,
        me.txt_cod_poste,
        me.txt_area_ubic,
        me.txt_ubicacion,
        me.num_cod_tipo,
        me.txt_desc_tipo,
        me.dat_fecha_oper,
        me.txt_estado,
        ];
    },
    CargarFormUC: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_UC",
            hidden: true,
        });
        me.txt_cod_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo UC",
            name: "COD_UC",
            width: 240,
            maxLength: 20,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_desc_corta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Desc Corta",
            name: "DESC_CORTA",
            width: 480,
            colspan: 2,
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            colspan: 2,
        });

        me.txt_tension = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tension",
            name: "TENSION",
            width: 240,
            maxLength: 30,
        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo de Estructura",
            name: "TIPO_ESTRUC",
            width: 240,
        });
        me.items = [
        me.txt_id,
        me.txt_cod_uc,
        me.txt_desc_corta,
        me.txt_descripcion,
        me.txt_tension,
        me.txt_desc_tipo,
        me.txt_tipo,
        ];
    },
    CargarFormMaterial: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "IDPRODUCTO",
            hidden: true,
        });
        me.txt_cod_uc = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo Material",
            name: "COD_ALTERNATIVO",
            width: 240,
            maxLength: 20,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_desc_corta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Desc Corta",
            name: "DESC_CORTA",
            width: 480,
            colspan: 2,
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            colspan: 2,
        });
        me.items = [
        me.txt_id,
        me.txt_cod_uc,
        me.txt_desc_corta,
        me.txt_descripcion,
        ];
    },
    CargarFormImagen: function () {
        var me = this;
        me.txt_desc = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Descripción',
            name: 'DESCRIPCION',
            width: 480,
        });
        this.items = [me.txt_desc, {
            xtype: 'filefield',
            emptyText: 'Seleccione una Imagen o Archivo',
            fieldLabel: 'Archivo',
            name: 'URLIMAGEN',
            buttonText: 'Buscar Archivo.',
            buttonConfig: {
                iconCls: 'image_add'
            }

        }];
    },
    CargarFormConfiguracionPoste: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_POSTE',
            hidden: true,
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Codigo Poste',
            name: 'COD_POSTE',
            width: 480,
            readOnly: true,
        });
        me.store_uc = Ext.create("App.Store.Postes.UnidadesConstructivasCatalogo");
        me.cbx_unidadConstructivas = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Unidad Constructivas',
            displayField: 'COD_UC',
            valueField: 'ID_UC',
            name: 'ID_UC',
            colspan: 1,
            store: me.store_uc,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<img src="' + Constantes.getUrlImagen() + 'id={ID_UC}&tamano=150&TABLA=MN_UNIDADES_CONS" /><h3>{COD_UC} - {DESCRIPCION}</h3>';
            },
        });

        me.grid = Ext.create("App.View.Postes.GridUnidadesConstructivas", { cargarStore: false, opcion: 'GridUnidadesConstructivas' });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirUC', 'añadir UC', Constantes.ICONO_CREAR, me.eventosPoste, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarUC', 'Quitar UC', Constantes.ICONO_BAJA, me.eventosPoste, me.toolbar, this);

        me.grid.addDocked(me.toolbar, 1);
        this.items = [
            me.txt_id,
            me.txt_codigo,
            me.cbx_unidadConstructivas,
            me.grid
        ];

    },
    MostrarWindowImagen: function (tabla, id) {
        var me = this;
        me.tabla = tabla;
        me.idTabla = id;
        if (me.winArchivo == null) {
            me.winArchivo = Ext.create("App.Config.Abstract.Window", { botones: true });
            me.winArchivo.add(me);
            me.winArchivo.btn_guardar.on('click', me.GuardarImagen, this);
            me.winArchivo.show();

        }
        else {
            me.winArchivo.show();

        }

    },
    GuardarImagen: function () {
        var me = this;
        //Funciones.
        Funciones.AjaxRequestWin("Imagen", "GuardarImagen", me.winArchivo, me, null, 'Esta seguro de Guardar la Imagen?', { TABLA: me.tabla, ID_TABLA: me.idTabla }, me.winArchivo);
    },
    eventosPoste: function (btn) {
        var me = this;
        if (btn.getItemId() == 'btn_añadirUC') {
            if (me.getForm().isValid()) {
                var CodigoUC = me.cbx_unidadConstructivas.datos[0].get('COD_UC');
                Funciones.AjaxRequestForm("Postes", "CrearUCporPoste", me, me, me.grid, null, { CODIGO_UC: CodigoUC }, null);
            }
            else {
                Ext.Msg.alert("Error","Complemente el formulario");
            }
        }
        else if (btn.getItemId() == "btn_QuitarUC") {
            var data = me.grid.getSelectionModel().getSelection()[0];
            if (data != null) {
                Funciones.AjaxRequestGrid("Postes", "EliminarRelPosteUC", me, "Esta Seguro de Quitar la Relacion UC con POSTE", { ID_POSTE: data.get('ID_POSTE'), ID_UC: data.get('ID_UC') }, me.grid);
                //Funciones.AjaxRequestForm("Postes", "EliminarRelPosteUC", me, me, me.grid, null, { ID_POSTE : data.get('ID_POSTE') , ID_UC : data.get('ID_UC') }, null);
            }
            else {
                Ext.msg.alert("Error", "Seleccione una Unidad Constructiva.");
            }
        }
            //EliminarRelPosteUC
        else if (btn.getItemId() == 'btn_añadirCodMan') {
            Funciones.AjaxRequestForm("Codigos", "CrearCodigoMantenimientoUC", me, me, me.grid, null, null, null);
        }
        else if (btn.getItemId() == 'btn_añadirMat') {
            Funciones.AjaxRequestForm("Codigos", "CresarMaterialCodigoSolucion", me, me, me.grid, null, null, null);
        }
        else if (btn.getItemId() == 'btn_añadirCodSol') {
            Funciones.AjaxRequestForm("Codigos", "CrearCodigoSolucionCodigoMantenimiento", me, me, me.grid, null, null, null);
        }
        else if (btn.getItemId() == 'btn_añadirPoste') {
            Funciones.AjaxRequestForm("OrdenesTrabajo", "CrearPosteIntervenido", me, me, me.grid, null, null, null);
        }
        else if (btn.getItemId() == "btn_QuitarPoste") {
            var data = me.grid.getSelectionModel().getSelection()[0];
            if (data != null) {
                Funciones.AjaxRequestGrid("OrdenesTrabajo", "EliminarPosteIntervenido", me, "Esta Seguro de Eliminar el Poste Intervenido asociado a una OT", { ID_POSTE: data.get('ID_POSTE'), ID_OT: me.txt_ot.getValue() }, me.grid);
                //Funciones.AjaxRequestForm("Postes", "EliminarRelPosteUC", me, me, me.grid, null, { ID_POSTE : data.get('ID_POSTE') , ID_UC : data.get('ID_UC') }, null);
            }
            else {
                Ext.msg.alert("Error", "Seleccione un Poste.");
            }
        }
        else {
            alert("No seleccione ninguna opcion");
        }
    },
    CargarFormConfiguracionUC: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_UC',
            hidden: true,
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Codigo Unidad Constructiva',
            name: 'COD_UC',
            width: 480,
            readOnly: true,
        });
        me.store_codMan = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.cbx_codigoMantenimiento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mantenimiento',
            displayField: 'COD_MAN',
            valueField: 'ID_COD_MAN',
            name: 'ID_COD_MAN',
            colspan: 1,
            store: me.store_codMan,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_MAN} - {DESCRIP_MAN}</h3>';
            }
        });

        me.grid = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { cargarStore: false, opcion: 'GridCodigoMantenimiento' });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirCodMan', 'añadir Codigo Mant.', Constantes.ICONO_CREAR, me.eventosPoste, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarCodMan', 'Quitar Codigo Mant.', Constantes.ICONO_BAJA, me.eventosPoste, me.toolbar, this);
        Funciones.CrearMenu('btn_añadirCodSol', 'añadir Codigo Sol. a Cod Mant.', Constantes.ICONO_CREAR, me.eventosPoste, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        this.items = [
            me.txt_id,
            me.txt_codigo,
            me.cbx_codigoMantenimiento,
            me.grid
        ];
    },
    CargarFormConfiguracionCodSol: function () {
        var me = this;
        me.store_cod = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'ID_COD_SOL',
            name: 'ID_COD_SOL',
            width: 480,
            store: me.store_cod,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            }
        });

        me.store_material = Ext.create("App.Store.Postes.Materiales");
        me.cbx_material = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Material',
            displayField: 'COD_ALTERNATIVO',
            valueField: 'IDPRODUCTO',
            name: 'IDPRODUCTO',
            width: 480,
            store: me.store_material,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_ALTERNATIVO} - {DESCRIPCION}</h3>';
            }
        });

        me.grid = Ext.create("App.View.Postes.GridMateriales", { cargarStore: false, opcion: 'GridMateriales', imagenes: false });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirMat', 'añadir Codigo Mant.', Constantes.ICONO_CREAR, me.eventosPoste, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarCodMan', 'Quitar Codigo Mant.', Constantes.ICONO_BAJA, me.eventosPoste, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        me.cbx_codigoSolucion.on('select', function (cmb, record) {
            me.grid.getStore().setExtraParam("ID_COD_SOL", record[0].get('ID_COD_SOL'));
            me.grid.getStore().load();
        });
        this.items = [

            me.cbx_codigoSolucion,
            me.cbx_material,
            me.grid
        ];
    },
    CargarFormConfiguracionCodMan: function () {
        var me = this;
        me.store_cod = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.cbx_codigoSolucion = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Solucion',
            displayField: 'COD_SOL',
            valueField: 'ID_COD_SOL',
            name: 'ID_COD_SOL',
            width: 480,
            store: me.store_cod,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_SOL} - {DESCRIP_SOL}</h3>';
            }
        });

        me.store_codMan = Ext.create("App.Store.SolicitudesMantenimiento.CodigosMantenimiento");
        me.cbx_codigoMantenimiento = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Cod. Mantenimiento',
            displayField: 'COD_MAN',
            valueField: 'ID_COD_MAN',
            name: 'ID_COD_MAN',
            colspan: 1,
            width: 480,
            store: me.store_codMan,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_MAN} - {DESCRIP_MAN}</h3>';
            }
        });

        me.grid = Ext.create("App.View.SolicitudesMantenimiento.GridCodigos", { cargarStore: false, opcion: 'GridCodigoSolucion' });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirCodSol', 'añadir Codigo Sol.', Constantes.ICONO_CREAR, me.eventosPoste, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarCodSol', 'Quitar Codigo Sol.', Constantes.ICONO_BAJA, me.eventosPoste, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        me.cbx_codigoMantenimiento.on('select', function (cmb, record) {
            me.grid.getStore().setExtraParam("ID_COD_MAN", record[0].get('ID_COD_MAN'));
            me.grid.getStore().load();
        });
        this.items = [
            me.cbx_codigoMantenimiento,
            me.cbx_codigoSolucion,
            me.grid
        ];
    },
    CargarFormConfiguracionPosteOT: function () {
        var me = this;
        me.txt_id_mn = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ID_COD_MAN',
            hidden: true,
        });
        me.txt_ot = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'nro OT',
            name: 'ID_OT',
            width: 480,
            readOnly: true,
        });
        me.store_poste = Ext.create("App.Store.Postes.Postes");
        me.cbx_codigoPoste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'Postes',
            displayField: 'COD_POSTE',
            valueField: 'ID_POSTE',
            name: 'ID_POSTE',
            colspan: 1,
            width: 480,
            store: me.store_poste,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () {
                return '<h3>{COD_POSTE} - {DESC_TIPO}</h3>';
            }
        });

        me.grid = Ext.create("App.View.Postes.GridPostes", { cargarStore: false });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirPoste', 'añadir Poste.', Constantes.ICONO_CREAR, me.eventosPoste, me.toolbar, this);
        Funciones.CrearMenu('btn_QuitarPoste', 'Quitar Poste.', Constantes.ICONO_BAJA, me.eventosPoste, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        this.items = [
            me.txt_id_mn,
            me.txt_ot,
            me.cbx_codigoPoste,
            me.grid
        ];
    }
});
