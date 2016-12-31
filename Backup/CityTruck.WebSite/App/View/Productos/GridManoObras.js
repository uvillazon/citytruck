Ext.define("App.View.Postes.GridMateriales", {
    extend: "App.Config.Abstract.Grid",
    title: 'Materiales Registrados',
    criterios: true,
    textBusqueda: 'Cod Material',
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Materiales',
    win: null,
    formulario: null,
    imagenes: true,
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridMateriales") {
            me.CargarComponentesGridMateriales();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarComponentesGridMateriales: function () {
        var me = this;
        me.store = Ext.create("App.Store.Postes.Materiales");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Img", width: 155, sortable: true, dataIndex: 'IDPRODUCTO', renderer: me.renderImagen, disabled: me.imagenes ? true : false, hidden: me.imagenes },
            { header: "Codigo<br>Material", width: 70, sortable: true, dataIndex: "COD_ALTERNATIVO" },
            { header: "Descripcion", width:150, sortable: true, dataIndex: "DESCRIPCION" },
            { header: "Unidad", width: 70, sortable: true, dataIndex: "IDUNIDAD" },
            { header: "Estado AF", width: 70, sortable: true, dataIndex: "IDTIPO_ACTIV_AF" },
        ];

    },
    renderImagen: function (val, metaData, record) {
        //  alert(record.data.ID)
        if (record.data.IDPRODUCTO == 0) {
            return '<img src="../Content/Iconos/no-imagen.jpg" />';
        }
        else {
            return '<img src="' + Constantes.URLIMAGEN + 'id=' + val + '&tamano=150&TABLA=V_MN_MATERIALES"/>';
        }
    }
});