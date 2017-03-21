Ext.define("App.View.CuentasPP.GridAnticipos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Amortizaciones Registrados',
    criterios: true,
    height: 350,
    width : 700,
    textBusqueda: 'Moviles.',
    busqueda: true,
    imprimir: false,
    equipo: 'Amortizaciones',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.CuentasPP.Anticipos");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: 'Fecha', dataIndex: 'FECHA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Nro Comprobante", width: 80, sortable: true, dataIndex: "NRO_COMP" },
            { header: "Glosa", width: 100, sortable: true, dataIndex: "GLOSA" },
            { header: "Caja", width: 100, sortable: true, dataIndex: "CAJA" },
            { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE_BS", align: 'right', renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Observacion", width: 150, sortable: true, dataIndex: "OBSERVACION" },


        ];
        this.callParent(arguments);
    }
});

