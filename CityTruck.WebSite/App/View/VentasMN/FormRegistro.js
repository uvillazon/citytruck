Ext.define("App.View.VentasMN.FormRegistro", {
    extend: "App.Config.Abstract.Form",
//    title: "Datos de Orden de Trabajo",dsdsdsddsdsdsds
    cargarStores: true,
    columns: 2,
    editar : false,
    permiso : false,
    opcion : '',
    initComponent: function () {
        var me = this;
        if(me.opcion == ''){
            me.CargarComponentes();
            me.cargarEventos();
        }
        else if(me.opcion == 'FormFacturas'){
            me.CargarFormFacturas();
            me.EventosFormFactura();
        }
        else if (me.opcion == 'FormEditarFacturas' ){
            me.CargarFormFacturas();
             me.EventosFormEditarFactura();
        }
        this.callParent(arguments);
    },
    CargarStoreFecha : function(fecha1){
        var me = this;
        var fecha = fecha1 == null? new Date() : fecha1;
        me.store_precio = Ext.create("App.Store.Ventas.Precios");
        me.store_precio.setExtraParams({FECHA : fecha});
        me.store_precio.load();
    },
    CargarFecha : function(store){
        var me = this;
//        alert("sadasd2");
        Ext.Ajax.request({
                    method : 'POST',
                    url: Constantes.HOST + 'Ventas/VerificarUltimoRegistro',
                     params: {
                        MN: true
                    },
                    success: function(response){
                        var str = Ext.JSON.decode(response.responseText);
                        //                        alert(str.success + "FECHA : "+str.FECHA + "TURNO : "+str.TURNO);
                        if (str.success == 0){
                             if (str.FECHA == "" ){
                                var fecha = new Date();
                                 me.date_fecha.setReadOnly(false);
                                 me.date_fecha.setValue(fecha);
                                 me.permiso = true;
                             }
                             else{
                                var fecha =str.FECHA;
                                 me.date_fecha.setReadOnly(true);
                                 me.date_fecha.setValue(fecha);
                                 me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                                 me.gridVenta.getStore().load();
                                 me.permiso = true;
                             }

                            
                        }
                        else{
                            me.date_fecha.setValue(str.FECHA);
                            me.date_fecha.setReadOnly(true);
                            me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                            me.gridVenta.getStore().setExtraParam('EDITAR',false);
                            me.gridVenta.getStore().load();
                            me.permiso = true;
                            
                            
                        }
                    }
                });
//        alert(store.getId());
    },
    CargarFormEditarFacturas : function(){
        var me = this;
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "LITROS",
            allowDecimals: false,
            readOnly : true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE",
//            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_precio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Precio Litro ",
            name: "PRECIO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.items = [
            me.date_fecha,
            me.cbx_combustible,
            me.num_precio,
            me.num_importe,
            me.num_litros,

        ];
    },
    CargarEditarVenta : function(venta){
        var me = this;
        me.venta = venta;
        me.date_fecha.setValue(me.venta.get('FECHA'));
        me.date_fecha.setReadOnly(true);
        me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
        me.gridVenta.getStore().load();
        me.permiso = true;
//        me.date_fecha.setReadOnly(true);
    },
    CargarEditarFactura: function(venta , combustible){
        var me = this;
        me.venta = venta;
//        me.loadRecord(venta);
        me.loadFormulario('Ventas','ObtenerFacturaMN',{FECHA : me.venta.get('FECHA') , ID_COMBUSTIBLE : combustible});
        me.date_fecha.setValue(me.venta.get('FECHA'));
        me.date_fecha.setReadOnly(true);
        me.cbx_combustible.setReadOnly(true);
    },
    CargarCrearFactura: function(venta , combustible){
        var me = this;
        me.venta = venta;
//        me.loadRecord(venta);
//        me.loadFormulario('Ventas','ObtenerFacturaMN',{FECHA : me.venta.get('FECHA') , ID_COMBUSTIBLE : combustible});
        me.date_fecha.setValue(me.venta.get('FECHA'));
        me.cbx_combustible.setValue(combustible);
        me.date_fecha.setReadOnly(true);
        me.cbx_combustible.setReadOnly(true);
    },
    CargarFormFacturas : function(){
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_FACTURA",
            hidden : true
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField : 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{DESCRIPCION}" }
        });
        me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "LITROS",
            allowDecimals: false,
            
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE",
            readOnly : true,
