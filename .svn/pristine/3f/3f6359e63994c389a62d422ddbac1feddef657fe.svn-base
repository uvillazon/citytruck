Ext.define("App.Config.Componente.NumberFieldBase", {
    extend: "Ext.form.NumberField",
    alias: 'widget.NumberFieldBase',
    decimalPrecision: 2,
    emptyText:'Introduzca...',
    decimalSeparator : '.',
    maxValue: 999999,
    maxLength: 6,
    enforceMaxLength: true,
    minValue: 0,
    margin: '1',
    allowNegative: false,
    allowDecimals: false,
    disabledCls: 'DisabledClase',
    readOnlyCls: 'DisabledClaseReadOnly',
    width: 240,
    labelWidth: 110,
    selectOnFocus: true,
    mensaje: '',
    titulo: '',
    initComponent: function () {
        var me = this;
        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }

        me.callParent(arguments);
    }
});
