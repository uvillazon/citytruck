Ext.define("App.View.OrdenesTrabajo.VentanaCriterios", {
    // extend: "App.Config.Abstract.Form",
    extend: "App.Config.Abstract.Window",
    title: "Criterios de Busqueda",
    bodyStyle: 'background-color:#fff',
    layout: {
        type: 'table',
        columns: 2,
    },
    width: 520,
    height: 220,
    resizable: false,
    opcion: '',
    storeBuscar: '',
    gridBuscar: '',
    data: '',
    tmp: '',
    initComponent: function () {
        var me = this;
        me.CargarStore();
        me.CargarComponentes();
        this.callParent(arguments);
        me.btn_guardar.on('click', me.Buscar, this);
    },
    CargarStore: function () {
        var me = this;
        //store de tipo OT
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
    //    me.store_tipo.setExtraParam('condicion', 'TIPO_OT');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar("TIPO_OT"));
        //store responsables
        me.store_responsables = Ext.create('App.Store.Responsables.Responsables', { autoLoad: true });
        me.store_responsables.setExtraParam("Opcional", "Movil");
        me.store_responsables.proxy.extraParams['Columna'] = 'INSPECCIONA';
        me.store_responsables.proxy.extraParams['Valor'] = 'T';
        //store para estados de solicitudes
        me.store_estados = Ext.create('App.Store.Listas.Estados', { autoLoad: true });
        /*me.store_estados.proxy.extraParams['condicion'] = 'OT';
        me.store_estados.proxy.extraParams['codigo'] = 'ESTADO';*/
        me.store_estados.setExtraParam('COD_OBJ', 'OT');
    },
    CargarComponentes: function () {
        var me = this;

        me.txt_numeroSolicitud = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Solicitud",
            name: "ID_SOL_MAN",
            margin: '5',
        });
        me.txt_numeroOT = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro OT",
            name: "ID_OT",
            margin: '5',
        });

        me.date_fechaInicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Alta Inicial',
            margin: '5',
            name: 'FECHA_INICIAL',
            opcion: 'blanco',
        });

        me.date_fechaFinal = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Alta Final',
            name: 'FECHA_FINAL',
            margin: '5',
            opcion: 'blanco',
        });
        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            displayField: 'VALOR',
            margin: '5',
            name: 'ESTADO',
            colspan: 2,
            //el store debe venir de la lista de estados de ordenes de trabajo
            store: me.store_estados
        });
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo OT",
            name: "TIPO_OT",
            displayField: 'VALOR',
            store: me.store_tipo,
            margin: '5'
        });
        me.txt_asignado = Ext.create("App.Config.Componente.TextFieldBase", {
            name: 'ASIGNADO_A1',
            hidden: true,
        });
        
        me.cbx_asignadoA = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Asignado a",
            name: "ASIGNADO_A",
            displayField: 'NOMBRECOMPLETO',
            valueField: 'NOMBRECOMPLETO',
            maxLength: 50,
            textoTpl: function () { return "{NOMBRECOMPLETO} - {UNIDAD}" },
            store: me.store_responsables,
            margin: '5'
        });
        me.cbx_asignadoA.on('select', function (cmb, record) {
            me.txt_asignado.setValue(record[0].get('ID_RESP'));
        });
        me.items = [
            me.txt_asignado,
            me.txt_numeroSolicitud,
            me.txt_numeroOT,
            me.cbx_tipo,
            me.cbx_asignadoA,
            me.date_fechaInicial,
            me.date_fechaFinal,
            me.cbx_estado
        ];
    },
    Buscar: function () {
        var me = this;
        me.storeBuscar.limpiarParametros();
        me.storeBuscar.setExtraParam('ID_SOL_MAN', me.txt_numeroSolicitud.getValue());
        me.storeBuscar.setExtraParam('ID_OT', me.txt_numeroOT.getValue());
        me.storeBuscar.setExtraParam('TIPO_OT', me.cbx_tipo.getValue());
        me.storeBuscar.setExtraParam('ASIGNADO_A', me.txt_asignado.getValue());
        me.storeBuscar.setExtraParamDate('FECHA_INICIAL', me.date_fechaInicial.getValue());
        me.storeBuscar.setExtraParam('ESTADO', me.cbx_estado.getValue());


        if (me.date_fechaFinal.getValue() != null) {
            me.storeBuscar.setExtraParamDate('FECHA_FINAL', Ext.Date.add(me.date_fechaFinal.getValue(), Ext.Date.DAY, 1));
        }
        else {
            me.storeBuscar.setExtraParamDate('FECHA_FINAL', me.date_fechaFinal.getValue());
        }
        me.tmp.moveFirst();

        var asignadoA; var tipoOT; var f_altaIniValor; var f_altaFinValor; var estadoValor; var idPendiente; var idOT;

        if (me.txt_numeroSolicitud.getValue() != null && me.txt_numeroSolicitud.getValue() != '') {
            idPendiente = me.txt_numeroSolicitud.getValue();
        }
        else {
            idPendiente = 'Todos';
        }
        if (me.txt_numeroOT.getValue() != null && me.txt_numeroOT.getValue() != '') {
            idOT = me.txt_numeroOT.getValue();
        }
        else {
            idOT = 'Todos';
        }
        if (me.cbx_asignadoA.getValue() != null && me.cbx_asignadoA.getValue() != '') {
            asignadoA = me.cbx_asignadoA.getValue();
        }
        else {
            asignadoA = 'Todos';
        }
        if (me.cbx_tipo.getValue() != null && me.cbx_tipo.getValue() != '') {
            tipoOT = me.cbx_tipo.getValue();
        }
        else {
            tipoOT = 'Todos';
        }
        if (me.date_fechaInicial.getValue() != null && me.date_fechaInicial.getValue() != '') {
            //*******************************
            var myDate = new Date(me.date_fechaInicial.getValue());
            var myFecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
          //  alert(myFecha);
            //*******************************
            f_altaIniValor = myFecha;
        }
        else {
            f_altaIniValor = 'Todos';
        }
        if (me.date_fechaFinal.getValue() != null && me.date_fechaFinal.getValue() != '') {
            //*******************************
            var myDate = new Date(me.date_fechaFinal.getValue());
            var myFecha = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
            //*******************************
            f_altaFinValor = myFecha;
        }
        else {
            f_altaFinValor = 'Todos';
        }
        if (me.cbx_estado.getValue() != null && me.cbx_estado.getValue() != '') {
            estadoValor = me.cbx_estado.getValue();
        }
        else {
            estadoValor = 'Todos';
        }

        me.gridBuscar.tituloImpresion = '<H2 align="center">ORDENES DE TRABAJO POR FILTRO</H2><TABLE border="1" align="center"  cellspacing="0" cellpadding="0" bordercolor="black"  STYLE="font-size: 11px;"><TR align="center"><TD><B>Id Solicitud</B></TD><TD><B>Id Orden Trabajo</B></TD> <TD><B>tipo</B></TD> <TD><B>Asignado</B></TD><TD><B>Fecha Alta Inicial</B></TD><TD><B>Fecha Alta Final</B></TD><TD><B>Estado</B></TD> </TR><TR align="center"><TD>' + idPendiente + '</TD><TD>' + idOT + '</TD> <TD>' + tipoOT + '</TD> <TD>' + asignadoA + '</TD><TD>' + f_altaIniValor + '</TD> <TD>' + f_altaFinValor + '</TD> <TD>' + estadoValor + '</TD></TR></TABLE>';
        me.gridBuscar.getStore().loadData(me.storeBuscar);
        me.hide();
    },
});
