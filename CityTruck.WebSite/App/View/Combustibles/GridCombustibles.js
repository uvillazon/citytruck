Ext.define("App.View.Combustibles.GridCombustibles", {
    extend: "Ext.grid.Panel",
    //title: 'Compras Registradas',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar compra',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Compras',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridCompras") {
            me.CargarGrid();
            // me.eventosGrid();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Combustibles.Combustibles");
        // me.store = Ext.create("App.Store.Clientes.Clientes");
        ///////////
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [

            ]
        });

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar
        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Id", width: 80, sortable: false, dataIndex: "ID_COMBUSTIBLE" },
            { header: "Nombre", width: 100, sortable: false, dataIndex: "NOMBRE" },
            { header: "Descripcion", width: 120, sortable: false, dataIndex: "DESCRIPCION" },
            { header: "Unidad", width: 90, sortable: false, dataIndex: "UNIDAD" },
            { header: "Estado", width: 90, sortable: false, dataIndex: "ESTADO" },
        ];
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});