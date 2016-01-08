Ext.define("App.View.Compras.Principal", {
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

        me.grid = Ext.create('App.View.Compras.GridCompras', {
            region: 'west',
            width : '70%',
            height: 350,
            imagenes: false,
            opcion: 'GridCompras',
            toolbar: me.toolbar
        });
       
        me.form = Ext.create('App.View.Compras.Forms', {
            opcion: 'formResumen',
            columns : 2,
            width : '30%',
            region: 'center',

        });
        Funciones.BloquearFormulario(me.form);
        me.items = [me.grid,me.form];

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
//        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
//        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    CargarEventos : function(){
        var me = this;
        me.grid.getStore().on('load',function(str,records,success){
            if(!success){
                str.removeAll();
                Ext.Msg.alert("Error","Ocurrio algun Error");
            }else{
                me.CargarTotales();
            }
        });
    },
    EventosCompras: function (btn) {
        var me = this;
        Funciones.checkTimeout();
        if (btn.getItemId() == "btn_Crear" || btn.getItemId() =="btn_Detalle") {
            if (me.winCrearCompra == null) {
                me.winCrearCompra = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Nuevo Compra' });
                me.formCompra = Ext.create("App.View.Compras.FormCompra", {
                    columns: 2,
                    title: 'Formulario de Registro de Compras ',
                    botones: false,
                     dockButtons: true
                })
                me.formCompra.down('#docked').setDisabled(true);
                me.formCompra.down('#docked_modificar').on('click', me.ModificarCompra, this);
                me.formCompra.down('#docked_eliminar').on('click', me.EliminarRegistro, this);
                me.formCompra.down('#docked_comprobante').on('click', me.ImprimirComprobante, this);
                me.winCrearCompra.add(me.formCompra);
                me.winCrearCompra.btn_guardar.on('click', me.GuardarCompras, this);
                me.winCrearCompra.show();
            } else {
                me.formCompra.down('#docked').setDisabled(true);
                me.winCrearCompra.btn_guardar.setDisabled(false);
                me.formCompra.habilitarFormulario(true, true);
                me.formCompra.getForm().reset();
                me.formCompra.gridDetalle.getStore().removeAll();
                me.formCompra.CargarStore();
                me.winCrearCompra.show();
            }
            if(btn.getItemId() =="btn_Detalle"){
                 me.formCompra.habilitarFormulario(true, true);
                 me.formCompra.CargarDatos(me.record);
                 me.formCompra.gridDetalle.getStore().setExtraParams({ID_COMPRA : me.record.get('ID_COMPRA')});
                 me.formCompra.gridDetalle.getStore().load();
                 me.formCompra.down('#docked').setDisabled(false);
                 me.winCrearCompra.btn_guardar.setDisabled(true);
                 me.formCompra.habilitarFormulario(false);
            }
        }
//        else if(btn.getItemId() == "btn_Detalle"){
//            if (me.winCrearCompra == null) {
//                me.winCrearCompra = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Nuevo Compra' });
//                me.formCompra = Ext.create("App.View.Compras.FormCompra", {
//                    columns: 2,
//                    title: 'Formulario de Registro de Compras ',
//                    botones: false,
//                     dockButtons: true
//                })
//                me.formCompra.down('#docked').setDisabled(true);
//                me.formCompra.down('#docked_modificar').on('click', me.ModificarCompra, this);
//                me.formCompra.down('#docked_eliminar').on('click', me.EliminarRegistro, this);
////            me.formCompra.down('#docked_comprobante').on('click', me.ImprimirComprobante, this);
//                me.winCrearCompra.add(me.formCompra);
//                me.winCrearCompra.btn_guardar.on('click', me.GuardarCompras, this);
//                me.winCrearCompra.show();
//            } else {
//                me.formCompra.down('#docked').setDisabled(true);
//                me.winCrearCompra.btn_guardar.setDisabled(false);
//                me.formCompra.habilitarFormulario(true, true);
//                me.formCompra.getForm().reset();
//                me.formCompra.gridDetalle.getStore().removeAll();
//                me.formCompra.CargarStore();
//                me.winCrearCompra.show();
//            }
//        }
        else if(btn.getItemId()== "btn_Editar"){
            var win = Ext.create("App.Config.Abstract.Window",{botones : true , textGuardar : 'Editar Compra'});
            var form = Ext.create("App.View.Compras.FormCompra",{
                    columns: 2,
                    title: 'Formulario de Edicion de Compras ',
                    botones: false
            });
//            Funciones.BloquearFormularioReadOnly(form);
            win.add(form);
            form.ModoEdicion();
            form.loadRecord(me.record);
            form.gridDetalle.getStore().setExtraParams({ID_COMPRA : me.record.get('ID_COMPRA')});
            form.gridDetalle.getStore().load();
            win.show();
            win.btn_guardar.on('click', function(){
                Funciones.AjaxRequestWin('Compras', 'GuardarCompra', win, form, me.grid, 'Esta Seguro de Editar la Compra?', { ID_COMPRA: me.id_compra,detalles: Funciones.convertirJson(form.gridDetalle) }, win);
            });
        }
        else if (btn.getItemId() == 'btn_Eliminar'){
            Funciones.AjaxRequestGrid("Compras", "EliminarCompra", me, "Esta Seguro de Eliminar este Registro", { ID_COMPRA: me.id_compra }, me.grid, null);
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    EliminarRegistro: function () {
        var me = this;
        me.id_compra = me.formCompra.txt_id_compra.getValue();
//        Funciones.AjaxRequestGrid("Ingresos", "EliminarIngreso", me, "Esta Seguro de Eliminar el Ingreso", { ID_INGRESO: me.id_ingreso }, me.grid, me.winCrearIngreso);
        Funciones.AjaxRequestGrid("Compras", "EliminarCompra", me, "Esta Seguro de Eliminar este Registro", { ID_COMPRA: me.id_compra }, me.grid, me.winCrearCompra);
    },
    GuardarCompras: function () {
        var me = this;
        Funciones.AjaxRequestWin('Compras', 'GuardarCompra', me.winCrearCompra, me.formCompra, me.grid, 'Esta Seguro de Guardar la Compra?', { detalles: Funciones.convertirJson(me.formCompra.gridDetalle) },null,"ID_COMPRA");
//        Funciones.AjaxRequestWin('Ingresos', 'GuardarIngreso', me.winCrearIngreso, me.formIngreso, me.grid, 'Esta Seguro de Guardar el Ingreso?', null, null, 'ID_INGRESO');
        me.formCompra.down('#docked').setDisabled(false);
        me.winCrearCompra.btn_guardar.setDisabled(true);
//        me.formIngreso.mostrarSaldos(false);
    },
    ModificarCompra: function () {
        var me = this;
        me.formCompra.habilitarFormulario(true);
        me.winCrearCompra.btn_guardar.setDisabled(false);
    },
    CargarTotales : function(){
        var me = this;
        var cantidadGasolina = 0;
        var cantidadDiesel = 0;
        var cantidadAdicionalGasolina = 0;
        var cantidadAdicionalDiesel = 0;
        var ImporteGasolina = 0;
        var ImporteDiesel = 0;
        var ImporteGasolinaAdicional = 0;
        var ImporteDieselAdicional = 0;
        me.grid.getStore().each(function(record){
//            alert(record.get('TOTAL'));
            if(record.get('TIPO') == "ASIGNACION"){
                if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                    cantidadGasolina= cantidadGasolina +  record.get('CANTIDAD');
                    ImporteGasolina= ImporteGasolina +  record.get('TOTAL');
                
                }
                else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                    cantidadDiesel= cantidadDiesel +  record.get('CANTIDAD');
                    ImporteDiesel= ImporteDiesel +  record.get('TOTAL');
                }
                else{
                    alert('No existe Codigo falta Implementar');
                }
            }
            else{
                if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                    cantidadAdicionalGasolina= cantidadAdicionalGasolina +  record.get('CANTIDAD');
                    ImporteGasolinaAdicional= ImporteGasolinaAdicional +  record.get('TOTAL');
                
                }
                else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                    cantidadAdicionalDiesel= cantidadAdicionalDiesel +  record.get('CANTIDAD');
                    ImporteDieselAdicional= ImporteDieselAdicional +  record.get('TOTAL');
                }
                else{
                    alert('No existe Codigo falta Implementar');
                }
            }

        });
        me.form.txt_cantidad.setValue(cantidadDiesel);
        me.form.txt_cant_diesel.setValue(cantidadGasolina);
        me.form.txt_importe.setValue(ImporteDiesel);
        me.form.txt_imp_diesel.setValue(ImporteGasolina);

        me.form.txt_asignacion.setValue(cantidadDiesel);
