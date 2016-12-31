Ext.define("App.View.Puestos.GridPuestos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Poste/Puesto Registrados',
    criterios: true,
    textBusqueda: 'Codigo Puesto',
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Puestos',
    win: null,
    formulario: null,
    opcion: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == '') {
            me.store = Ext.create("App.Store.Puestos.Puestos");
            me.columns = [
                { xtype: "rownumberer", width: 45, sortable: false },
                { header: "Codigo", width: 90, sortable: true, dataIndex: 'COD_PUESTO' },
                { header: "Tipo Elemento", width: 90, sortable: true, dataIndex: 'ELEMENTO' },
                { header: "Ubicacion", width: 90, sortable: true, dataIndex: 'UBICACION' },
                { header: "Sistema", width: 90, sortable: true, dataIndex: 'AREA_UBIC' },
                { header: "Derivacion", width: 90, sortable: true, dataIndex: 'COD_ELEMENTO' },
                { header: "Alimentador", width: 90, sortable: true, dataIndex: 'COD_ALIMENTADOR' },

            ];
        }
        else if (me.opcion == 'Derivaciones') {
            me.textBusqueda = "Derivaciones";
            me.equipo = "Derivaciones";
            me.store = Ext.create("App.Store.Puestos.Derivaciones");
            me.columns = [
                { xtype: "rownumberer", width: 45, sortable: false },
                { header: "Codigo", width: 90, sortable: true, dataIndex: 'COD_ELEMENTO' },
                { header: "Tipo Elemento", width: 90, sortable: true, dataIndex: 'ELEMENTO' },
                { header: "Ubicacion", width: 90, sortable: true, dataIndex: 'UBICACION' },
                { header: "Sistema", width: 90, sortable: true, dataIndex: 'AREA_UBIC' },
                { header: "Derivacion", width: 90, sortable: true, dataIndex: 'DERIVACION' },
                { header: "Alimentador", width: 90, sortable: true, dataIndex: 'COD_ALIMENTADOR' },
            ];
        }
        me.CargarComponentes();
        //me.on('celldblclick', me.DevolverDatos, this);
        this.callParent(arguments);
    },
    DevolverDatos: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (me.win != null) {
            me.win.hide();
            me.record = record;
            me.formulario.CargarPuesto(record);
        } else {

        }
    }
});