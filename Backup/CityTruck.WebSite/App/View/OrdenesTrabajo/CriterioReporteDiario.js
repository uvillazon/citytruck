Ext.define("App.View.OrdenesTrabajo.CriterioReporteDiario", {
    // extend: "App.Config.Abstract.Form",
    extend: "App.Config.Abstract.Window",
    title: "Criterios de Busqueda",
    bodyStyle: 'background-color:#fff',
    layout: {
        type: 'table',
        columns: 2,
    },
    width: 520,
    height: 150,
    resizable: false,
    opcion: '',
    storeBuscar: '',
    gridBuscar: '',
    data: '',
    tmp: '',
    botones: true,
    textGuardar: 'Generar',
    initComponent: function () {
        var me = this;
        me.CargarStore();
        me.CargarComponentes();
        this.callParent(arguments);
        me.btn_guardar.on('click', me.Buscar, this);
    },
    CargarStore: function () {
        
        var me = this;
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables', { autoLoad: true });
        me.store_responsables.setExtraParam("Opcional", "Movil");
        me.store_responsables.proxy.extraParams['Columna'] = 'EJECUTA';
        me.store_responsables.proxy.extraParams['Valor'] = 'T';
    },
    CargarComponentes: function () {
        var me = this;

        me.date_fechaInicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Inicial',
            margin: '5',
            name: 'FECHA_INICIAL',
            opcion: 'blanco',
        });

        me.date_fechaFinal = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Final',
            name: 'FECHA_FINAL',
            margin: '5',
            opcion: 'blanco',
        });
        me.txt_ejecutor = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ASIGNADO_A1',
            hidden: true,
        });
        
        me.cbx_ejecutor = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Ejecutor",
            name: "ASIGNADO_A",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'NOMBRECOMPLETO',
            maxLength: 50,
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
            margin: '5'
        });
        me.cbx_ejecutor.on('select', function (cmb, record) {
            me.txt_ejecutor.setValue(record[0].get('ID_RESP'));
        });
        me.items = [
            me.date_fechaInicial,
            me.date_fechaFinal,
            me.txt_ejecutor,
            me.cbx_ejecutor,
        ];
    },
    Buscar: function () {
        var me = this;
        //   me.storeBuscar.limpiarParametros();
        if (me.txt_ejecutor.getValue() == '' && (me.date_fechaInicial.getValue() == null && me.date_fechaFinal.getValue() == null)) {
            Ext.MessageBox.alert('Error', "Debe seleccionar Fecha o Ejecutor.");
        }else {
           
            var ejecutor; var f_altaIniValor; var f_altaFinValor;

            if (me.cbx_ejecutor.getValue() != null && me.cbx_ejecutor.getValue() != '') {
                ejecutor = me.cbx_ejecutor.getValue();
            }

            if (me.date_fechaInicial.getValue() != null && me.date_fechaInicial.getValue() != '') {
                var myDate = new Date(me.date_fechaInicial.getValue());
                var myFecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
                f_altaIniValor = myFecha;
            }

            if (me.date_fechaFinal.getValue() != null && me.date_fechaFinal.getValue() != '') {
                var myDate = new Date(me.date_fechaFinal.getValue());
                var myFecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
                f_altaFinValor = myFecha;
            }

            alert(me.txt_ejecutor.getValue() + '->' + ejecutor);
            alert(f_altaIniValor + '-' + f_altaFinValor);


            //**************************************
           /* var modified = me.gridOT.getSelectionModel().getSelection();
            if (!Ext.isEmpty(modified)) {
                var recordsToSend = [];
                Ext.each(modified, function (record) {
                    recordsToSend.push(Ext.apply({ ID: record.data.ID_OT }));
                });
                recordsToSend = Ext.JSON.encode(recordsToSend);
                window.open(Constantes.HOST + 'Reportes/ReporteOT?OTS=' + recordsToSend);*/
            //**************************************
            /*var datosOT = me.grid.getSelectionModel().getSelection()[0];

            if (datosOT != null && datosOT.get('CON_PLANILLA') == true) {
                window.open(Constantes.HOST + 'Reportes/ReportePlanillaInspeccion?ID_PLA=' + datosOT.get('ID_PLA'));
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una OT que tenga PLANILLA.");
            }*/
            //**************************************
        }
        me.hide();
    },
});
