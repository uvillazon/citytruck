Ext.define("App.View.OrdenesOperacion.GridOrdenOperacion", {
    extend: "App.Config.Abstract.Grid",
    title: 'Ordenes de Operacion Registrados',
    itemId: 'gridooprincipal',
    textBusqueda: 'OO',
    imprimir: false,
    criterios: false,
    tamBusqueda: 20,
    equipo: 'Ordenes de Operacion',
    opcion: '',
    ckeck: false,
 //   imagenPlanilla: true,
    storeResponsable : false,
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.title = "Orden de operacion";
            me.pieTitulo = "Orden de operacion";
            me.CargarComponentesGeneral();
        }
            /*me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Desplegando {0} - {1} de {2}',
                emptyMsg: "No existen " + me.pieTitulo + "."

            });*/
      /*  else if (me.opcion == 'GridOTSeleccionadas') {
            me.CargarComponentesOTSeleccionadas();
        }
        else if (me.opcion == 'GridOTElegidas') {
            me.CargarComponentesOTElegidas();
        }*/

        else {
            alert("Defina el tipo primero");
        }

        this.callParent(arguments);
    },
    CargarComponentesGeneral: function () {
        var me = this;
        if (me.storeResponsable) {
            me.store = Ext.create("App.Store.OrdenesOperacion.OrdenesOperacion");
        }
        else {
            me.store = Ext.create("App.Store.OrdenesOperacion.OrdenesOperacion");
        }
        
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            //{ header: "Pla<br>nilla", width: 40, sortable: false, dataIndex: 'ESTADO_PLA', renderer: me.renderImagenPlanilla, disabled: me.imagenPlanilla ? true : false, hidden: me.imagenPlanilla },
            { header: "Nro OO", width: 70, sortable: true, dataIndex: "NRO_OO" },
            { header: "Operacion", width: 70, sortable: true, dataIndex: "OPERACION" },
            { header: "Tipo Faena", width: 70, sortable: true, dataIndex: "TIPO_FAENA" },
            { header: "Solicitado Por", width: 70, sortable: true, dataIndex: "SOLICITADO_POR" },
            { header: "Instalaciones<br>Intervenidas", width: 70, sortable: true, dataIndex: "INSTAL_INTERV" },
            { header: "Fecha Inicio", width: 70, sortable: true, dataIndex: "FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Inicio", width: 120, sortable: true, dataIndex: "HORA_INI" },
            { header: "Fecha Final", width: 70, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Final", width: 70, sortable: true, dataIndex: "HORA_FIN" },
            { header: "Medio Comunicacion", width: 70, sortable: true, dataIndex: "MEDIO_COMUNIC" },
            { header: "Trabajo a Realizar", width: 100, sortable: true, dataIndex: "TRABAJO_REALIZAR" },
            { header: "Jefe de Faena", width: 100, sortable: true, dataIndex: "NOMBRE_JEFEFAENA" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
        ];
    },
    Criterios: function () {
        var me = this;
        var formulario1 = Ext.create('App.View.OrdenesTrabajo.VentanaCriterios', { title: " Criterios de Busqueda", botones: true, textGuardar: 'Buscar', storeBuscar: me.store, gridBuscar: me, tmp: me.bar });

        formulario1.show();
    },

});

