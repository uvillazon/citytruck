/**
 * @class Ext.chooser.IconBrowser
 * @extends Ext.view.View
 * @author Ed Spencer
 * 
 * This is a really basic subclass of Ext.view.View. All we're really doing here is providing the template that dataview
 * should use (the tpl property below), and a Store to get the data from. In this case we're loading data from a JSON
 * file over AJAX.
 */
Ext.define('App.View.Postes.ViewPostes', {
    extend: 'Ext.view.View',
    alias: 'widget.iconbrowser',
    uses: 'Ext.data.Store',
    singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    baseCls: 'img-chooser-view',
    height: 400,
    width: 400,
    title: 'Imagenes del PUesto',
    autoScroll: true,
    opcion : '',
    initComponent: function () {
        var me = this;
        var direccion = Constantes.HOST + "Imagenes/VerImagen?";
        me.tpl = [
       // '<div class="details">',
           '<tpl for=".">',
               '<div class="thumb-wrap">',
                   '<div class="thumb">',
                   (!Ext.isIE6 ? '<img src="'+direccion+'id={ID_IMG}&tamano=200" />' :
                   '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + direccion + 'id={ID_IMG}&tamano=200\')"></div>'),
                   '</div>',
                   '<span>{DESCRIPCION}</span>',
               '</div>',
           '</tpl>'
       // '</div>'
        ];
        this.store = Ext.create('Ext.data.Store', {
            //autoLoad: true,
            fields: ['ID_IMG', 'ID_TABLA', 'TABLA', 'DESCRIPCION','NOMBRE_IMG'],
            proxy: {
                type: 'jsonp',
                url: Constantes.HOST + 'Imagenes/ObtenerImagenesPaginado',
                reader: {
                    root: 'Rows',
                    totalProperty: 'Total'
                },
            }
        });
        //this.store.setExtraParams({ TABLA: 'MN_PUESTOS', ID_TABLA: 4 });
        //this.store.load();
        this.callParent(arguments);
        //this.store.sort();
    }
});