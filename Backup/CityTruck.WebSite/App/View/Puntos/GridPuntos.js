Ext.define("App.View.Puntos.GridPuntos", {
    extend: "Ext.grid.Panel",
    //title: 'Ingresos Registradas',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar Ingreso',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Cajas',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridPuntos") {
            me.CargaGridPuntos();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargaGridPuntos: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Puntos.Puntos");
        me.store.load();
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar
        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Manguera", width: 150, sortable: true, dataIndex: "CODIGO" },
            { header: "Combustible", width: 150, sortable: true, dataIndex: "COMBUSTIBLE" },
            { header: "Metter <br>Inicial", width: 150, sortable: true, dataIndex: "MITTER_INICIAL" },
//            { header: "Metter Inicial<br>Media Noche", width: 150, sortable: true, dataIndex: "MITTER_INICIAL_MN" },
            { header: "Metter <br>Actual", width: 150, sortable: true, dataIndex: "MITTER_ACTUAL" },
//            { header: "Metter Actual<br>Media Noche", width: 150, sortable: true, dataIndex: "MITTER_ACTUAL_MN" },
        ];

        me.dock = this.dockedItems;
    }
});