/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Tree panel para mostrar los los postes intervenidos en la Orden de Trabajo
*/
Ext.define('App.view.OrdenesTrabajo.ReporteTrabajoDiario.TreeElementosIntervenidos', {
    extend: 'Ext.tree.Panel',
    itemId: 'elementosintervenidos',
    xtype: 'treepostesconductores',
    store: 'OrdenesTrabajo.ElementosIntervenidos',
    title: 'Postes/Conductores',
    rootVisible: false
});