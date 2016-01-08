Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.WindowNuevoRegistro', {
    extend: 'Ext.window.Window',
    alias: 'widget.windownuevoregistro',
    itemId: 'wnuevoregistro',
    //layout: 'fit',
    title: 'Detalle Trabajo Ejecutado Contratista',
    icon: Constantes.HOST + 'Content/images/pencil.png',
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        me.buttons = me.buildButtons();
        this.callParent(arguments);
    },
    buildItems: function () {
        var poste = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: 'POSTE:',
            emptyText: 'Escribir o elegir...',
            itemId: 'comboposte',
            name: "COD_POSTE",
            labelAlign: 'right',
            displayField: 'COD_POSTE',
            valueField: 'ID_POSTE',
            queryMode: 'local',
            store: Ext.create('App.Store.Postes.Postes'),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_POSTE}</div><div class="desc">{DESC_TIPO}</div></div>';
            },
            forceSelection: true,
            width: 300,
            flex: 1,
            disabledCls: null,
            readOnlyCls: null,
        });

        var btnPoste = Ext.create('Ext.button.Button', {
            text: '',
            itemId: 'btnposte',
            scale: 'small',
            iconCls: 'wrench',
            margin: '0px 0px 0px 3px',
            flex: 1
        });

        var conductor = Ext.create('App.Config.Componente.ComboAutoBase', {
            fieldLabel: 'CONDUCTOR:',
            name: 'COD_CONDUCTOR',
            itemId: 'comboconductor',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_CONDUCTOR',
            valueField: 'ID_CONDUCTOR',
            queryMode: 'local',
            forceSelection: true,
            store: Ext.create('App.Store.Postes.Conductores'),
            textoTpl: function () {
                return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_CONDUCTOR}</div><div class="desc">{DESC_TIPO}</div></div>';
            },
            flex: 1,
            width: 300,
            margin: '0px 0px 0px 165px',
            disabledCls: null,
            readOnlyCls: null,
        });

        var primeraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '20px 20px 10px 0px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [poste, /*btnPoste,*/ conductor]
        };

        var uc = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'COD. UC.:',
            name: 'COD_UC',
            itemId: 'combouc',
            emptyText: 'Escribir o elegir...',
            labelAlign: 'right',
            displayField: 'COD_UC',
            valueField: 'ID_UC',
            queryMode: 'local',
            forceSelection: true,
            listConfig: {
                loadingText: 'Buscando...',
                emptyText: 'No exiten Unidades Constructivas',
                getInnerTpl: function () {
                    return '<div class="search-item" style="background-image:url({logo})"><div class="name">{COD_UC} - {COD_REA}</div><div class="desc">{DESCRIPCION}</div></div>';
                }
            },
            width: 290,
            margin: '0 0 0 10',
            disabled: true,
            flex: 1,
        });

        var btnUc = Ext.create('Ext.button.Button', {
            text: '',
            itemId: 'btnuc',
            scale: 'small',
            iconCls: 'wrench',
            margin: '0px 0px 0px 3px',
            flex: 1,
            disable: true,
        });

        var formacion = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'FORMACION:',
            name: 'FORMACION',
            itemId: 'fieldformacion',
            width: 290,
            margin: '0px 0px 0px 150px',
            emptyText: 'Formacion del conductor...',
            labelAlign: 'right',
            displayField: 'FORMACION',
            disabled: true,
            readOnly: true,
            flex: 1,
        });

        var nivel = Ext.create('Ext.form.field.Number', {
            fieldLabel: 'NIVEL:',
            itemId: 'fieldnivel',
            name: 'NIVEL',
            margin: '0px 0px 0px 0px',
            width: 200,
            allowNegative: false,
            minValue: 0,
            allowBlank: false,
            labelAlign: 'right',
            flex: 1
        });

        var segundaFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '0px 20px 10px 0px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [uc, btnUc, formacion/*, nivel*/]
        };

        var tabs = Ext.create('Ext.tab.Panel', {
            renderTo: document.body,
            width: 800,
            activeTab: 0,     // first tab initially active
            defaults :{
                bodyPadding: 10
            },
            items: [
                        {
                            title: 'Materiales',
                            items: [{
                                xtype: 'gridmaterialesmanoobra',
                                itemId: 'gridmaterialespresupuesto',
                                buildStore: function () {
                                    return Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista', {
                                        proxy: {
                                            type: 'ajax',
                                            api: {
                                                read: Constantes.HOST + 'Presupuestos/ObtenerPresupuestosPaginados',
                                                create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleEjecutadoContratista',
                                            },
                                            reader: {
                                                type: 'json',
                                                root: 'data',
                                                totalProperty: 'total'
                                            },
                                            writer: {
                                                type: 'json',
                                                allowSingle: false
                                            },
                                            afterRequest: function (request, success) {
                                                if (request.action == 'create') {
                                                    this.createCallback(request);
                                                }
                                            },
                                            createCallback: function (request) {
                                                if (!request.operation.success) {
                                                    Ext.Msg.show({
                                                        title: 'Advertencia',
                                                        msg: Ext.decode(request.operation.response.responseText).msg,
                                                        buttons: Ext.Msg.OK,
                                                        icon: Ext.Msg.WARNING
                                                    });
                                                } else {
                                                    Ext.Msg.show({
                                                        title: 'Felicidades!!',
                                                        msg: Ext.decode(request.operation.response.responseText).msg,
                                                        buttons: Ext.Msg.OK,
                                                        icon: Ext.Msg.INFO
                                                    });
                                                    var view = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #velementosintervenidos')[0];
                                                    view.store.load({ params: { ID_OT: request.operation.records[0].get('ID_OT') } });
                                                }
                                            },
                                        },
                                    })
                                },
                            }]
                        },
                        {
                            title: 'Mano de Obra',
                            items: [{
                                xtype: 'gridmaterialesmanoobra',
                                tbar: [{
                                    xtype: 'tbfill'
                                },
                                {
                                    text: 'Añadir Mano de Obra',
                                    iconCls: 'icon-add',
                                    action: 'addManoObra'
                                }],
                                itemId: 'gridmanoobrapresupuesto',
                                buildStore: function () {
                                    return Ext.create('App.store.OrdenesTrabajo.DetalleEjecutadoContratista', {
                                            proxy: {
                                                type: 'ajax',
                                                api: {
                                                    read: Constantes.HOST + 'Presupuestos/ObtenerPresupuestosPaginados',
                                                    create: Constantes.HOST + 'OrdenesTrabajo/GuardarDetalleEjecutadoContratista',
                                                },
                                                reader: {
                                                    type: 'json',
                                                    root: 'data',
                                                    totalProperty: 'total'
                                                },
                                                writer: {
                                                    type: 'json',
                                                    allowSingle: false
                                                },
                                                afterRequest: function (request, success) {
                                                    if (request.action == 'create') {
                                                        this.createCallback(request);
                                                    }
                                                },
                                                createCallback: function (request) {
                                                    if (!request.operation.success) {
                                                        Ext.Msg.show({
                                                            title: 'Advertencia',
                                                            msg: Ext.decode(request.operation.response.responseText).msg,
                                                            buttons: Ext.Msg.OK,
                                                            icon: Ext.Msg.WARNING
                                                        });
                                                    } else {
                                                        Ext.Msg.show({
                                                            title: 'Felicidades!',
                                                            msg: Ext.decode(request.operation.response.responseText).msg,
                                                            buttons: Ext.Msg.OK,
                                                            icon: Ext.Msg.INFO
                                                        });
                                                        var view = Ext.ComponentQuery.query('ejecutadocontratistaprincipal panel #velementosintervenidos')[0];
                                                        view.store.load({ params: { ID_OT: request.operation.records[0].get('ID_OT') } });
                                                    }
                                                },
                                            },
                                    })
                                },
                            }],
                        }
            ]
        });

        var terceraFila = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            padding: '10px 20px 10px 20px',
            defaults: {
                labelStyle: 'font-weight:bold;',
                labelWidth: 5
            },
            items: [tabs]
        };
        return [{ xtype: primeraFila }, { xtype: segundaFila }, {xtype: terceraFila }]
    },

    buildButtons: function () {
        return [{
                    text: 'Guardar',
                    disabled: true,
                    itemId: 'btnGuardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    handler: function () { this.up('.window').close(); }
               }]
    }
});