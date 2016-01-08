/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 13
Elaborado: P. Sergio Alvarado G.
*/
Ext.define("App.View.TrabajoDiario.FormTrabajoDiario", {
    extend: 'Ext.form.Panel',
    alias: 'widget.formtrabajodiario',
    title: 'Reporte de Trabajo Diario',
    width: 800,
    height: 100,
    //labelAlign: 'right',
    bodyPadding: 5,

    defaultType: 'textfield',
    initComponent: function () {
        var me = this;
        me.items = me.construirItems();
        me.callParent();
    },

    construirItems: function () {

        var sm = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'S.M.:',
            emptyText: 'Solicitud Mantenimiento',
            labelAlign: 'right',
            name: 'ID_SOL_MAN',
            flex: 1,
        });

        var comboOt = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'O.T.:',
            //emptyText: 'O.T.',
            width: 240,
            //store: 'store',
            displayField: 'label',
            valueField: 'key',
            labelAlign: 'right',
            forceSelection: true,
            flex: 1
        });

        var movil = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Movil:',
            name: 'ID_MOVIL',
            labelAlign: 'right',
            flex: 2
        });

        var fechaEjecucion = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Ejecucion:',
            name: 'FECH_EJEC',
            labelAlign: 'right',
            flex: 2
        });

        var txt = Ext.create('Ext.form.field.Text', {
            name: 'ID_RESPONSABLE',
            labelAlign: 'right',
            flex: 2
        });

        var capataz = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Capataz:',
            name: 'ID_RESPONSABLE',
            labelAlign: 'right',
            flex: 2
        });

        var horaInicio = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Hr. Inicio:',
            name: 'HORA_INIC',
            labelAlign: 'right',
            flex: 1
        });

        var horaFinal = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'Hr. Fin:',
            name: 'HORA_FIN',
            labelAlign: 'right',
            flex: 1
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,

            },
            items: [sm, comboOt, movil, fechaEjecucion]
        };

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [txt, capataz, horaInicio, horaFinal]
        };

        return [ primeraFila, segundaFila ];
    }
});