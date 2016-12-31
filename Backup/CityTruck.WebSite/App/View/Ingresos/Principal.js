Ext.define("App.View.Ingresos.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Ingresos',
    accionGrabar: 'GrabarIngresos',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearIngreso', 'Crear Ingreso', Constantes.ICONO_CREAR, me.EventosIngreso, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', Constantes.ICONO_IMPRIMIR, me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', Constantes.ICONO_EDITAR, me.EventosIngreso, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Ingresos.GridIngresos', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridIngresos',
            toolbar: me.toolbar

        });
        me.items = [me.grid];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
        me.id_ingreso = record.get('ID_INGRESO');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
    },
    EventosIngreso: function (btn) {
        var me = this;
        Funciones.checkTimeout();
        switch (btn.getItemId()) {
            case "btn_CrearIngreso":
                me.MostrarFormIngreso(true);
                break;
            case "btn_Detalle":
                me.MostrarFormIngreso(false, false);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    MostrarFormIngreso: function (isNew, block) {
        var me = this;

        if (me.winCrearIngreso == null) {
            me.winCrearIngreso = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
            me.formIngreso = Ext.create("App.View.Ingresos.FormIngreso", {
                columns: 1,
                title: 'Registro de Otros Ingresos ',
                botones: false,
                dockButtons: true
            });

            me.winCrearIngreso.add(me.formIngreso);
            me.winCrearIngreso.btn_guardar.on('click', me.GuardarIngresos, this);
            me.formIngreso.down('#docked_modificar').on('click', me.ModificarIngresos, this);
            me.formIngreso.down('#docked_eliminar').on('click', me.EliminarRegistro, this);
            me.formIngreso.down('#docked_comprobante').on('click', me.ImprimirComprobante, this);
        } else {
            me.formIngreso.getForm().reset();
            me.formIngreso.CargarStore();
        }
        if (!isNew && me.recordSelected) {
            me.formIngreso.mostrarSaldos(false);
            me.formIngreso.CargarStore();
            me.formIngreso.CargarDatos(me.recordSelected);
            me.formIngreso.down('#docked').setDisabled(false);
            me.winCrearIngreso.btn_guardar.setDisabled(true);
            me.formIngreso.habilitarFormulario(false);
        } else {
            me.formIngreso.mostrarSaldos(true);
            me.formIngreso.down('#docked').setDisabled(true);
            me.winCrearIngreso.btn_guardar.setDisabled(false);
            me.formIngreso.habilitarFormulario(true, true);
        }

        me.winCrearIngreso.show();
    },
    GuardarIngresos: function () {
        var me = this;
        Funciones.AjaxRequestWin('Ingresos', 'GuardarIngreso', me.winCrearIngreso, me.formIngreso, me.grid, 'Esta Seguro de Guardar el Ingreso?', null, null, 'ID_INGRESO');
        me.formIngreso.down('#docked').setDisabled(false);
        me.winCrearIngreso.btn_guardar.setDisabled(true);
        me.formIngreso.mostrarSaldos(false);
    },

    ModificarIngresos: function () {
        var me = this;
        me.formIngreso.habilitarFormulario(true);
        me.winCrearIngreso.btn_guardar.setDisabled(false);
    },

    EliminarRegistro: function () {
        var me = this;
        me.id_ingreso = me.formIngreso.txt_id.getValue();
        Funciones.AjaxRequestGrid("Ingresos", "EliminarIngreso", me, "Esta Seguro de Eliminar el Ingreso", { ID_INGRESO: me.id_ingreso }, me.grid, me.winCrearIngreso);
    },

    ImprimirComprobante: function () {
        var me = this;
        var id = me.formIngreso.txt_id.getValue();
        window.open(Constantes.HOST + 'ReportesPDF/ReporteIngreso?ID=' + id);
    }

});
