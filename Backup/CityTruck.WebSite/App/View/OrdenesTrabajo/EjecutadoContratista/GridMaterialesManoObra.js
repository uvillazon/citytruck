Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.GridMaterialesManoObra', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridmaterialesmanoobra',
    layout: 'fit',
    //width: 1024,
    height: 300,
    iconCls: null,
    plugins: [{ ptype: 'cellediting', clicksToEdit: 1 }],
    tbar: [{
            xtype: 'tbfill'
           },
           {
            text: 'Añadir Material',
            iconCls: 'icon-add',
            action: 'addMaterial'
    }],
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
        return Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista'/*, {
            extend: 'Ext.data.Store',
            requires: 'App.Model.OrdenesTrabajo.DetalleEjecutadoContratista',
            model: 'App.Model.OrdenesTrabajo.DetalleEjecutadoContratista',
            proxy: {
                type: 'ajax',
                api: {
                    read: Constantes.HOST + 'OrdenesTrabajo/ObtenerDetalleEjecutadoContratista',
                    update: Constantes.HOST + 'OrdenesTrabajo/ActualizarDetalleEjecutadoContratista',
                    destroy: Constantes.HOST + 'OrdenesTrabajo/EliminarDetalleEjecutadoContratista'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                },
                writer: {
                    type: 'json',
                    allowSingle: false
                }
            }}*/);
    },

    buildColumns: function () {
        return [
            {
                text: '<b>COD. POSTE</b>',
                width: 150,
                flex: 1,
                dataIndex: 'COD_POSTE'
            },
            {
                text: '<b>COD. UC</b>',
                width: 150,
                flex: 1,
                dataIndex: 'CODIGO_UC'
            },
            {
                text: '<b>CONDUCTOR</b>',
                width: 150,
                flex: 1,
                dataIndex: 'COD_CONDUCTOR'
            },
            {
                 text: '<b>PRODUCTO</b>',
                 width: 150,
                 flex: 1,
                 dataIndex: 'COD_PROD'
             },
             {
                 text: '<b>DESCRIPCION</b>',
                 width: 500,
                 flex: 1,
                 dataIndex: 'DESC_PROD'
             },
            {
                text: '<b>UNIDAD</b>',
                width: 100,
                align: 'center',
                flex: 1,
                dataIndex: 'UNID_PROD'
            },
            {
                text: '<b>COSTO UNIT.</b>',
                width: 100,
                align: 'center',
                flex: 1,
                dataIndex: 'COSTO_UNIT'
            },
             {
                 text: '<b>CANT. PRESU.</b>',
                 width: 100,
                 align: 'center',
                 flex: 1,
                 dataIndex: 'CANT_PRE',
                 hidden: true
             },
              {
                  text: '<b>CANT. EJEC.</b>',
                  width: 100,
                  align: 'center',
                  flex: 1,
                  dataIndex: 'CANT_EJE',
                  editor: { xtype: 'numberfield', allowBlank: false, minValue: 0, maxValue: 9999 }
              },
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