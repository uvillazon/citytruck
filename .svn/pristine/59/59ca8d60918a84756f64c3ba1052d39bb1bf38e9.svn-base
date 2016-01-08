Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.GridMaterialesCodigoSolucion', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridmaterialescodigosolucion',
    itemId: 'gmaterialessolucion',
    width: 600,
    height: 200,
    //title: 'Materiales utlizados por Codigo de Solucion',
    plugins: [{ ptype: 'cellediting', clicksToEdit: 1 }],
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
        //return Ext.create('App.store.OrdenesTrabajo.MaterialesCodigoSolucion');
        return Ext.create('App.Store.Postes.Materiales');
    },

    buildColumns: function () {
        return [
             {
                 text: '<b>COD. ALTERNATIVO</b>',
                 width: 100,
                 dataIndex: 'COD_ALTERNATIVO'
             },
             {
                 text: '<b>DESCRIPCION</b>',
                 width: 390,
                 dataIndex: 'DESCRIPCION'
             },
            {
                text: '<b>UNIDAD</b>',
                width: 90,
                dataIndex: 'IDUNIDAD'
            },
             /*{
                 text: '<b>CANT. PRESU.</b>',
                 width: 80,
                 align: 'center',
                 dataIndex: 'CANT_PRE'
             },
              {
                  text: '<b>CANT. EJEC.</b>',
                  width: 80,
                  align: 'center',
                  dataIndex: 'CANT_EJE',
                  editor: { xtype: 'numberfield', allowBlank: false, minValue: 0 }
              },*/
             {
                 xtype: 'actioncolumn',
                 width: 27,
                 align: 'center',
                 items: [
                     {
                         icon: Constantes.HOST + 'Content/images/delete.png',
                         tooltip: 'Eliminar',
                         handler: function (grid, rowIndex, colIndex) {
                             grid.getStore().removeAt(rowIndex);
                         }
                     }]
             }
        ]
    },
});