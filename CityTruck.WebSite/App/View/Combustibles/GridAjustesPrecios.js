Ext.define("App.View.Combustibles.GridAjustesPrecios", {
    extend: "Ext.grid.Panel",
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar ajuste de precio',
    imprimir: false,
    
    equipo: 'Ajustes de Precio',
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

        // Cambia por tu store real
        // Ej: App.Store.Combustibles.AjustePrecio
        me.store = Ext.create("App.Store.Combustibles.AjustesPrecios");

        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                // aquí puedes agregar botones (Nuevo, Editar, etc.)
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

            { header: "ID", width: 30, sortable: false, dataIndex: "ID_AJUSTE" },
            { header: "Combustible", width: 90, sortable: false, dataIndex: "ID_COMBUSTIBLE" },

            {
                header: "Tipo",
                width: 80,
                sortable: false,
                dataIndex: "TIPO"
            },

            { header: "Precio", width: 90, sortable: false, dataIndex: "PRECIO" },
            { header: "Precio Ant.", width: 90, sortable: false, dataIndex: "PRECIO_ANTERIOR" },

            {
                header: "Vig. Desde",
                width: 100,
                sortable: false,
                dataIndex: "FECHA_VIG_DESDE",
                xtype: "datecolumn",
                format: "d/m/Y"
            },
            {
                header: "Vig. Hasta",
                width: 100,
                sortable: false,
                dataIndex: "FECHA_VIG_HASTA",
                xtype: "datecolumn",
                format: "d/m/Y"
            },

            { header: "Estado", width: 70, sortable: false, dataIndex: "ESTADO" },
            { header: "Obs.", width: 150, sortable: false, dataIndex: "OBSERVACION" }
        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
    }
});
