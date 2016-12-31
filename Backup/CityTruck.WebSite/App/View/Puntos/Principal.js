Ext.define("App.View.Puntos.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Puntos',
    accionGrabar: 'GrarbarPuntos',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.id_caja = 0;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearManguera', 'Crear Manguera', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Reporte', 'Reporte Por Manguera', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        // Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCaja, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_SaldoInicialMN', 'Saldo Inicial MN', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_SaldoInicial', 'Saldo Inicial', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Puntos.GridPuntos', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridPuntos',
            toolbar: me.toolbar
        });

        me.items = [me.grid];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);
        me.grid.on('itemdblclick', me.CrearVentanaKardex, this);
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.id_caja = record.get('ID_CAJA');
        me.recordSelected = record;
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        //        Funciones.DisabledButton('btn_Reporte', me.toolbar, disabled);
        Funciones.DisabledButton('btn_SaldoInicialMN', me.toolbar, disabled);
        Funciones.DisabledButton('btn_SaldoInicial', me.toolbar, disabled);
    },
    EventosPrincipal: function (btn) {

        var me = this;
        switch (btn.getItemId()) {
            case "btn_SaldoInicialMN":
                me.FormSaldoInicialMN();
                break;
            case "btn_SaldoInicial":
                me.FormSaldoInicial();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    FormSaldoInicialMN: function () {
        var me = this;
        var win = Ext.create('App.Config.Abstract.Window', { botones: true, textGuardar: 'Guardar Saldo Inicial' });
        var form = Ext.create('App.View.Puntos.Forms', { opcion: 'FormSaldoInicialMN' });
        win.add(form);
        win.show();
    }
});

