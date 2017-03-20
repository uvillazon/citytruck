Ext.define("App.View.CuentasPP.GridCuentasPP", {
    extend: "Ext.grid.Panel",
    //title: 'Cuentas por Cobrar Registradas',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar Cuenta por Cobrar',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Cuentas Por Cobrar',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridCuentasPP") {
            me.CargarGridCuentasPC();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridCuentasPC: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.CuentasPP.Clientes");
        me.store.on('load', me.CargarTotales, me);
        me.store.load();
        //me.CargarComponentes();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.data.RAZON_SOCIAL === "Total") {
                    return "GridTotales"; r
                    
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
        me.bar = this.bbar;
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "C\u00F3digo", width: 100, sortable: false, dataIndex: "CODIGO" },
            { header: "Nombre", width: 250, sortable: false, dataIndex: "RAZON_SOCIAL" },
//            { header: "Saldo (Lts)", width: 100, sortable: false, dataIndex: "CONSUMO", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Saldo (Bs)", width: 100, sortable: false, dataIndex: "SALDO" ,align: "right" , renderer: Ext.util.Format.numberRenderer('0,000.00')}
            
        ];
        //me.button_search.on('click', this.buscarBotonCodigo, this);
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    },
    CargarTotales: function (str, record) {
        var me = this;
        var saldo = 0;
//        var consumo = 0;
        me.store.each(function (record) {
            saldo = saldo + record.get('SALDO');
//            consumo = consumo + record.get('CONSUMO');
        });
        var rec = Ext.create('App.Store.CuentasPP.Clientes', {
            RAZON_SOCIAL: "Total",
            SALDO: saldo,
//            CONSUMO: consumo
        });
        me.getStore().add(rec);

    }
});