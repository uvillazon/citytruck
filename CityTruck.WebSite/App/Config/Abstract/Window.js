Ext.define("App.Config.Abstract.Window", {
    extend: "Ext.window.Window",
    layout: 'fit',

    modal: true,
    closable: false,
    resizable: true,
    draggable: true,
    constrain: true,
    constrainHeader: true,
    maximizable: true,

    // ✅ Por defecto NO uses porcentaje
    width: null,
    height: null,

    // ✅ Límites para que no quede ni muy chica ni gigante
    minWidth: 520,
    minHeight: 260,
    maxWidth: Constantes.MAXANCHO,
    maxHeight: Constantes.MAXALTO,

    // ✅ Control: cuando quieras grande, lo activas
    usarPorcentaje: false,
    porcentajeW: 0.8,
    porcentajeH: 0.8,

    botones: true,
    mostrarBotonCerrar: false,
    textGuardar: 'Guardar',
    textCerrar: 'Cerrar',
    destruirWin: false,
    gridLoads: null,

    initComponent: function () {
        var me = this;

        me.buildButtons();

        me.listeners = Ext.apply(me.listeners || {}, {
            afterrender: function () {
                // Si quieres que sea grande (80% pantalla), úsalo explícitamente
                if (me.usarPorcentaje) {
                    var vp = Ext.Element.getViewportWidth(),
                        vh = Ext.Element.getViewportHeight();

                    me.setSize(
                        Math.min(me.maxWidth || vp, Math.floor(vp * me.porcentajeW)),
                        Math.min(me.maxHeight || vh, Math.floor(vh * me.porcentajeH))
                    );
                    me.center();
                    return;
                }

                // ✅ Auto-ajustar al contenido (form/panel)
                me.doLayout();

                // Tamaño ideal según contenido
                var w = me.getWidth(),
                    h = me.getHeight();

                // Si quedó muy grande, respeta max
                if (me.maxWidth && w > me.maxWidth) w = me.maxWidth;
                if (me.maxHeight && h > me.maxHeight) h = me.maxHeight;

                // Si quedó muy chico, respeta min
                if (me.minWidth && w < me.minWidth) w = me.minWidth;
                if (me.minHeight && h < me.minHeight) h = me.minHeight;

                me.setSize(w, h);
                me.center();
            }
        });

        this.callParent(arguments);
    },

    buildButtons: function () {
        var me = this;

        if (!me.botones) {
            if (!me.buttons || me.buttons === '') {
                me.buttons = [{
                    xtype: 'button',
                    text: me.textCerrar,
                    iconCls: 'cross',
                    minHeight: 27,
                    minWidth: 80,
                    hidden: me.mostrarBotonCerrar,
                    scope: me,
                    handler: me.CerrarVentana
                }];
            }
            return;
        }

        me.btn_cerrar = Ext.create('Ext.Button', {
            text: me.textCerrar,
            minHeight: 27,
            minWidth: 80,
            iconCls: 'cross',
            hidden: me.mostrarBotonCerrar,
            scope: me,
            handler: me.CerrarVentana
        });

        me.btn_guardar = Ext.create('Ext.Button', {
            text: me.textGuardar,
            minHeight: 27,
            minWidth: 80,
            iconCls: 'disk'
        });

        me.buttons = [me.btn4, me.btn3, me.btn_guardar, me.btn_cerrar];
    },

    CerrarVentana: function () {
        var me = this;
        !me.destruirWin ? me.hide() : me.close();

        if (me.gridLoads) {
            for (var i = 0; i < me.gridLoads.length; i++) {
                me.gridLoads[i].getStore().load();
            }
        }
    }
});
