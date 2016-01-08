/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Grid para mostrar los materiales presupuestados por poste intervenido
*/

Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.GridPrincipalDetalleTrabajoDiario', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.principaldetalletrabajodiario',
    iconCls: null,
    tbar: [{
            text: '<b>Detalle Trabajo Ejecutado:</b>'
            }, {
            xtype: 'tbfill'
            }, {
            text: 'Añadir',
            iconCls: 'icon-add',
            action: 'add'
            },
            {
            text: 'Guardar',
            iconCls: 'icon-save',
            action: 'save'
            }],
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],

    initComponent: function () {
        var me = this;
        me.createModel();
        me.columns = me.buildColumns();
        me.store = me.buildStore();
        //me.dockedItems = me.buildDockedItems();
        //me.store.load();
        me.callParent(arguments);
    },

    createModel: function () {
    },

    buildColumns: function () {
        return [
            { xtype: 'rownumberer' },
            { text: '<b>COD. POSTE</b>', width: 100, dataIndex: 'COD_POSTE', hidden: true },
            { text: '<b>COD. UC</b>', width: 100, dataIndex: 'COD_UC', hidden: true },
            { text: '<b>COD. CONDUCTOR</b>', width: 100, dataIndex: 'COD_CONDUCTOR', hidden: true },
            { text: '<b>FORMACION CND. </b>', width: 120, dataIndex: 'FORMACION_CND'/*, hidden: true*/ },
            { text: '<b>COD. MANT.</b>', width: 80, dataIndex: 'COD_MAN' },
            { text: '<b>COD. SOL. </b>', width: 80, dataIndex: 'COD_SOL' },
            { text: '<b>COD. MATERIAL</b>', width: 100, dataIndex: 'COD_PROD' },
            { text: '<b>DESCRIPCION</b>', width: 200, dataIndex: 'DESC_PROD' },
            { text: '<b>UNIDAD</b>', width: 70, dataIndex: 'UNID_PROD' },
            { text: '<b>CANT. PRE.</b>', width: 90, flex: 1, dataIndex: 'CANT_PRE', hidden: true },
            { text: '<b>CANT. EJEC.</b>', width: 90, flex: 1, dataIndex: 'CANT_EJE',
                editor: { xtype: 'numberfield', allowBlank: false, allowNegative: false, minValue: 0 }
            },
            { text: '<b>NIVEL</b>', width: 50, flex: 1, dataIndex: 'NIVEL',
                editor: { xtype: 'numberfield', allowBlank: false, allowNegative: false, minValue: 0 }
            },
            {   text: '<b>OBSERV.</b>', width: 100, flex: 1, dataIndex: 'OBSERV',
                editor: { xtype: 'textfield', allowBlank: false }
            },
            { text: '<b>FECHA INI.</b>', width: 100, flex: 1, dataIndex: 'FCH_HOR_INI', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')  },
            { text: '<b>FECHA FIN.</b>', width: 100, flex: 1, dataIndex: 'FCH_HOR_FIN', renderer: Ext.util.Format.dateRenderer('d/m/Y H:i')  },
            { text: '<b>CAPATAZ</b>', width: 150, flex: 1, dataIndex: 'CAPATAZ' },
            { text: '<b>MOVIL</b>', width: 60, flex: 1, dataIndex: 'MOVIL' },
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
            },
            

        ];
    },

    buildDockedItems: function(){
        return [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: this.store,
            displayInfo: true,
            displayMsg: '{0} - {1} of {2} Materiales/Mano de Obra' ,
            emptyMsg: 'No hay registros',
            //pageSize: 10
        }]
    },

    buildStore: function () {
        return Ext.create('App.store.OrdenesTrabajo.DetallePrincipalTrabajoDiario');
    }
});