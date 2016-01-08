Ext.define("App.View.VentasMN.GridVentas", {
    extend: "Ext.grid.Panel",
    //title: 'Tanques',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar Tanque',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Registros',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: '',
    selModel: {
        selType: 'cellmodel'
    },
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridVentas") {
            me.CargarGridVentas();
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
    CargarGridVentas: function () {
        var me = this;
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Combustibles.KardexMN");
        me.store.load();
        //me.CargarComponentes();

        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
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
            me.cbx_anio
            ]
        });
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar

        });
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                if (record.data.FECHA === null) {
                    return "GridTotales";
                }
            }
        };
//        me.style = 'border: solid Red 2px';
        me.columnLines = true;
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { text: 'DIESEL OIL (00:00AM a 23:59PM)',
                columns: [
                { header: "FECHA", width: 90, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "S-INICIAL", width: 100, sortable: false, dataIndex: "SALDO_INICIAL_DIE", align: "right" },
                { header: "COMPRAS", width: 100, sortable: false, dataIndex: "COMPRAS_DIE", align: "right" },
                { header: "VENTAS", width: 100, sortable: false, dataIndex: "VENTAS_DIE", align: "right" },
                { header: "MERMA DEMACIA", width: 100, sortable: false, dataIndex: "AJUSTES_DIE", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
                //                { header: "AJUSTES", width: 100, sortable: false, dataIndex: "AJUSTES_DIE" },
                {header: "ACUM.", width: 100, sortable: false, dataIndex: "ACUMULADO_DIE", align: "right", tdCls: 'DisabledClase'}]
            }, 
            { text : '' ,width: 20},
            { text: 'GASOLINA ESPECIAL (00:00AM a 23:59PM)',
                columns: [
                { header: "FECHA", width: 90, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "S-INICIAL", width: 100, sortable: false, dataIndex: "SALDO_INICIAL_GAS", align: "right" },
                { header: "COMPRAS", width: 100, sortable: false, dataIndex: "COMPRAS_GAS", align: "right" },
                { header: "VENTAS", width: 100, sortable: false, dataIndex: "VENTAS_GAS", align: "right" },
                //                { header: "AJUSTES", width: 100, sortable: false, dataIndex: "AJUSTES_GAS" },
                {header: "MERMA DEMACIA", width: 100, sortable: false, dataIndex: "AJUSTES_GAS", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
                {header: "ACUM.", width: 100, sortable: false, dataIndex: "ACUMULADO_GAS", align: "right"}]
            }
        ];
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
    }
});