Ext.define("App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento", {
    extend: "App.Config.Abstract.Grid",
    title: 'Solicitudes de Mantenimiento Registradas',
    //stateId: 'MNGridSolicitudesMantenimiento',
    textBusqueda: 'Solicitud',
    imprimir: false,
    criterios: false,
    equipo: 'Solicitudes de Mantenimiento',
    opcion: '',
    paramsStore : null,
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.store = Ext.create("App.Store.SolicitudesMantenimiento.SolicitudesMantenimiento");
        }
        else {
            me.store = Ext.create("App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados");
        }
        
        me.CargarComponentes();
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"),'SM');
            }
        };
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Unidad<br>Solicitante", width: 70, sortable: true, dataIndex: "UNIDAD_SOLICITANTE" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Tipo Documento", width: 70, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Nro<br>Documento", width: 70, sortable: true, dataIndex: "NRO_DOCUMENTO" },
            { header: "Nus", width: 70, sortable: true, dataIndex: "NUS" },
            { header: "Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Puesto", width: 70, sortable: true, dataIndex: "COD_PUESTO" },
            { header: "Derivacion <br>Inicial", width: 70, sortable: true, dataIndex: "COD_ELEMENTO_1" },
            { header: "Derivacion <br>Final", width: 70, sortable: true, dataIndex: "COD_ELEMENTO_2" },
         //   { header: "Subestacion", width: 70, sortable: true, dataIndex: "NOM_SUBEST" },
            { header: "Sistema", width: 70, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Ubicacion", width: 100, sortable: true, dataIndex: "UBICACION" },
            { header: "Nombre<br>Afectado", width: 100, sortable: true, dataIndex: "NOMBRE_AFECTADO" },
            { header: "Nombre quien<br>Reporta", width: 100, sortable: true, dataIndex: "REPORTA_NOMBRE" },
            { header: "Movil que Reporta", width: 70, sortable: true, dataIndex: "REPORTA_MOVIL" },
            { header: "Fecha Problema", width: 70, sortable: true, dataIndex: "FECHA_PROBL", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Problema", width: 70, sortable: true, dataIndex: "HORA_PROBL" },
            

        ];
        
        this.callParent(arguments);
        
    },
    Criterios: function () {
        var me = this;
        var formulario1 = Ext.create('App.View.SolicitudesMantenimiento.VentanaCriterios', { title: " Criterios de Busqueda", botones: true, textGuardar: 'Buscar', storeBuscar: me.store, gridBuscar: me, tmp: me.bar });

        formulario1.show();
    },
});

