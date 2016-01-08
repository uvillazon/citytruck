/**
 * @class Ext.chooser.InfoPanel
 * @extends Ext.panel.Panel
 * @author Ed Spencer
 * 
 * This panel subclass just displays information about an image. We have a simple template set via the tpl property,
 * and a single function (loadRecord) which updates the contents with information about another image.
 */
Ext.define('App.View.Postes.PanelInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.infopanel',
    width: 250,
    minWidth: 300   ,
    initComponent: function () {
        var me = this;
        var direccion = Constantes.HOST + "Imagen/VerImagen?";
        me.tpl = [
        '<div class="details">',
            '<tpl for=".">',
                    (!Ext.isIE6 ? '<img src="'+direccion+'id={ID_IMG}&tamano=250" />' :
                    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'icons/{thumb}\')"></div>'),
                '<div class="details-info">',
                    '<b>Example Name:</b>',
                    '<span>{NOMBRE_IMG}</span>',
                    '<b>Descripcion:</b>',
                    '<span>{DESCRIPCION}</span>',
                '</div>',
            '</tpl>',
        '</div>'
        ];
        this.callParent(arguments);
        //this.store.sort();
    },
    /**
     * Loads a given image record into the panel. Animates the newly-updated panel in from the left over 250ms.
     */
    loadRecord: function (image) {
        this.body.hide();
        this.tpl.overwrite(this.body, image.data);
        this.body.slideIn('l', {
            duration: 250
        });
    },

    clear: function () {
        this.body.update('');
    }
});