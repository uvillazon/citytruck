Ext.define("App.View.VentasMN.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Tanques',
    accionGrabar: 'GrabarTanques',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();

//        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //        Funciones.CrearMenu('btn_CrearRegistro', 'Crear Registro', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_EditarRegistro', 'Crear Editar Registro', Constantes.ICONO_EDITAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_reporte', 'Imprimir', 'printer', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_reporteANHDie', 'Reporte ANH Diesel', 'printer', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_reporteANHGas', 'Reporte ANH Gasolina', 'printer', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_AjustarTanque', 'Merma Demacia', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.VentasMN.GridVentas', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridVentas',
            toolbar: me.toolbar
        });
        me.items = [me.grid];
        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.record = record;
        me.id = record.get('ID_VENTA');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        if (!disabled) {
            var campo = selModel.nextSelection.columnHeader.dataIndex;
            //            alert(campo);
            me.ajuste = campo;
            //            alert(campo);
            //            if (campo == "VENTAS_GAS" && selections[0].get('VENTAS_GAS') != 0) { me.combustible = 1; }
            //            else if (campo == "VENTAS_DIE" && selections[0].get('VENTAS_DIE') != 0) { me.combustible = 2; }
            if (campo == "VENTAS_GAS") { me.combustible = 1; }
            else if (campo == "VENTAS_DIE") { me.combustible = 2; }
            else { me.combustible = 0; }
        }
        else {
            me.combustible = 0;
            me.ajuste == "";
        }
        Funciones.DisabledButton('btn_EditarRegistro', me.toolbar, disabled);
        Funciones.DisabledButton('btn_AjustarTanque', me.toolbar, disabled);
        //        Funciones.DisabledButton('btn_CrearRegistro', me.toolbar, disabled);
    },
    EventosPrincipal: function (btn) {
        var me = this;
        Funciones.checkTimeout();
        if (btn.getItemId() == "btn_CrearRegistro") {
            if (me.combustible == 0) {
                Ext.Msg.alert("Aviso", "Seleccione un registro Valido");
            }
            else {
                var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Factura MN' });
                var form = Ext.create("App.View.VentasMN.FormRegistro", { botones: false, title: 'Registro de Factura a MN', opcion: 'FormFacturas', columns: 1 });
                //            form.CargarFecha();
                form.CargarCrearFactura(me.record, me.combustible);
                win.add(form);
                win.show();
                win.btn_guardar.on('click', function () {
                    //                alert("adasda");
                    //                Funciones.AjaxRequestForm('Ventas', 'GuardarVentasDiarias', win, from, form.gridVenta, 'Esta Seguro de Guardar Las Ventas Diarias', { ventas: Funciones.convertirJson(me.gridVenta), EDITAR: me.editar }, null);
                    Funciones.AjaxRequestWin('Ventas', 'GuardarVentasFacturaMN', win, form, me.grid, "Esta seguro de Guardar", null, win);
                    //                Funciones.AjaxRequestWin: function (controlador, accion, mask, form, grid, msg, param, win)
                    //                win.hide();
                });
            }
        }
        else if (btn.getItemId() == "btn_EditarRegistro") {
            if (me.combustible == 0) {
                Ext.Msg.alert("Aviso", "Seleccione un registro Valido");
            }
            else {
                var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Editar Venta MN' });
                var form = Ext.create("App.View.VentasMN.FormRegistro", { botones: false, title: 'Guardar Facturas MN', opcion: 'FormEditarFacturas', columns: 1 });
                //            form.CargarFecha();
                form.CargarEditarFactura(me.record, me.combustible);
                win.add(form);
                win.show();
                win.btn_guardar.on('click', function () {
                    //                alert("adasda");
                    //                Funciones.AjaxRequestForm('Ventas', 'GuardarVentasDiarias', win, from, form.gridVenta, 'Esta Seguro de Guardar Las Ventas Diarias', { ventas: Funciones.convertirJson(me.gridVenta), EDITAR: me.editar }, null);
                    Funciones.AjaxRequestWin('Ventas', 'GuardarVentasFacturaMN', win, form, me.grid, "Esta seguro de Guardar", null, win);
                    //                Funciones.AjaxRequestWin: function (controlador, accion, mask, form, grid, msg, param, win)
                    //                win.hide();
                });
            }
        }
        else if (btn.getItemId() == "btn_reporte") {
            window.open(Constantes.HOST + 'ReportesPDF/ReporteANH?ANIO=' + me.grid.cbx_anio.getValue() + '&MES=' + me.grid.cbx_mes.getValue());
        }
        else if (btn.getItemId() == "btn_reporteANH") {
            var win = Ext.create("App.View.Reportes.Reportes", { opcion: "ReporteAutoridad" });
            win.cbx_mes.setValue(me.grid.cbx_mes.getValue());
            win.cbx_anio.setValue(me.grid.cbx_anio.getValue());
            win.show();

        }
        else if (btn.getItemId() == "btn_reporteANHDie") {
            window.open(Constantes.HOST + 'Reportes/ReporteAutoridad?ANIO=' + me.grid.cbx_anio.getValue() + '&MES=' + me.grid.cbx_mes.getValue() + '&ID_COMBUSTIBLE=2');
        }
        else if (btn.getItemId() == "btn_reporteANHGas") {
            window.open(Constantes.HOST + 'Reportes/ReporteAutoridad?ANIO=' + me.grid.cbx_anio.getValue() + '&MES=' + me.grid.cbx_mes.getValue() + '&ID_COMBUSTIBLE=1');
        }
        if (btn.getItemId() == "btn_AjustarTanque") {
            if (me.ajuste == "AJUSTES_DIE") {
                //                alert("Diesel");
                me.VentanaAjustePos(2);
            }
            else if (me.ajuste == "AJUSTES_GAS") {
                me.VentanaAjustePos(1);
            }
            else {
                Ext.Msg.alert("Aviso", "Seleccione en la posicion de MERMA DEMACIA y el COMBUSTIBLE");
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    VentanaAjustePos: function (combustible) {
        var me = this;
//        me.btn4 = Funciones.CrearMenu('btn_ImprimirReporte', 'Imprimir Reporte', 'printer', null, null, this);
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Ajuste'/*, btn4: me.btn4 */});
        var form = Ext.create("App.View.Tanques.FormAjustarTanque", {
            columns: 1,
            title: 'Formulario de Merma Demacia',
            botones: false,
            opcion: 'FormEditarAjuste'
        });
//        me.btn4.on('click', me.VerReporteAjuste, me);
//        me.btn4.on('click', form.VerReporteAjuste,form);
        form.CargarEditarAjusteMN(me.record, combustible);
        //        form.gridAjuste.getStore().setExtraParams({ FECHA: me.record.get('FECHA') });
        //        form.gridAjuste.getStore().setExtraParams({ Contiene: me.ajuste });
        //        form.gridAjuste.getStore().load();
        //        form.date_fecha.setValue(me.record.get('FECHA'));
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin('Combustibles', 'GuardarAjusteTanqueMN', win, form, me.grid, 'Esta Seguro de Guardar Ajuste?', null, win);
        });
    },

});
