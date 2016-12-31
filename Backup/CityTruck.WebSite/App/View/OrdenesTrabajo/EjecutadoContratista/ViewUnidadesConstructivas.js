/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 14
Elaborado: P. Sergio Alvarado G.
*/
Ext.define('App.view.OrdenesTrabajo.EjecutadoContratista.ViewUnidadesConstructivas', {
    extend: 'Ext.view.View',
    alias: 'widget.viewunidadesconstructivas',
    store: 'OrdenesTrabajo.UnidadesConstructivasIntervenidasContratista',
    itemId: 'vunidadesconstructivas',

    singleSelect: true,
    overItemCls: 'x-item-over',
    //itemSelector: 'div.thumb-wrap',
    itemSelector: 'div.unidadconstructiva',

    style: {
        backgroundColor: 'white'
    },
    emptyText: 'Ninguna Unidad Constructiva',
    tpl: [
          '<tpl for =".">',
              '<div class="unidadconstructiva">',
                  '<div class="content">',
                      '<img src="content/images/cruceta.jpg"  height="70" width="70">',
                  '</div>',
                  '<b>{COD_UC}</b></br>',
                  '<spam>{DESC_CORTA}</spam></br>',
                  '<spam>Tension: {TENSION}</spam></br>',
                  '<img src=' + Constantes.HOST + 'Content/images/{IMG_MATERIALES}  height="22" width="30">',
                  '<img src=' + Constantes.HOST + 'Content/images/{IMG_MANO_OBRA} height="20" width="20">',
              '</div>',
          '</tpl>'].join(''),
});

