Ext.define("App.View.Compras.GridCompras", {
    extend: "Ext.grid.Panel",
    //title: 'Compras Registradas',
    iconCls:'',
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
            me.CargarGridCompras();
            me.eventosGrid();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    eventosGrid: function () {
        var me = this;
        me.cbx_mes.on('select', function (cmb, record) {
            me.store.setExtraParam('MES', record[0].get('CODIGO'));
            me.store.setExtraParam('ANIO', me.cbx_anio.getValue());
            me.store.load();
        });
        me.cbx_anio.on('select', function (cmb, record) {
            me.store.setExtraParam('ANIO', record[0].get('CODIGO'));
            me.store.setExtraParam('MES', me.cbx_mes.getValue());
            me.store.load();
        });

    },
    CargarGridCompras: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Compras.Compras");
//        me.store.load();
        //me.CargarComponentes();

        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
            labelWidth: 50,
            width: 150,
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_anio = Ext.create('App.Store.Listas.StoreLista');
        me.store_anio.setExtraParam('ID_LISTA', Lista.Buscar('ANIO'));
        me.cbx_anio = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "A\u00f1o",
            name: "ANIO",
            labelWidth: 50,
            width: 150,
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_anio,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_mes.on('load', function () {
            var meses = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            me.cbx_mes.setValue(meses[fecha_actual.getMonth()].toString());
        });

        me.store_anio.on('load', function () {
            me.cbx_anio.setValue(fecha_actual.getFullYear().toString());
        });
        ///////////
        me.toolBar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
            me.cbx_mes,
            me.cbx_anio,
            me.button_search,
            me.button_new
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
            { header: "Nro <br>Comprobante", width: 80, sortable: false, dataIndex: "NRO_COMP" },
            { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Combustible", width: 90, sortable: false, dataIndex: "COMBUSTIBLE" },
            { header: "Cantidad (Lts)", width: 80, sortable: false, dataIndex: "CANTIDAD" , align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Importe (Bs)", width: 100, sortable: false, dataIndex: "TOTAL", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Nro Factura", width: 80, sortable: false, dataIndex: "NRO_FACTURA" ,align: "right"}
        ];
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});