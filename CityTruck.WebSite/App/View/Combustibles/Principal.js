Ext.define("App.View.Combustibles.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Compras',
    accionGrabar: 'GrabarCompras',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        me.CargarEventos();
        me.grid.getStore().load();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCompras, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCompras, me.toolbar, this, null, true);
        //        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCompras, me.toolbar, this, null, true);
        //        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCompras, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Combustibles.GridCombustibles', {
            region: 'west',
            width: '40%',
            height: 350,
            title: 'Combustibles',
            imagenes: false,
            opcion: 'GridCompras',
            toolbar: me.toolbar
        });

        me.gridPos = Ext.create("App.View.Combustibles.GridPos", {
            opcion: 'GridDetallesCompra',
            title: "Punto de Carga de Combustible",
            flex: 1,
        });

        me.toolbarAjuste = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearAjuste', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCompras, me.toolbarAjuste, this, null, true);
        Funciones.CrearMenu('btn_EditarAjuste', 'Editar', Constantes.ICONO_EDITAR, me.EventosCompras, me.toolbarAjuste, this, null, true);

        me.gridAjuste = Ext.create("App.View.Combustibles.GridAjustesPrecios", {
            opcion: 'GridDetallesCompra',
            title: "Ajuste de Precios Por Combustible",
            flex: 1,
            toolbar: me.toolbarAjuste
        });
        me.panelCentral = Ext.create('Ext.panel.Panel', {
            region: 'center',
            width: '58%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                me.gridPos,
                me.gridAjuste
            ]
        });

        /* Items del contenedor */
        me.items = [me.grid, me.panelCentral];
        // Funciones.BloquearFormulario(me.form);
        // me.items = [me.grid, me.form];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.id_compra = record.get('ID_COMPRA');
        me.record = record;
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        idCombustible = disabled ? -1 : me.record.get('ID_COMBUSTIBLE');
        //        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_CrearAjuste', me.toolbarAjuste, disabled);

        me.gridPos.getStore().setExtraParams({ ID_COMBUSTIBLE: idCombustible });
        me.gridPos.getStore().load();

        me.gridAjuste.getStore().setExtraParams({ ID_COMBUSTIBLE: idCombustible });
        me.gridAjuste.getStore().load();
        //        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    CargarEventos: function () {
        var me = this;
        me.grid.getStore().on('load', function (str, records, success) {
            if (!success) {
                str.removeAll();
                Ext.Msg.alert("Error", "Ocurrio algun Error");
            }
        });
    },
    EventosCompras: function (btn) {
        var me = this;
        Funciones.checkTimeout();
        if (btn.getItemId() == "btn_Crear" || btn.getItemId() == "btn_Detalle") {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
        else if (btn.getItemId() == "btn_Editar") {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
        else if (btn.getItemId() == 'btn_Eliminar') {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
        else if (btn.getItemId() == 'btn_CrearAjuste') {
            if (me.winCrearCaja == null) {
                me.winCrearCaja = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
                me.formCrearCaja = Ext.create("App.View.Combustibles.FormAjustePrecio", {
                    title: 'Registro de Cajas ',
                    botones: false,
                    dockButtons: true
                });
                me.winCrearCaja.add(me.formCrearCaja);
                me.winCrearCaja.btn_guardar.on('click', me.GuardarCajas, this);
                // me.formCrearCaja.down('#docked_modificar').on('click', me.Modificar, this);
                // me.formCrearCaja.down('#docked_eliminar').on('click', me.EliminarRegistro, this);
                // me.formCrearCaja.down('#docked_comprobante').setVisible(false);

            } else {
                me.formCrearCaja.getForm().reset();
                me.formCrearCaja.CargarStore();
            }
            me.winCrearCaja.show();
        }


        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
});
