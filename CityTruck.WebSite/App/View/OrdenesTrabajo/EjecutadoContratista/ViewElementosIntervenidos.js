Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.ViewElementosIntervenidos', {
extend: 'Ext.view.View',
xtype: 'viewelementosintervenidos',
store: 'OrdenesTrabajo.ElementosIntervenidosContratista',
itemId: 'velementosintervenidos',
emptyText: 'Ningun poste registrado',

singleSelect: true,
overItemCls: 'x-item-over',
itemSelector: 'div.thumb-wrap',
//trackOver: true,
tpl: [
    '<tpl for =".">',
            '<div class="thumb-wrap">',
            '<div class="thumb">',
                '<img src="content/images/{IMG}"  height="90" width="60">',
            '</div>',					
            '<b>{COD_POSTE}{COD_CONDUCTOR}</b></br>',
            '<spam>{DESC_TIPO}</spam>',
        '</div>',
    '</tpl>'].join('')
});