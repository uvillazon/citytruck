﻿Ext.define('App.Store.Combustibles.Ajustes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Combustibles.Ajustes',
    url: 'Combustibles/ObtenerAjustePos',
    sortProperty: 'ID_POS',
    sortDirection : 'ASC'
});