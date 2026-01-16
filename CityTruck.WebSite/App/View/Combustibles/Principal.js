Ext.define("App.View.Combustibles.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Compras',
    accionGrabar: 'GrabarCompras',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        me.CargarEventos();
        me.grid.getStore().load();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCompras, me.toolbar, this, null, true);
        //        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCompras, me.toolbar, this, null, true);
        //        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCompras, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Combustibles.GridCombustibles', {
            region: 'west',
            width: '40%',
            height: 350,
            title: 'Combustibles',
            imagenes: false,
            opcion: 'GridCompras',
            toolbar: me.toolbar
        });

        me.form = Ext.create('App.View.Compras.Forms', {
            opcion: 'formResumen',
            columns: 2,
            width: '60%',
            region: 'center',

        });
        Funciones.BloquearFormulario(me.form);
        me.items = [me.grid, me.form];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.id_compra = record.get('ID_COMPRA');
        me.record = record;
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        //        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        //        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    CargarEventos: function () {
        var me = this;
        me.grid.getStore().on('load', function (str, records, success) {
            if (!success) {
                str.removeAll();
                Ext.Msg.alert("Error", "Ocurrio algun Error");
            }
        });
    },
    EventosCompras: function (btn) {
        var me = this;
        Funciones.checkTimeout();
        if (btn.getItemId() == "btn_Crear" || btn.getItemId() == "btn_Detalle") {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
        else if (btn.getItemId() == "btn_Editar") {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
        else if (btn.getItemId() == 'btn_Eliminar') {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
});
