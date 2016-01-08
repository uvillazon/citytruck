Ext.define('App.Store.Puntos.Puntos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Puntos.Puntos',
    url: 'Ventas/ObtenerManguerasPaginado',
    sortProperty: 'ID_POS',
    sortDirection: 'ASC'
});