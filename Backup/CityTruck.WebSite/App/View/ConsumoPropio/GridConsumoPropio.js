Ext.define("App.View.ConsumoPropio.GridConsumoPropio", {
    extend: "Ext.grid.Panel",
    //title: 'Consumo Propio',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar Consumo Propio',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Consumo Propio',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridConsumoPropio") {
            me.CargarGridCuentasPC();
        }
        else if (me.opcion == "GridConsumo") {
            me.CargarGridConsumos();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridConsumos : function(){
        var me = this;
        me.store = Ext.create("App.Store.ConsumoPropio.Consumos");
        me.store.on('load', me.CargarTotales, me);
//        me.store.load();
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar

        });
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Fecha", width: 80, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Turno", width: 60, sortable: false, dataIndex: "TURNO" },
            { header: "Cliente <br>Consumo", width: 120, sortable: false, dataIndex: "CLIENTE" },
            { header: "Responsable", width: 150, sortable: false, dataIndex: "RESPONSABLE" },
            { header: "Consumo<br>(Litros)", width: 80, sortable: false, dataIndex: "CONSUMO", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Consumo<br>(Importe)", width: 80, sortable: false, dataIndex: "CONSUMO_BS", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') }
        ];
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
    },
    CargarGridCuentasPC: function () {
        var me = this;
        //        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.ConsumoPropio.Clientes");
        me.store.on('load', me.CargarTotales, me);
        me.store.load();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.data.DESCRIPCION === "Total") {
                    return "GridTotales";
                }
            }
        };
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar

        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "C\u00F3digo", width: 100, sortable: true, dataIndex: "CODIGO" },
            { header: "Nombre", width: 250, sortable: false, dataIndex: "DESCRIPCION" },
            { header: "Consumo<br>(Lts)", width: 100, sortable: false, dataIndex: "CONSUMO", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Consumo<br>(Bs)", width: 100, sortable: false, dataIndex: "CONSUMO_BS", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') }
        ];
        //        me.button_search.on('click', this.buscarBotonCodigo, this);
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    },
    CargarTotales: function (str, record) {
        var me = this;
        var saldo = 0;
        var consumo = 0;
        me.store.each(function (record) {
            saldo = saldo + record.get('CONSUMO');
            consumo = consumo + record.get('CONSUMO_BS');
//            consumo = consumo + record.get('CONSUMO');
        });
        var rec = Ext.create('App.Store.Clientes.Clientes', {
            DESCRIPCION: "Total",
            CONSUMO: saldo,
            CONSUMO_BS : consumo
//            CONSUMO: consumo
        });
        me.getStore().add(rec);

    }
});