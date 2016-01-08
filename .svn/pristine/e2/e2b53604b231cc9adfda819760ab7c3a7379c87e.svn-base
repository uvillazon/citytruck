Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.FormOTsContratista', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formotcontratista',
    itemId: 'fotcontratista',
    requires: ['App.view.OrdenesTrabajo.EjecutadoContratista.GridOTsContratista'],
    //layout: 'fit',
    iconCls: null,
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        this.callParent(arguments);
    },
    buildItems: function () {
        var busqueda = Ext.create('Ext.form.field.Text', {
            flex: 1,
            name: 'Contiene',
            emptyText: 'Buscar por OT o SM',
            width: 300,
            margins: '10 0 10 20',
            enableKeyEvents: true,
        });

        var btnbuscar = Ext.create('Ext.button.Button', {
            text: 'Buscar',
            scale: 'small',
            icon: Constantes.HOST + 'Content/images/Search.png',
            margins: '10 20 10 0',
        });

        var gridots = Ext.widget('gridotcontratista', { flex: 1 })

        var btnnuevo = Ext.create('Ext.button.Button', {
            text: 'Nuevo',
            scale: 'medium',
            icon: Constantes.HOST + 'Content/images/News.png',
            margins: '10 0 10 30',
            disabled: true,
        });

        var btneditar = Ext.create('Ext.button.Button', {
            text: 'Editar',
            scale: 'medium',
            icon: Constantes.HOST + 'Content/images/pencil.png',
            margins: '10 0 10 20',
            disabled: true,
        });

        var btnver = Ext.create('Ext.button.Button', {
            text: 'Guardar',
            scale: 'medium',
            icon: Constantes.HOST + 'Content/images/save.png',
            margins: '10 20 10 20',
            disabled: true
        });

        var btnrechazar = Ext.create('Ext.button.Button', {
            text: 'Rechazar',
            scale: 'medium',
            icon: Constantes.HOST + 'Content/images/pulgar_abajo.png',
            margins: '10 20 10 50',
            //disabled: true
        });

        var btnaprobar = Ext.create('Ext.button.Button', {
            text: 'Aprobar',
            scale: 'medium',
            icon: Constantes.HOST + 'Content/images/pulgar.png',
            margins: '10 20 10 30',
            //disabled: true
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [busqueda, btnbuscar]
        };

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [gridots]
        };

        var terceraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [btnaprobar, btnrechazar]
        };

        return [primeraFila, segundaFila, terceraFila]
    }
    
});