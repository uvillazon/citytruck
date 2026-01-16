Ext.define("App.View.Combustibles.GridPos", {
    extend: "Ext.grid.Panel",
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar POS',
    imprimir: false,
   
    equipo: 'POS',
    win: null,
    formulario: null,
    imagenes: false,
    toolbar: '',

    initComponent: function () {
        var me = this;
        me.CargarGrid();

        this.callParent(arguments);
    },

    CargarGrid: function () {
        var me = this;

        // Cambia este store por el tuyo real
        // Ej: App.Store.Combustibles.Pos
        me.store = Ext.create("App.Store.Combustibles.Pos");

        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                // aqui puedes agregar botones si quieres
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

            { header: "ID", width: 40, sortable: false, dataIndex: "ID_POS" },
            { header: "Codigo", width: 100, sortable: false, dataIndex: "CODIGO" },
            { header: "Descripcion", width: 100, sortable: false, dataIndex: "DESCRIPCION" },
            { header: "Combustible", width: 90, sortable: false, dataIndex: "COMBUSTIBLE" },

            { header: "Lectura Ant.", width: 100, sortable: false, dataIndex: "LECTURA_ANTERIOR" },
            { header: "Lectura Act.", width: 100, sortable: false, dataIndex: "LITTER_ACT" },

            { header: "Dec.", width: 60, sortable: false, dataIndex: "MEDIDOR_DECIMALES" },
            { header: "Max", width: 100, sortable: false, dataIndex: "MEDIDOR_MAX_VALOR" },
            { header: "Rollover", width: 80, sortable: false, dataIndex: "MEDIDOR_ROLLOVER" },

            { header: "Estado", width: 70, sortable: false, dataIndex: "ESTADO" }
        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
    }
});