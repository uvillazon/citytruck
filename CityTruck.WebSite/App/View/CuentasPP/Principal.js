Ext.define("App.View.CuentasPP.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'CuentasPP',
    accionGrabar: 'GrabarCuentasPP',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.id_cliente = 0;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCuentaPC, me.toolbar, this);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCuentaPC, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCuentaPC, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'folder_database', me.EventosCuentaPC, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCuentaPC, me.toolbar, this, null, true);

        //        Funciones.CrearMenu('btn_PlanillaRelevamiento', 'Planilla para Relevamiento', Constantes.ICONO_VER, me.EventosPlanilla, me.toolbar, this);
        //me.grid.addDocked(me.toolbar, 1);
        me.grid = Ext.create('App.View.CuentasPP.GridCuentasPP', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridCuentasPP',
            toolbar: me.toolbar
        });
        me.items = [me.grid
        ];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);
        me.grid.on('itemdblclick', me.MostrarKardex, this);
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
        me.id_cliente = record.get('ID_CLIENTE');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        //Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Kardex', me.toolbar, disabled);
    },
    EventosCuentaPC: function (btn) {

        var me = this;
        Funciones.checkTimeout();
        switch (btn.getItemId()) {
            case "btn_Crear":
                me.MostrarForm(true);
                break;
            case "btn_Editar":
                me.MostrarForm(false, false);
                break;
            case "btn_Detalle":
                me.MostrarForm(false, true);
                break;
            case "btn_Eliminar":
                me.EliminarRegistro();
                break;
            case "btn_Kardex":
                me.MostrarKardex();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    MostrarForm: function (isNew, block) {
        var me = this;
        if (me.winCrearCliente == null) {
            me.winCrearCliente = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
            me.formCliente = Ext.create("App.View.CuentasPP.FormCliente", {
                title: 'Registro de Cliente ',
                botones: false
            });

            me.winCrearCliente.add(me.formCliente);
            me.winCrearCliente.btn_guardar.on('click', me.GuardarCliente, this);
        } else {
            me.formCliente.getForm().reset();
        }
        if (!isNew && !Funciones.isEmpty(me.recordSelected)) {
            me.formCliente.CargarDatos(me.recordSelected);
        }
        me.winCrearCliente.show();

    },
    CrearFormContrato: function (btn) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, destruirWin: true });
        var form = Ext.create("App.View.CuentasPP.FormContrato", {
            columns: 2,
            title: 'Nuevo Contrato',
            botones: false
        });
        if (btn.getItemId() === "btn_editar_contrato") {
            form.loadFormulario("ClientesPorPagar", "ObtenerContratoPorId", { ID_CONTRATO: me.gridKardexCaja.record.get('ID_CONTRATO') });
            //form.cbx_cliente.setVisible(false);
            //form.txt_cliente.setVisible(true);
        }
        else {
            form.txt_cliente.setValue(me.record.get('RAZON_SOCIAL'));
            form.txt_id_cliente.setValue(me.record.get('ID_CLIENTE'));
        }
        //if (me.gridKardexCaja.record != null) {
        //    form.loadFormulario("ClientesPorPagar", "ObtenerContratoPorId", { ID_CONTRATO: me.gridKardexCaja.record.get('ID_CONTRATO') });
        //    form.cbx_cliente.setVisible(false);
        //    form.txt_cliente.setVisible(true);
        //}
        win.add(form);
        win.show();
        win.btn_guardar.on("click", function () {
            Funciones.AjaxRequestWin('ClientesPorPagar', 'GuardarContrato', win,
        form, me.gridKardexCaja, 'Esta Seguro de Guardar el Contrato?', null, win);
        });
        //me.formNuevoMovimiento.cbx_cuenta.setValue(id_caja);
        //me.winNuevoMovimiento.show();

    }
    ,
    CrearFormAnticipo: function (record) {
        var me = this;
        if (record == null) {
            Ext.Msg.alert("Error", "Seleccione un registro");
        }
        else {
            if (record.get('OPERACION') != "CONTRATO") {
                Ext.Msg.alert("Error", "Seleccione un registro que sea CONTRATO");
            }
            else {
                var win = Ext.create("App.Config.Abstract.Window", { botones: true });
                var form = Ext.create("App.View.CuentasPP.FormAnticipo", {
                    columns: 2,
                    title: 'Amortizacion',
                    botones: false
                });
                form.loadRecord(record);
                win.add(form);
                win.show();
                win.btn_guardar.on("click", function () {
                    Funciones.AjaxRequestWin('ClientesPorPagar', 'GuardarAnticipo', win,
                form, me.gridKardexCaja, 'Esta Seguro de Guardar el Contrato?', null, win);
                });
            }
        }
    }
    ,
    //App.View.CuentasPP.FormAnticipo
    CrearFormAmortizacionKardex: function (id_caja) {
        var me = this;
        if (me.winNuevoMovimiento == null) {
            me.winNuevoMovimiento = Ext.create("App.Config.Abstract.Window", { botones: true });
            me.formNuevoMovimiento = Ext.create("App.View.Clientes.FormMovimiento", {
                columns: 1,
                title: 'Nuevo Movimiento',
                botones: false
            });
            me.winNuevoMovimiento.add(me.formNuevoMovimiento);
            me.winNuevoMovimiento.btn_guardar.on('click', me.GuardarMovimiento, this);
            //me.formNuevoMovimiento.cbx_cuenta.setValue(id_caja);
            me.winNuevoMovimiento.show();
        } else {
            //me.formNuevoMovimiento.cbx_cuenta.setValue(id_caja);
            me.formNuevoMovimiento.getForm().reset();
            me.winNuevoMovimiento.show();
        }
        if (me.id_cliente >= 0)
            me.formNuevoMovimiento.cargarCliente(me.id_cliente);

    },
    GuardarContrato: function () {
        var me = this;
        Funciones.AjaxRequestWin('ClientesPorPagar', 'GuardarContrato', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
    },
    GuardarMovimiento: function () {
        var me = this;
        Funciones.AjaxRequestWin('Clientes', 'GuardarAmortizacion', me.winNuevoMovimiento,
             me.formNuevoMovimiento, me.gridKardexCaja, 'Esta Seguro de Guardar el Movimiento?', null, me.winNuevoMovimiento);
    },
    GuardarCliente: function () {
        var me = this;
        Funciones.AjaxRequestWin('ClientesPorPagar', 'GuardarCliente', me.winCrearCliente,
             me.formCliente, me.grid, 'Esta Seguro de Guardar el Cliente?', null, me.winCrearCliente);

    },
    EliminarRegistro: function () {
        var me = this;
        Funciones.AjaxRequestGrid("Clientes", "EliminarCliente", me, "Esta Seguro de Eliminar este Registro", { ID_CLIENTE: me.id_cliente }, me.grid, null);

    },

    
    MostrarKardex: function () {
        var me = this;
        var buttonGroup = [

            {
                xtype: 'button',
                text: 'Contratos',
                itemId: 'btn_crear_contrato',
                iconCls: 'add',
                minHeight: 27,
               
                minWidth: 80,
                listeners: {
                    scope: me,
                    click: me.CrearFormContrato
                }
                //handler: function () {
                //    me.CrearFormContrato(me.id_cliente);
                //}

            },
            {
                xtype: 'button',
                text: 'Editar Contr.',
                itemId: 'btn_editar_contrato',
                iconCls: Constantes.ICONO_EDITAR,
                minHeight: 27,
                disabled: true,
                scope: me,
                minWidth: 80,
                listeners: {
                    scope: me,
                    click: me.CrearFormContrato
                }


            },
             {
                 xtype: 'button',
                 text: 'Imprimir Contr.',
                 itemId: 'btn_imprimir_contrato',
                 iconCls: 'printer',
                 minHeight: 27,
                 disabled: true,
                 minWidth: 80,
                 handler: function () {
                     me.gridKardexCaja.ImprimirReporteContrato();
                 }

             },
             {
                 xtype: 'button',
                 text: 'Kardex Contr.',
                 itemId: 'btn_kardex_contrato',
                 iconCls: 'folder_database',
                 minHeight: 27,
                 disabled: true,
                 minWidth: 80,
                 handler: function () {
                     me.VentanaKardexContratos();
                 }

             },
             //
             {
                 xtype: 'button',
                 text: 'Eliminar Contr',
                 itemId: 'btn_eliminar_contrato',
                 iconCls: Constantes.ICONO_BAJA,
                 minHeight: 27,
                 disabled: true,
                 minWidth: 80,
                 handler: function () {
                     me.EliminarContrato();
                 }

             },
            {
                xtype: 'button',
                text: 'Amortizaci\u00F3n',
                itemId: 'btn_crear_amortizacion',
                iconCls: 'add',
                disabled: true,
                minHeight: 27,
                minWidth: 80,
                handler: function () {
                    me.CrearFormAnticipo(me.gridKardexCaja.record);
                }

            },
            {
                xtype: 'button',
                text: 'Editar Amort.',
                itemId: 'btn_editar_amortizacion',
                iconCls: Constantes.ICONO_EDITAR,
                minHeight: 27,
                hidden : true,
                minWidth: 80,
                disabled: true,
                handler: function () {
                    me.CrearFormContrato(me.id_cliente);
                }

            },
             {
                 xtype: 'button',
                 text: 'Imprimir Amort.',
                 itemId: 'btn_imprimir_amortizacion',
                 iconCls: 'printer',
                 minHeight: 27,
                 minWidth: 80,
                 disabled: true,
                 handler: function () {
                     me.gridKardexCaja.ImprimirReporteAnticipo();
                 }

             },
             {
                 xtype: 'button',
                 text: 'Eliminar Amort.',
                 itemId: 'btn_eliminar_amortizacion',
                 iconCls: Constantes.ICONO_BAJA,
                 disabled: true,
                 minHeight: 27,
                 minWidth: 80,
                 handler: function () {
                     me.EliminarAmortizacion();
                 }

             },
        {
            xtype: 'button',
            text: 'Cerrar',
            iconCls: 'cross',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                this.up('window').close();
                me.grid.getStore().load();
            }

        }];

        me.winKardexCaja = Ext.create("App.Config.Abstract.Window", { botones: false, buttons: buttonGroup });
        me.gridKardexCaja = Ext.create("App.View.CuentasPP.GridKardexCliente", {
            region: 'center',
            width: 1000,
            height: 350,
            imagenes: false,
            id_cliente: me.id_cliente,
            opcion: 'GridKardexCuentasPP',
            winPadre: me.winKardexCaja
        });
        me.winKardexCaja.add([me.gridKardexCaja]);
        //            me.winKardexCaja.add(me.formTotales);
        me.winKardexCaja.show();

    },
    EliminarContrato: function () {
        var me = this;
        Funciones.AjaxRequestGrid("ClientesPorPagar", "EliminarContrato", me.winKardexCaja, "Esta Seguro de Eliminar este Contrato", { ID: me.gridKardexCaja.record.get('ID_OPERACION') }, me.gridKardexCaja, null);

    },
    EliminarAmortizacion: function () {
        var me = this;
        Funciones.AjaxRequestGrid("ClientesPorPagar", "EliminarAnticipo", me.winKardexCaja, "Esta Seguro de Eliminar el Anticipo", { ID: me.gridKardexCaja.record.get('ID_OPERACION') }, me.gridKardexCaja, null);

    },
    VentanaKardexContratos: function (btn) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, destruirWin: true });
        var grid = Ext.create("App.View.CuentasPP.GridAnticipos", {
            cargarStore : false
        });
        win.add(grid);
        win.show();
        grid.getStore().setExtraParams({ ID_CONTRATO: me.gridKardexCaja.record.get('ID_CONTRATO') });
        grid.getStore().load();
        
    }
});
