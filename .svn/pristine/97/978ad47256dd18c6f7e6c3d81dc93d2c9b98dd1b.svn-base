Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.GridDetalleTrabajoDiario', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.griddetalletrabajodiario',
    itemId: 'gdetalletrabajodiario',
    iconCls: null,
    width: 800,
    height: 250,
    flex: 1,
    plugins: [{ ptype: 'cellediting', clicksToEdit: 1 }],
    tbar: [ {
            iconCls: 'application_view_list',
            },{
            text: '<b>Lista de Materiales:</b>'
            }, {
            xtype: 'tbfill'
            }, {
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
        return Ext.create('App.store.OrdenesTrabajo.DetalleTrabajoDiario');
    },

    buildColumns: function () {
        return [
             {
                 text: '<b>UC</b>',
                 width: 70,
                 dataIndex: 'COD_UC'
             },
            {
                text: '<b>COD. MAN.</b>',
                width: 70,
                dataIndex: 'COD_MAN'
            },
            {
                text: '<b>COD. SOL.</b>',
                width: 70,
                dataIndex: 'COD_SOL'
            },
             {
                 text: '<b>MATERIAL</b>',
                 width: 70,
                 dataIndex: 'COD_PROD'
             },
            {
                text: '<b>DESCRIPCION</b>',
                width: 250,
                dataIndex: 'DESC_PROD'
            },
            {
                text: '<b>UNIDAD</b>',
                align: 'center',
                width: 60,
                dataIndex: 'UNID_PROD'
            },
            /*{
                text: '<b>CANT. PRE.</b>',
                width: 60,
                align: 'center',
                dataIndex: 'CANT_PRE',
                //editor: { xtype: 'numberfield', allowBlank: false, minValue: 0 }
            },*/
            {
                text: '<b>CANT. EJE.</b>',
                width: 70,
                align: 'center',
                dataIndex: 'CANT_EJE',
                editor: { xtype: 'numberfield', allowBlank: false, minValue: 0 }
            },
            {
                text: '<b>OBSERV.</b>',
                width: 100,
                align: 'center',
                dataIndex: 'OBSERV',
                editor: { xtype: 'textfield', allowBlank: false }
            },
            {
                xtype: 'actioncolumn',
                width: 25,
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