//            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_precio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Precio Litro ",
            name: "PRECIO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });

        me.items = [
            me.txt_id,
            me.date_fecha,
            me.cbx_combustible,
            me.num_precio,
            me.num_importe,
            me.num_litros,

        ];
    },
    
    EventosFormFactura : function(){
        var me = this;
        me.cbx_combustible.on('select',function(cmd,record){
            me.combustible = record[0];
            me.num_precio.setValue(me.combustible.get('PRECIO_VENTA'));
            
        });
        me.num_importe.on('change',function(num,newvalue,oldvalue){
            if(newvalue != null){
                if(me.cbx_combustible.getValue() == null){
                    Ext.Msg.alert("Error","Seleccione Primero un Tipo de Combustible");
                }
                else{
                    var sum = newvalue / me.combustible.get('PRECIO_VENTA') ;
                    me.num_litros.setValue(sum);
                }
            }
        });
    },
    EventosFormEditarFactura: function(){
        var me = this;
        
        me.num_litros.on('change',function(num,newvalue,oldvalue){
            if(newvalue != null && oldvalue != null){
                    var sum = newvalue * me.num_precio.getValue();
//                    alert(sum);
                    me.num_importe.setValue(sum);
            }
        });
        me.num_litros.f
    },
    CargarComponentes: function () {
        var me = this;
        me.gridVenta = Ext.create("App.View.VentasMN.Grids", {
                    opcion: 'GridVentasEditar',
                    title : 'MITTERS',
                    colspan: 2,
                    width: 400,
                    height : 300,
//                    rowspan : 2,
                });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
      
            me.items=  me.gridVenta ;/*, me.formSubTotales, /* me.formResumen,me.gridVentaCredito,me.gridVentaConsumo];*/
            me.tbar= [me.date_fecha]


    },
    cargarEventos : function(){
        var me = this;
        me.date_fecha.on('select',function(dat,newvalue,oldvalue){
            if(me.date_fecha.getValue() != null){
                        me.gridVenta.getStore().setExtraParamDate('FECHA',me.date_fecha.getValue());
                        me.gridVenta.getStore().setExtraParam('EDITAR',me.editar);
                        me.gridVenta.getStore().load();
                        me.permiso = true;
                
            }
            else{
                Ext.Msg.alert("Seleccione Fecha Valida");
            }
        });
        me.gridVenta.on('edit', function(editor, e){
            
            if (e.field == "SAL_LITTER"){
                if(e.value < e.record.get('ENT_LITTER')){
                    Ext.Msg.alert("Error","El valor de salida no puede ser Menor al de la entrada");
                    e.record.set('SAL_LITTER',e.record.get('ENT_LITTER'));
                }
                else{
                    e.record.set('TOTAL',e.value - e.record.get('ENT_LITTER') );
//                    me.CargarTotales();
                }
            }
        });
    },
    CargarTotalesCredito : function(){
        var me = this;
        var totalGasolina = 0;
        var totalDiesel = 0;
        me.gridVenta.getStore().each(function(record){
            if(record.get('CODIGO')== 'GASOLINA'){
                totalGasolina= totalGasolina +  record.get('TOTAL');
            }
            else if(record.get('CODIGO')== 'DIESEL'){
                totalDiesel= totalDiesel +  record.get('TOTAL');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        var totalGasolinaBs = totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS;
        var totalDieselBs = totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS;
        var totalGasolinaCreditoBs = 0;
        var totalDieselCreditoBs = 0;
        me.gridVentaCredito.getStore().each(function(record){
            if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                totalGasolinaCreditoBs= totalGasolinaCreditoBs +  record.get('GASOLINA');
            }
            else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                totalDieselCreditoBs= totalDieselCreditoBs +  record.get('DIESEL');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        var totalGasolinaConsumoBs = 0;
        var totalDieselConsumoBs = 0;
        me.gridVentaConsumo.getStore().each(function(record){
            if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                totalGasolinaConsumoBs= totalGasolinaConsumoBs +  record.get('IMPORTE_BS');
            }
            else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                totalDieselConsumoBs= totalDieselConsumoBs +  record.get('IMPORTE_BS');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        me.formSubTotales.txt_gasolina_consumo.setValue(totalGasolinaConsumoBs);
        me.formSubTotales.txt_diesel_consumo.setValue(totalDieselConsumoBs);
        me.formSubTotales.txt_total_consumo.setValue(totalGasolinaConsumoBs +totalDieselConsumoBs);

        me.formSubTotales.txt_gasolina01.setValue(totalGasolinaBs);
        me.formSubTotales.txt_diesel01.setValue(totalDieselBs);
        
        me.formSubTotales.txt_gasolina_credito.setValue(totalGasolinaCreditoBs);
        me.formSubTotales.txt_diesel_credito.setValue(totalDieselCreditoBs);
        me.formSubTotales.txt_gasolina_efectivo.setValue(totalGasolinaBs - (totalGasolinaCreditoBs + totalGasolinaConsumoBs ));
        me.formSubTotales.txt_diesel_efectivo.setValue(totalDieselBs - (totalDieselCreditoBs + totalDieselConsumoBs ));
        me.formSubTotales.txt_total_efectivo.setValue((totalDieselBs - (totalDieselCreditoBs + totalDieselConsumoBs )) + (totalGasolinaBs - (totalGasolinaCreditoBs + totalGasolinaConsumoBs )));
        me.formSubTotales.txt_total01.setValue(totalGasolinaBs + totalDieselBs);
        me.formSubTotales.txt_total_credito.setValue(totalDieselCreditoBs + totalGasolinaCreditoBs);

//        txt_total_efectivo

    },
    CargarTotalesConsumo : function(){
        var me = this;
      
        var totalGasolinaConsumoBs = 0;
        var totalDieselConsumoBs = 0;
        me.gridVentaConsumo.getStore().each(function(record){
            if(record.get('COMBUSTIBLE')== 'GASOLINA'){
                totalGasolinaConsumoBs= totalGasolinaConsumoBs +  record.get('IMPORTE_BS');
            }
            else if(record.get('COMBUSTIBLE')== 'DIESEL'){
                totalDieselConsumoBs= totalDieselConsumoBs +  record.get('IMPORTE_BS');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });
        me.formSubTotales.txt_gasolina_consumo.setValue(totalGasolinaConsumoBs);
        me.formSubTotales.txt_diesel_consumo.setValue(totalDieselConsumoBs);
        me.formSubTotales.txt_total_consumo.setValue(totalGasolinaConsumoBs +totalDieselConsumoBs);
        me.formSubTotales.txt_gasolina01.setValue(me.formSubTotales.txt_gasolina01.getValue() - totalGasolinaConsumoBs);
    },
    CargarTotales : function(){
        var me = this;
        var totalGasolina = 0;
        var totalDiesel = 0;
        var totalGasolinaBs = 0;
        var totalDieselBs = 0;
        me.gridVenta.getStore().each(function(record){
//            alert(record.get('TOTAL'));
            if(record.get('CODIGO')== 'GASOLINA'){
                totalGasolina= totalGasolina +  record.get('TOTAL');
                
            }
            else if(record.get('CODIGO')== 'DIESEL'){
                totalDiesel= totalDiesel +  record.get('TOTAL');
            }
            else{
                alert('No existe Codigo falta Implementar');
            }

        });

        me.formSubTotales.txt_diesel.setValue(totalDiesel);
        me.formSubTotales.txt_gasolina.setValue(totalGasolina);

        me.formSubTotales.txt_diesel_bs.setValue(totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS);
        me.formSubTotales.txt_gasolina_bs.setValue(totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS);

        me.formSubTotales.txt_diesel_bs_costo.setValue(totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS);
        me.formSubTotales.txt_gasolina_bs_costo.setValue(totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS);

        me.formSubTotales.txt_total.setValue(totalDiesel + totalGasolina);
        me.formSubTotales.txt_total_Bs.setValue(totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS + totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS);
        me.formSubTotales.txt_total_Bs_costo.setValue(totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS + totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS);

         me.formSubTotales.txt_utilidad.setValue((totalDiesel * Constantes.CONFIG_PRECIO_VENTA_DIS + totalGasolina* Constantes.CONFIG_PRECIO_VENTA_GAS) - (totalDiesel * Constantes.CONFIG_PRECIO_COSTO_DIS + totalGasolina* Constantes.CONFIG_PRECIO_COSTO_GAS) );
        

    },
    EventosVenta : function(btn){
        var me = this;
        if(btn.getItemId() == "btn_GuardarCambios"){
            if(me.isValid() == true){
//                alert("sadsadadsadsadad");
                    Funciones.AjaxRequestForm('Ventas', 'GuardarVentasMN', me, me, me.gridVenta, 'Esta Seguro de Guardar Las Ventas Diarias', {ventas : Funciones.convertirJson(me.gridVenta), EDITAR : me.editar}, null);
            }
            else{
                
                Ext.Msg.alert("Error","Falta Completar el formulario");
            }
        }
        else if(btn.getItemId() == 'btn_CrearCredito'){
            me.CrearVentaCredito();
        }
        else if (btn.getItemId() == "btn_EditarCredito"){
            var datos =  me.gridVentaCredito.getSelectionModel().getSelection()[0];
            if (datos != null){
                me.EditarVentaCredito(datos);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
        }
        else if (btn.getItemId() == "btn_BajaCredito"){
            var datos =  me.gridVentaCredito.getSelectionModel().getSelection()[0];
            if (datos != null){
                 Funciones.AjaxRequestGrid("Ventas", "EliminarVentaCredito", me, "Esta Seguro de Eliminar la Venta de Credito", {ID_VENTA : datos.get('ID_VENTA') }, me.gridVentaCredito,null);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
            
        }
        else if(btn.getItemId() == 'btn_CrearConsumo'){
            me.CrearConsumo();
        }
        else if (btn.getItemId() == "btn_EditarConsumo"){
            var datos =  me.gridVentaConsumo.getSelectionModel().getSelection()[0];
            if (datos != null){
                me.EditarVentaConsumo(datos);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
        }
        else if (btn.getItemId() == "btn_BajaConsumo"){
            var datos =  me.gridVentaConsumo.getSelectionModel().getSelection()[0];
            if (datos != null){
                 Funciones.AjaxRequestGrid("Ventas", "EliminarConsumo", me, "Esta Seguro de Eliminar el Consumo", {ID_CONSUMO : datos.get('ID_CONSUMO') }, me.gridVentaConsumo,null);
            }
            else{
                Ext.Msg.alert("Error","Seleccione una venta para Editar");
            }
            
        }
        else{
            Ext.Msg.alert("Error","No existe la opcion");
        }

    },
    CrearVentaCredito : function(){
        var me = this;
        if(me.isValid()){
            if (me.winVentaCredito == null) {
                    me.winVentaCredito = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta a Credito' });
                    me.formVentaCredito = Ext.create("App.View.Ventas.Forms", {
                        columns: 1,
    //                    title: 'Formulario de Registro de Otros Egresos ',
                        botones: false,
                        opcion : 'formVentaCredito'
                    });

                    me.winVentaCredito.add(me.formVentaCredito);
                    me.winVentaCredito.btn_guardar.on('click', me.GuardarVentaCredito, this);
                    me.winVentaCredito.show();
            } 
            else {
                me.formVentaCredito.getForm().reset();
                me.winVentaCredito.show();
            }
        }
        else{
            Ext.Msg.alert("Error","Seleccione la FECHA , TURNO y Escriba el Responsable");
        }
    },
    CrearConsumo : function(){
        var me = this;
        if(me.isValid()){
            var win =Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Consumo' });
            var formConsumo = Ext.create("App.View.Ventas.Forms", {
                columns: 1,
                botones: false,
                opcion : 'formConsumo'
            });
            win.add(formConsumo);
            win.btn_guardar.on('click', function(){
                Funciones.AjaxRequestWin("Ventas", "GuardarConsumo", win, formConsumo, me.gridVentaConsumo, "Esta Seguro de Guardar el CONSUMO...", { FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}, win);
            });
            win.show();
            }
        else{
            Ext.Msg.alert("Error","Seleccione la FECHA , TURNO y Escriba el RESPONSABLE");
        }
    },
    EditarVentaCredito : function(datos){
        var me = this;
        var win =Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Editar Venta a Credito' });
        var formVentaCredito = Ext.create("App.View.Ventas.Forms", {
            columns: 1,
            botones: false,
            opcion : 'formEditarVentaCredito'
        });
        formVentaCredito.CargarDatos(datos);
        formVentaCredito.EventosFormEditarVentaCredito();
        win.add(formVentaCredito);
        win.btn_guardar.on('click', function(){
            Funciones.AjaxRequestWin("Ventas", "GuardarVentaCredito", win, formVentaCredito, me.gridVentaCredito, "Esta Seguro de Editar el CONSUMO.", /*{ FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}*/null, win);
        });
        win.show();
    },
    EditarVentaConsumo : function(datos){
        var me = this;
        var win =Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Editar Consumo' });
        var formVentaConsumo = Ext.create("App.View.Ventas.Forms", {
            columns: 1,
            botones: false,
            opcion : 'formEditarVentaConsumo'
        });
        formVentaConsumo.CargarDatos(datos);
        formVentaConsumo.EventosFormEditarVentaCredito();
        win.add(formVentaConsumo);
        win.btn_guardar.on('click', function(){
            Funciones.AjaxRequestWin("Ventas", "GuardarConsumo", win, formVentaConsumo, me.gridVentaConsumo, "Esta Seguro de Editar el Consumo", /*{ FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}*/null, win);
        });
        win.show();
    },
    GuardarVentaCredito : function(){
        var me = this;
        Funciones.AjaxRequestWin("Ventas", "GuardarVentaCredito", me.winVentaCredito, me.formVentaCredito, me.gridVentaCredito, "Esta Seguro de Guardar la venta de Credito", { FECHA: me.date_fecha.getValue(), TURNO : me.cbx_turno.getValue(),RESPONSABLE : me.txt_nombres.getValue()}, me.winVentaCredito)
    }
});
