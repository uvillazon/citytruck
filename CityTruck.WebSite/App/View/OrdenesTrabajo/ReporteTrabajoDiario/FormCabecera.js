/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 13
Elaborado: P. Sergio Alvarado G.
*/
Ext.define('App.View.OrdenesTrabajo.ReporteTrabajoDiario.FormCabecera', {
    alternateClassName: 'App.view.OrdenesTrabajo.ReporteTrabajoDiario.FormCabecera',
    extend: 'Ext.form.Panel',
    alias: 'widget.trabajodiariocabecera',
    defaultType: 'textfield',
    initComponent: function () {
        var me = this;
        me.items = me.construirItems();
        me.tbar = me.construirToolbar();
        me.callParent();
    },

    construirItems: function () {
        var idcabecera =  Ext.create('Ext.form.field.Text', {
            name: 'ID_TD',
            itemId: 'idtd',
            hidden: true,
            value: null
        });

        var sm = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'S.M.:',
            name: 'ID_SOL_MAN',
            itemId: 'comboboxsm',
            emptyText: 'Seleccione o escriba...',
            labelAlign: 'right',
            displayField: 'ID_SOL_MAN',
            valueField: 'ID_SOL_MAN',
            enableKeyEvents: true,
            queryMode: 'local',
            /*forceSelection: true, /*Esto impide que el usuario introduzca un valor que no esta en el combo.*/
            /*store: Ext.create('App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados', { autoLoad: true }), por lo convenido con el equipo de desarrollo, el combo se usa como textfield*/
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1,
        });

        var comboOt = Ext.create('Ext.form.ComboBox', {
            name: 'ID_OT',
            itemId: 'comboboxot',
            fieldLabel: 'O.T.:',
            emptyText: 'Seleccione o escriba....',
            width: 240,
            displayField: 'ID_OT',
            valueField: 'ID_OT',
            labelAlign: 'right',
            queryMode: 'local',
            //forceSelection: true,
            //allowBlank: false,
            //textoTpl: function () { return "{ID_OT} - {ID_SOL_MAN}" },
            //store: Ext.create('App.Store.OrdenesTrabajo.OrdenesTrabajoResponsable', { params: { ID_SOL_MAN: sm.getValue(), queryType: 'default' }/*, autoLoad: true*/ }),
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 1
        });

        var idmovil = Ext.widget('hiddenfield',{
            name: 'ID_MOVIL',
            itemId: 'hideidmovil',
            value: 'value from hidden field'
        });

        var movil = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Movil:',
            itemId: 'fieldmovil',
            name: 'MOVIL',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        var fechaEjecucion = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'Fecha Ejec.<span style="color:#F00;">*</span>',
            itemId: 'fejec',
            name: 'FECHA_EJE',
            labelAlign: 'right',
            format: 'd/m/Y',
            maxValue: new Date(),
            flex: 2
        });

        var txt = Ext.widget('label', {
            labelAlign: 'right',
            value: 'Reporte de Trabajo Diario',
            flex: 2
        });

        var idresponsable = Ext.widget('hiddenfield', {
            name: 'ID_RESPONSABLE',
            itemId: 'hideidresponsable',
            value: 'value from hidden field'
        });

        var capataz = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Capataz:',
            itemId: 'fieldcapataz',
            name: 'CAPATAZ',
            labelAlign: 'right',
            readOnly: true,
            readOnlyCls: 'DisabledClaseReadOnly',
            flex: 2
        });

        var horaInicio = Ext.create('Ext.form.TimeField', {
            fieldLabel: 'Hr. Inicio<span style="color:#F00;">*</span>',
            format: 'H:i',
            minValue: '00:00',
            maxValue: '23:59',
            increment: 1,
            name: 'FCH_HORA_INI',
            itemId: 'hini',
            labelAlign: 'right',
            flex: 1
        });

        var horaFinal = Ext.create('Ext.form.TimeField', {
            fieldLabel: 'Hr. Fin<span style="color:#F00;">*</span>',
            name: 'FCH_HORA_FIN',
            itemId: 'hfin',
            format: 'H:i',
            minValue: '00:00',
            maxValue: '23:59',
            //vtype: 'TimeVType',
            minValue: '00:00 AM',
            maxValue: '11:59 PM',
            increment: 1,
            labelAlign: 'right',
            flex: 1
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            
            },
            items: [idcabecera, sm, comboOt, idmovil, movil, fechaEjecucion]
        };

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 20px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5,
            },
            items: [txt, idresponsable, capataz, horaInicio, horaFinal]
        };

        return [primeraFila, segundaFila];
    },

    construirToolbar: function(){
        return [{
            text: '<b>Datos Generales de la Orden de Trabajo</b>',
        }, {
            xtype: 'tbfill'
        }, /*{
            text: 'Guardar',
            iconCls: 'icon-save',
            handler: this.saveData,
            scope: this,
            action: 'save'
        },*/{
            text: 'Salir',
            icon: Constantes.HOST + 'Content/images/salir.png',
            handler: this.salirData,
            scope: this,
            action: 'salir'
        }]
    },

    /*saveData: function () {
        var me = this;
        me.getForm().submit({
            url: 'Home/GuardarCabecera',
            success: function (form, action) {
                Ext.Msg.alert('Success', action.result.message);
            },
            failure: function (form, action) {
                Ext.Msg.alert('Failure', action.result.message);
            }
        });
    },*/

    salirData: function () {
        var me = this;
        var tabCurrent = Ext.ComponentQuery.query('#maintab')[0];
        var tab = tabCurrent.getActiveTab();
        tabCurrent.remove(tab);
        var btn = Ext.ComponentQuery.query('#btn_TrabajoEjecutado')[0];
        var adminOt = btn.up('window');
        adminOt.show();
        //var formadminot = Ext.getCmp('ext-comp-1139');
        //formadminot.show();
    }
});