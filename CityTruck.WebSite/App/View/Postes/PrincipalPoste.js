Ext.define("App.View.Postes.PrincipalPoste", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Responsables',
    accionGrabar: 'GrabarResponsableSP',
    view: '',
    idTabla: 'ID_POSTE',
    tabla : 'MN_POSTES',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Postes.GridPostes', {
            region: 'west',
            height: 350,
            imagenes : false,
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirImagen', 'Añadir Imagenes', "image_add", me.CargarImagen, me.toolbar, this);
        Funciones.CrearMenu('btn_configuracionPoste', 'Configuracion', "wrench", me.EventoConfiguracion, me.toolbar, this);

        me.grid.addDocked(me.toolbar, 1);

        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        me.CargarPanelImagen();
        me.formulario = Ext.create("App.View.Postes.Forms", { opcion: "FormPoste" });
        me.formulario.BloquearFormulario();
        me.form.add(me.formulario);
        //Obtiene el panel Imagen del PrincipalPanel 
        me.form.add(me.panelImagen);
        me.items = [me.grid  , me.form
        ];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
        var me = this;
        me.formulario.CargarDatos(record);
        me.panelImagen.setTitle("Visor de Imagenes - "+record.get('COD_POSTE'));
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
                me.winConfig = Ext.create("App.Config.Abstract.Window");
                me.formConfigPuesto = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionPoste'  });
                me.formConfigPuesto.loadRecord(me.formulario.record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: me.formulario.record.get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winConfig.add(me.formConfigPuesto);
                me.winConfig.show();
            }

            else {
                me.formConfigPuesto.getForm().reset();
                me.formConfigPuesto.loadRecord(me.formulario.record);
                me.formConfigPuesto.grid.getStore().setExtraParams({ ID_POSTE: me.formulario.record.get('ID_POSTE') });
                me.formConfigPuesto.grid.getStore().load();
                me.winConfig.show();
            }
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Poste.");
        }
    }
});
