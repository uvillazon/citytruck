Ext.define("App.View.SolicitudesMantenimiento.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridSolicitudesAceptadas") {
            me.title = "Solicitudes Aprobadas";
            me.pieTitulo = "Solicitudes Aprobadas";
            me.CargarComponentesSolicitudesAceptadas();
            me.viewConfig = {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    return Constantes.CargarCssEstados(record.get("ESTADO"), 'SM');
                }
            };
        }
        else if (me.opcion == "GridSolicitudesRechazadas") {
            me.title = "Solicitudes Rechazadas";
            me.pieTitulo = "Solicitudes Rechazadas";
            me.CargarComponentesSolicitudesRechazadas();
            me.viewConfig = {
                getRowClass: function (record, rowIndex, rowParams, store) {
                    return Constantes.CargarCssEstados(record.get("ESTADO"), 'SM');
                }
            };
        }
        else if (me.opcion == "GridCodigoSoluciones") {
            me.title = "Codigos de Solucion";
            me.pieTitulo = "Codigos de Solucion";
            me.CargarComponentesCodigoSoluciones();
        }
        else {
            alert("Defina el tipo primero");
        }
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} de {2}',
            emptyMsg: "No existen " + me.pieTitulo + "."

        });
        this.callParent(arguments);
    },
    CargarComponentesSolicitudesAceptadas: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados");
      
        me.store.setExtraParams({Estados : 'APROBADA'});
        me.store.load();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro SolicitudBRED", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Unidad<br>Reporta", width: 70, sortable: true, dataIndex: "UNIDAD_REPORTA" },
            { header: "Tipo Documento", width: 70, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Cod. Mantenimiento", width: 70, sortable: true, dataIndex: "COD_MAN" },
            { header: "Cod. Defecto", width: 70, sortable: true, dataIndex: "COD_DEF" },
            { header: "Nro<br>Documento", width: 70, sortable: true, dataIndex: "NRO_DOCUMENTO" },
            { header: "Nombre<br>Afectado", width: 100, sortable: true, dataIndex: "NOMBRE_AFECTADO" },
            { header: "Sistema", width: 70, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Ubicacion", width: 100, sortable: true, dataIndex: "UBICACION" },
            { header: "Nus", width: 70, sortable: true, dataIndex: "NUS" },
            { header: "Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Tipo Objeto", width: 70, sortable: true, dataIndex: "TIPO_OBJ" },
            { header: "Nombre quien<br>Reporta", width: 100, sortable: true, dataIndex: "REPORTA_NOMBRE" },
            { header: "Movil que Reporta", width: 70, sortable: true, dataIndex: "REPORTA_MOVIL" },
            { header: "Fecha Problema", width: 70, sortable: true, dataIndex: "FECHA_PROBL", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Problema", width: 70, sortable: true, dataIndex: "HORA_PROBL" },
            { header: "Nro Reclamo", width: 70, sortable: true, dataIndex: "NRO_RECLAMO" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarComponentesSolicitudesRechazadas: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados");
        me.store.setExtraParams({ Estados: 'RECH_INSP' });
        me.store.load();
        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Solicitud", width: 70, sortable: true, dataIndex: "ID_SOL_MAN" },
            { header: "Unidad<br>Reporta", width: 70, sortable: true, dataIndex: "UNIDAD_REPORTA" },
            { header: "Tipo Documento", width: 70, sortable: true, dataIndex: "TIPO_DOCUMENTO" },
            { header: "Nro<br>Documento", width: 70, sortable: true, dataIndex: "NRO_DOCUMENTO" },
            { header: "Nombre<br>Afectado", width: 100, sortable: true, dataIndex: "NOMBRE_AFECTADO" },
            { header: "Sistema", width: 70, sortable: true, dataIndex: "AREA_UBIC" },
            { header: "Ubicacion", width: 100, sortable: true, dataIndex: "UBICACION" },
            { header: "Nus", width: 70, sortable: true, dataIndex: "NUS" },
            { header: "Poste", width: 70, sortable: true, dataIndex: "COD_POSTE" },
            { header: "Tipo Objeto", width: 70, sortable: true, dataIndex: "TIPO_OBJ" },
            { header: "Nombre quien<br>Reporta", width: 100, sortable: true, dataIndex: "REPORTA_NOMBRE" },
            { header: "Movil que Reporta", width: 70, sortable: true, dataIndex: "REPORTA_MOVIL" },
            { header: "Fecha Problema", width: 70, sortable: true, dataIndex: "FECHA_PROBL", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Hora Problema", width: 70, sortable: true, dataIndex: "HORA_PROBL" },
            { header: "Nro Reclamo", width: 70, sortable: true, dataIndex: "NRO_RECLAMO" },
            { header: "Observacion", width: 70, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },

        ];
    },
    CargarComponentesCodigoSoluciones: function () {
        var me = this;
        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.columns = [
           { header: "Codigo<br>Solicitud", width: 120, sortable: true, dataIndex: "COD_SOL" },
           { header: "Descripcion", width: 330, sortable: true, dataIndex: "DESCRIP_SOL" }
        ];

    }

});

