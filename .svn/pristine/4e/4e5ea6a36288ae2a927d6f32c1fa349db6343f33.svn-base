Ext.define("App.View.VentasMN.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    title : '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridVentasEditar") {
            me.title = me.title == '' ? "Registros" : me.title;
            me.pieTitulo = "Registros";
            me.CargarGridVentasEditar();
        }
        else {
            alert("Defina el tipo primero");
        }
        
        this.callParent(arguments);
    },
    CargarGridVentasEditar : function(){
        var me = this;
        me.store = Ext.create("App.Store.Ventas.DetallesVentaMN");
        
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.columns = [
           { header: "Producto", width: 150, sortable: true, dataIndex: "PRODUCTO" },
           { header: "Entrada Lts.", width: 80, sortable: false, dataIndex: "ENT_LITTER" },
           { header: "Salida Lts.", width: 80, sortable: false, dataIndex: "SAL_LITTER" ,editor: {
                    xtype: 'numberfield',
                    
                } 
           },
           { header: "Total", width: 80, sortable: false, dataIndex: "TOTAL" }
        ];

    }
});

