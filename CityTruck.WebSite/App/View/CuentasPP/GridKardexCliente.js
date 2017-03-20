Ext.define("App.View.CuentasPP.GridKardexCliente", {
    extend: "Ext.grid.Panel",
    title: 'Kardex Cuentas por Pagar',
    criterios: true,
    textBusqueda: 'Buscar Cuenta por Cobrar',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Cuentas Por Cobrar',
    win: null,
    formulario: null,
    imagenes: true,
    id_cliente: '',
    record : null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridKardexCuentasPP") {
            me.CargarGridKardexCuentasPC();
            me.EventoKardex();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridKardexCuentasPC: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.CuentasPP.Kardex");
        me.store.setExtraParams({ ID_CLIENTE: me.id_cliente });
        me.store.load();

        //me.CargarComponentes();

        me.date_fechaInicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Ini',
            margin: '5',
            name: 'FECHA_INICIAL',
            value: new Date('01/01/2014'),
            width: 170,
            labelWidth: 50
        });

        me.date_fechaFinal = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Fin',
            name: 'FECHA_FINAL',
            margin: '5',
            width: 170,
            labelWidth: 50
        });
        me.mun_amortizacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Amortizacion",
            name: "AMORTIZACION",
            width: 160,
            labelWidth: 60,
            readOnly: true,
            //            hidden : true
        });
        me.mun_contrato = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Contratos",
            name: "CONTRATO",
            width: 160,
            labelWidth: 50,
            readOnly: true
        });
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                me.date_fechaInicial,
                me.date_fechaFinal,

                me.mun_amortizacion,
                me.mun_contrato
            ]
        });
        //        me.toolbar = Funciones.CrearMenuBar();
        //        Funciones.CrearMenu('btn_reporte', 'Reporte', 'report', me.ImprimirReporte, me.toolbar, this);
        //        this.dockedItems = me.toolBar;
        //        me.dock = this.dockedItems;
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar

        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
        //            { header: "Nro <br>Comprobante", width: 80, sortable: false, dataIndex: "NRO_COMP" },
            { header: "Fecha", width: 100, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Detalle", width: 245, sortable: false, dataIndex: "DETALLE" },

            { header: "Amortizaci\u00F3n", width: 100, sortable: false, dataIndex: "AMORTIZACION", align: 'right', renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Contratos", width: 100, sortable: false, dataIndex: "CONTRATO", align: 'right', renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Saldo", width: 100, sortable: false, dataIndex: "SALDO", align: 'right', renderer: Ext.util.Format.numberRenderer('0,000.00') }

        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    },
    EventoKardex: function () {
        var me = this;
        me.date_fechaInicial.on('select', function (field, value, eOpts) {
            //            alert(value);
            me.store.setExtraParams({ FECHA_INICIAL: value });
            me.store.setExtraParams({ FECHA_FINAL: me.date_fechaFinal.getValue() });
            me.store.load();


        });
        me.date_fechaFinal.on('select', function (field, value, eOpts) {
            me.store.setExtraParams({ FECHA_INICIAL: me.date_fechaInicial.getValue() });
            me.store.setExtraParams({ FECHA_FINAL: value });
            me.store.load();

        });
        me.store.on('load', function (str, records, successful, eOpts) {
            if (successful) {
                me.mun_amortizacion.setRawValue(Ext.util.Format.number(records[0].get('TOTAL_AMOR'), '0.000,00/i'));
                me.mun_contrato.setRawValue(Ext.util.Format.number(records[0].get('TOTAL_CONT'), '0.000,00/i'));
            }

        });
        me.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            me.record = disabled ? null : selections[0];
        });
    },
    LimpiarGrid: function () {
        var me = this;
        me.store.limpiarParametros();
        me.date_fechaInicial.reset();
        me.date_fechaFinal.reset();
    },
    ImprimirReporte: function () {
        var me = this;

        window.open(Constantes.HOST + 'ReportesPDF/ReporteAmortizacion?ID=' + me.id_cliente + '&FECHA_INICIO=' + me.date_fechaInicial.getSubmitValue() + '&FECHA_FINAL=' + me.date_fechaFinal.getSubmitValue());
    }
});