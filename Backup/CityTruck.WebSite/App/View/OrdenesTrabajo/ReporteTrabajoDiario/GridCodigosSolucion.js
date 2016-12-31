Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.GridCodigosSolucion', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridcodigossolucion',
    itemId: 'gcodsol',
    width: 425,
    height: 150,
    title: 'Codigos de Solucion',
    initComponent: function () {
        var me = this;
        me.createModel();
        me.columns = me.buildColumns();
        me.store = me.buildStore();

        this.callParent(arguments);
    },

    createModel: function () {

    },

    buildStore: function () {
        return Ext.create('App.store.SolicitudesMantenimiento.CodigosSolucion');
    },

    buildColumns: function () {
        return [
            {
                text: '<b>COD. SOL</b>',
                width: 60,
                dataIndex: 'COD_SOL'
            },
            {
                text: '<b>DESCRIPCION</b>',
                width: 296,
                dataIndex: 'DESCRIP_SOL'
            },
             {
                 xtype: 'actioncolumn',
                 width: 50,
                 align: 'center',
                 items: [{
                     icon: Constantes.HOST + 'Content/images/add.png',
                     tooltip: 'Agregar materiales',
                     handler: function (grid, rowIndex, colIndex) {
                         // fire custom event "itemeditbuttonclick"
                         this.up('grid').fireEvent('addbuttonclick', grid, rowIndex, colIndex);
                     }
                 }, {
                     icon: Constantes.HOST + 'Content/images/delete.png',
                     tooltip: 'Eliminar codigo y materiales',
                     handler: function (grid, rowIndex, colIndex) {
                         // fire custom event "itemeditbuttonclick"
                         this.up('grid').fireEvent('deletebuttonclick', grid, rowIndex, colIndex);
                     }
                 }],
             }
        ]
    },
});