//        me.form.txt_asignacion1.setValue(ImporteDiesel);
        me.form.txt_asignacion1.setRawValue(Ext.util.Format.number(ImporteDiesel, '0.000,00/i'));
        me.form.txt_asignacion_gas.setValue(cantidadGasolina);
        me.form.txt_asignacion_gas1.setRawValue(Ext.util.Format.number(ImporteGasolina, '0.000,00/i'));
        me.form.txt_adicional.setValue(cantidadAdicionalDiesel);
        me.form.txt_adicional1.setRawValue(Ext.util.Format.number(ImporteDieselAdicional, '0.000,00/i'));
        me.form.txt_adicional_diesel.setValue(cantidadAdicionalGasolina);
        me.form.txt_adicional_diesel1.setRawValue(Ext.util.Format.number(ImporteGasolinaAdicional, '0.000,00/i'));

        me.form.txt_total.setValue(cantidadDiesel + cantidadAdicionalDiesel);
        me.form.txt_total_diesel.setValue(cantidadGasolina +cantidadAdicionalGasolina );
        me.form.txt_total1.setRawValue(Ext.util.Format.number(ImporteDiesel + ImporteGasolinaAdicional, '0.000,00/i'));
        me.form.txt_total_diesel1.setRawValue(Ext.util.Format.number( ImporteGasolina +ImporteGasolinaAdicional , '0.000,00/i'));
    },
    ImprimirComprobante: function () {
        var me = this;
        var id = me.formCompra.txt_id_compra.getValue();
        window.open(Constantes.HOST + 'Reportes/ReporteCmpCompra?ID_COMPRA=' + id);
    }
});
