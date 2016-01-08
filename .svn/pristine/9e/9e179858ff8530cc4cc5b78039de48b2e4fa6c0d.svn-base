Ext.define("App.View.Postes.GridUnidadesConstructivas", {
    extend: "App.Config.Abstract.Grid",
    title: 'Unidades Constructivas Registrados',
    criterios: true,
    textBusqueda: 'UC',
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Postes',
    win: null,
    formulario: null,
    imagenes : true,
    opcion : '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridUnidadesConstructivas") {
            me.CargarComponentesGridUnidades();
        }
        else if (me.opcion == "GridUnidadesContructivasPorPoste") {
            me.CargarComponentesPorPoste();
        }
        else if (me.opcion == "GridUnidadesConstructivasCatalogo") {
            me.CargarComponentesGridUnidadesCatalogo();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarComponentesGridUnidadesCatalogo : function(){
        var me = this;
        me.store = Ext.create("App.Store.Postes.UnidadesConstructivasCatalogo");
        me.CargarComponentes();
        me.columns = [
        { xtype: "rownumberer", width: 45, sortable: false },
        { header: "Img", width: 155, sortable: true, dataIndex: 'ID_UC', renderer: me.renderImagen, disabled: me.imagenes ? true : false, hidden: me.imagenes },
        { header: "Nivel <br>Tensíon", width: 70, sortable: true, dataIndex: 'TENSION' },
        { header: "Codigo<br>Unidad Constructiva", width: 80, sortable: true, dataIndex: 'COD_UC' },
        { header: "Unidad", width: 70, sortable: true, dataIndex: "IDUNIDAD" },
         { header: "Descripcion", width: 150, sortable: true, dataIndex: 'DESCRIPCION' },
        ];
    },
    CargarComponentesGridUnidades: function () {
        var me = this;
        me.store = Ext.create("App.Store.Postes.UnidadesConstructivas");
        me.CargarComponentes();
        me.columns = [
        { xtype: "rownumberer", width: 45, sortable: false },
        //{ header: "Img", width: 155, sortable: true, dataIndex: 'ID_UC', renderer: me.renderImagen, disabled: me.imagenes ? true : false, hidden: me.imagenes },
        { header: "Nivel <br>Tensíon", width: 70, sortable: true, dataIndex: 'TENSION' },
        { header: "Codigo<br>Unidad Constructiva", width: 100, sortable: true, dataIndex: 'COD_UC' },
        { header: "Codigo<br>Poste", width: 100, sortable: true, dataIndex: 'COD_POSTE' },
        { header: "Descripcion", width: 100, sortable: true, dataIndex: 'DESCRIPCION' },
        { header: "Fecha <br>Operacion", width: 100, sortable: true, dataIndex: "FECHA_OPER", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        ];

    },
    CargarComponentesPorPoste: function () {
        var me = this;
        var  sm = new Ext.selection.CheckboxModel();
        me.selModel = sm;
        me.store = Ext.create("App.Store.Postes.UnidadesConstructivas");
        me.CargarComponentes();
        me.columns = [
            { header: "Codigo<br>Unidad Constructiva", width: 100, sortable: true, dataIndex: 'COD_UC' },
            { header: "Codigo<br>Poste", width: 100, sortable: true, dataIndex: 'COD_POSTE' },
            { header: "Fecha <br>Operacion", width: 100, sortable: true, dataIndex: "FECHA_OPER", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
        ];
    },
    renderImagen: function (val, metaData, record) {
        if (record.data.ID_UC == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150&TABLA=MN_UNIDADES_CONS"/>';
        }
    }
});