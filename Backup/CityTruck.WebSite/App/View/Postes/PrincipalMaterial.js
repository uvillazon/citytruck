Ext.define("App.View.Postes.PrincipalMaterial", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Materiales',
    accionGrabar: 'GrabarResponsableSP',
    view: '',
    idTabla: 'IDPRODUCTO',
    tabla : 'V_MN_MATERIALES',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Postes.GridMateriales', {
            region: 'west',
            height: 350,
            imagenes: false,
            opcion: 'GridMateriales'
        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_añadirImagen', 'Añadir Imagenes', "image_add", me.CargarImagen, me.toolbar, this);
        Funciones.CrearMenu('btn_configuracionUC', 'Configuracion Materiales', "wrench", me.EventoConfiguracion, me.toolbar, this);
        Funciones.CrearMenu('btn_configuracionCodMat', 'Configuracion Codigo Mantenimiento', "wrench", me.EventoConfiguracion, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);

        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });
        me.CargarPanelImagen();
        me.formulario = Ext.create("App.View.Postes.Forms", { opcion: "FormMaterial" });
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
        me.panelImagen.setTitle("Visor de Imagenes - "+record.get('COD_ALTERNATIVO'));
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
    EventoConfiguracion: function (btn) {
        me = this;
        if (btn.getItemId() == 'btn_configuracionUC') {
            if (me.winConfig == null) {
                me.winConfig = Ext.create("App.Config.Abstract.Window");
                me.formConfig = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionCodSol', title: 'Formulario de Configuracion Codigo Solucion y Materiales' });
                me.winConfig.add(me.formConfig);
                me.winConfig.show();
            }
            else {
                me.formConfig.getForm().reset();
                me.winConfig.show();
            }
        }
        else if (btn.getItemId() == 'btn_configuracionCodMat') {
            if (me.winConfigMat == null) {
                me.winConfigMat = Ext.create("App.Config.Abstract.Window");
                me.formConfigMat = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionCodMan', title: 'Formulario de Configuracion Codigo Materiales y Cod. Soluciones' });
                me.winConfigMat.add(me.formConfigMat);
                me.winConfigMat.show();
            }
            else {
                me.formConfigMat.getForm().reset();
                me.winConfigMat.show();
            }
        }
        else { alert("Selecione uina opcion") }
    }
});
