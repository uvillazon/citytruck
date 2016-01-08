Ext.define("App.View.Postes.PrincipalUC", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Postedes',
    view: '',
    win: null,
    idTabla: 'ID_UC',
    tabla: 'MN_UNIDADES_CONS',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Postes.GridUnidadesConstructivas', {
            region: 'west',
            height: 350,
            imagenes: false,
            opcion: 'GridUnidadesConstructivasCatalogo'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirImagen', 'Añadir Imagenes1', "image_add", me.CargarImagen, me.toolbar, this);
        Funciones.CrearMenu('btn_configuracionUC', 'Configuracion', "wrench", me.EventoConfiguracion, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        me.CargarPanelImagen();
        me.formulario = Ext.create("App.View.Postes.Forms", { opcion: "FormUC" });
        me.formulario.BloquearFormulario();
        me.form.add(me.formulario);
        //Obtiene el panel Imagen del PrincipalPanel 
        me.form.add(me.panelImagen);
        me.items = [me.grid, me.form
        ];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formulario.CargarDatos(record);
        me.panelImagen.setTitle("Visor de Imagenes - " + record.get('COD_UC'));
        me.ViewImagen.store.setExtraParams({ TABLA: me.Tabla, ID_TABLA: record.get(me.idTabla) });
        me.ViewImagen.store.load();

    },
    EventosBoton: function (btn) {
        var me = this;

        if (btn.getItemId() == '') {

        }
        else {
            alert("No se Selecciono ningun botton");
        }
    },
    EventoConfiguracion: function () {
        me = this;
        if (me.formulario.record != null) {
            if (me.winConfig == null) {
                me.winConfig = Ext.create("App.Config.Abstract.Window", {title : 'Formulario de Configuracion UC y Cod Mant'});
                me.formConfig = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionUC' });
                me.formConfig.loadRecord(me.formulario.record);
                me.formConfig.grid.getStore().setExtraParams({ ID_UC: me.formulario.record.get('ID_UC') });
                me.formConfig.grid.getStore().load();
                me.winConfig.add(me.formConfig);
                me.winConfig.show();
            }

            else {
                me.formConfig.getForm().reset();
                me.formConfig.loadRecord(me.formulario.record);
                me.formConfig.grid.getStore().setExtraParams({ ID_UC: me.formulario.record.get('ID_UC') });
                me.formConfig.grid.getStore().load();
                me.winConfig.show();
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Poste.");
        }
    }
});
