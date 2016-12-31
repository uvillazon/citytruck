Ext.define("App.View.Postes.GridPostes", {
    extend: "App.Config.Abstract.Grid",
    title: 'Postes Registrados',
    criterios: true,
    textBusqueda: 'Postes',
    imprimir: true,
    width: 550, 
    height: 350,
    equipo: 'Postes',
    win: null,
    formulario: null,
    imagenes: true,
    check: false,
    opcion:'',
    initComponent: function () {
        var me = this;
        if (me.opcion=='') {
            me.store = Ext.create("App.Store.Postes.Postes");
        }
        else if ( me.opcion=='PostesPuesto') {
            me.store = Ext.create("App.Store.Puestos.PostesPorPuesto");
            me.cargarStore = false;
        }
       
        me.CargarComponentes();
        if (me.check) {
            sm = new Ext.selection.CheckboxModel({
                showHeaderCheckbox: false,
                checkOnly: true,
                headerWidth: 40,
            });
            me.selModel = sm;
        }
        if (me.opcion == 'PostesPuesto') {
            me.columns = [
           { xtype: "rownumberer", width: 45, sortable: false, hidden: me.check },
           { header: "Codigo<br>Poste", width: 90, sortable: true, dataIndex: 'COD_POSTE' }
            ];
        } else {
            me.columns = [
            { xtype: "rownumberer", width: 45, sortable: false, hidden: me.check },
            { header: "Img", width: 155, sortable: true, dataIndex: 'ID_POSTE', renderer: me.renderImagen, disabled: me.imagenes ? true : false, hidden: me.imagenes },
            { header: "Codigo<br>Poste", width: 90, sortable: true, dataIndex: 'COD_POSTE' },
            { header: "Sistema", width: 90, sortable: true, dataIndex: 'AREA_UBIC' },
            { header: "Ubicacion", width: 90, sortable: true, dataIndex: 'UBICACION' },
            { header: "Codigo<br>Tipo", width: 90, sortable: true, dataIndex: 'COD_TIPO' },
            { header: "Descrp. Tipo", width: 90, sortable: true, dataIndex: 'DESC_TIPO' },
            { header: 'Fecha<br>Operacion', dataIndex: 'FECHA_OPER', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') }
            ];
        }
        //me.on('celldblclick', me.DevolverDatosPoste, this);
        this.callParent(arguments);
    },
    DevolverDatosPoste: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        if (me.win != null) {
            me.win.hide();
            me.record = record;
            me.formulario.CargarPoste(record);
        } else {

        }
    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.ID_POSTE == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150&TABLA=MN_POSTES"/>';
        }
    }
});