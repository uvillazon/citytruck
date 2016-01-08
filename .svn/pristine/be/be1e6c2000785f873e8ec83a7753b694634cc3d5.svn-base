Ext.define('App.view.OrdenesTrabajo.ViewOrdenesTrabajo', {
    extend: 'Ext.view.View',
    xtype: 'viewordenestrabajo',
    itemId: 'vordenestrabajo',
    emptyText: 'Ninguna Orden de Trabajo para esta Solicitud',
    singleSelect: true,
    overItemCls: 'x-item-over',
    itemSelector: 'div.thumb-wrap2',
    tpl: [
        '<tpl for =".">',
                '<div class="thumb-wrap2">',
                '<div class="thumb">',
                    '<img src="content/images/ot.png"  height="120" width="80">',
                '</div>',
                '<font color="0066FF" size= 5.5em"> {ID_OT}</font></br>',
                '<b>Fuente:</b> {COD_FUENTE}</br>',
                '<b>Lugar:</b><font size= 1.5em"> {LUGAR_TRABAJO}</font></br>',
                '<b>{COD_MAN}:</b><font size= 1.5em"> {DESCRIP_MAN}</font></br>',
                '<b>Asignado:</b><font size= 1.5em"> {NOMBRE_ASIGNADO}</font></br>',
            '</div>',
        '</tpl>'].join(''),
    listeners: {
        itemclick: function(view, record, item, index, event, options){
            win = this.up('window')
            Ext.Msg.confirm('Confirmar', 'Se creara una OT de Proyecto a partir de la OT de Inspeccion ' + record.get('ID_OT'), function (button) {
                if (button == 'yes') {
                    Ext.Ajax.request({
                        type: 'ajax',
                        url: Constantes.HOST + 'OrdenesTrabajo/GuardarOrdenesTrabajo',
                        params: {
                            ID_SOL_MAN: record.get('ID_SOL_MAN'),
                            OT_ORIGEN: record.get('ID_OT'),
                            TIPO_OT: 'PROYECTO',
                            LUGAR_TRABAJO: record.get('LUGAR_TRABAJO'),
                            ESTADO: 'NUEVA',
                            INSTRUCCIONES: record.get('INSTRUCCIONES'),
                            ID_FUENTE: record.get('ID_FUENTE'),
                            TIPO_FUENTE: record.get('TIPO_FUENTE'),
                            TIPO_OBJ_INTERV: record.get('TIPO_OBJ_INTERV'),
                            ID_OBJ_INTERV: record.get('ID_OBJ_INTERV'),
                            COD_OBJ_INTERV: record.get('COD_OBJ_INTERV'),
                            ID_OBJ_INTERV2: record.get('ID_OBJ_INTERV2'),
                            COD_OBJ_INTERV2: record.get('COD_OBJ_INTERV2'),
                            ID_OBJETO: record.get('ID_OBJ_INTERV'),
                            OT_EXTRA: 'F'
                        },
                        success: function (response, options) {
                            var data = Ext.decode(response.responseText);
                            if (data.success) {
                                Ext.Msg.show({
                                    title: 'Felicidades!',
                                    msg: data.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });
                            } else {
                                Ext.Msg.show({
                                    title: 'Advertencia',
                                    msg: data.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.WARNING
                                });
                            }
                        }
                    })
                    win.close();
                    ventana = Ext.ComponentQuery.query('window')[2]; /*Capturo la ventana de WinCrearOT*/
                    ventana.hide();
                }
            })
        }
    }
});