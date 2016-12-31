Ext.define('App.View.OrdenesTrabajo.WindowFileUpload', {
    extend: 'Ext.window.Window',
    modal: true,
    title: 'Importar archivo desde...',
    result: null,
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        me.callParent();
    },
    buttons: [{
        text: 'Importar',
        handler: function () {
            var w = this.up('window');
            var form = w.down('form').getForm();
            if (form.isValid()) {
                form.submit({
                    url: Constantes.HOST + 'OrdenesTrabajo/GenerarOTPorTramos',
                    waitMsg: 'Importando el archivo seleccionado...',
                    success: function (fp, o) {
                        msg('Success', 'Processed file "' + o.result.file + '" on the server');
                    }
                });
            }
        }
    }, {
        text: 'Limpiar',
        handler: function () {
            var w = this.up('window');
            var form = w.down('form').getForm();
            form.reset();
        },
    }],

    buildItems: function () {
        var formUpload = Ext.create('Ext.form.Panel', {
            width: 500,
            frame: true,
            //title: 'Subir archivo desde...',
            bodyPadding: '10 10 0',
            defaults: {
                anchor: '100%',
                allowBlank: false,
                msgTarget: 'side',
                labelWidth: 50
            },
            items: [/*{
                    xtype: 'textfield',
                    fieldLabel: 'Name'
                }, */{
                    xtype: 'filefield',
                    id: 'form-file',
                    emptyText: 'Seleccione un archivo',
                    fieldLabel: 'Archivo',
                    name: 'filePath',
                    buttonText: 'Buscar achivo',
                    buttonConfig: {
                        iconCls: 'image_add'
                    }
                }]
        });

        return [formUpload];
    },
});