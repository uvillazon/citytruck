/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Contenedor Principal para: FormCabecera, GridDetalleTrabajoDiario, TreePostes, FormPersonalMovil
*/

Ext.define('App.View.OrdenesTrabajo.ReporteTrabajoDiario.PrincipalTrabajoDiario', {
    alternateClassName: 'App.view.OrdenesTrabajo.ReporteTrabajoDiario.PrincipalTrabajoDiario',
    extend: 'Ext.container.Container',
    alias: 'widget.trabajodiarioprincipal',
    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.BorderSplitterTracker',
    ],

    layout: 'border',
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'trabajodiariocabecera',
            region: 'north'
        }, {
            xtype: 'panel',
            title: 'Personal del Movil',
            width: 225,
            autoScroll: true,
            items: [{ xtype: 'personalmovil' }],
            region: 'east',
            collapsible: true
        }, {
            xtype: 'treepostesconductores',
            width: 180,
            region: 'west',
            split: true
            //collapsible: true
        }, {
            xtype: 'principaldetalletrabajodiario',
            region: 'center',
            itemId: 'gprincipaldetalletrabajodiario'
        }];

       me.callParent();
    }
});