Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.GridOTsContratista', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridotcontratista',
    iconCls: null,
    itemId: 'gridOTsContratista',
    width: 300,
    height: 500,
    margins: '0 20 10 20',
    initComponent: function () {
        var me = this;
        me.createModel();
        me.columns = me.buildColumns();
        me.store = me.buildStore();
        me.dockedItems = me.buildDockedItems();
        //me.store.load();
        this.callParent(arguments);
    },

    createModel: function () {

    },

    buildStore: function () {
        return Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable', {
            proxy: {
                type: 'jsonp',
                url: Constantes.HOST + 'OrdenesTrabajo/ObtenerOrdenesTrabajoEjecutadoContratista',
                reader: {
                    root: 'Rows',
                    totalProperty: 'Total'
                },
                simpleSortMode: true
            },
            sorters: [{
                property: 'ID_OT',
                direction: 'DESC'
            }]
        });
    },

    buildColumns: function () {
        return   [{ text: '<b>Orden de Trabajo</b>', xtype: 'templatecolumn', flex: 1, dataIndex: 'ID_OT', tpl: '<h2>Nro. OT: {ID_OT}</h2><h4>S.M.: {ID_SOL_MAN}</h4>Fuente: {COD_FUENTE}' },
                  { text: '<b>Reporte</b>', align: 'center', witdh: 75, dataIndex: 'REPORTE_CONTRATISTA', renderer: function (v) {
                      return '<img src="Content/images/' + v.toLowerCase() +'.png">';
                  }}]
    },

    buildDockedItems: function () {
        return [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: this.store,
        }]
    },

});