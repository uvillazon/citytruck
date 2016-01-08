using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IListasServices
    {
        DataPaged<SG_LISTAS> ObtenerListas(PagingInfo info ,FiltrosModel<SG_LISTAS> filtros);
        IEnumerable<SG_LISTAS_ITEMS> ObtenerListasItems(PagingInfo paginacion, FiltrosModel<ListasItemsModel> filtros);
        IEnumerable<SG_LISTAS> ObtenerTodasListas();
        DataPaged<SG_LISTAS_ITEMS> ObtenerListasItem(PagingInfo info ,FiltrosModel<SG_LISTAS> filtros);
        RespuestaSP SP_GrabarLista(SG_LISTAS lista);
        RespuestaSP SP_GrabarListaItem(SG_LISTAS_ITEMS listaItems, string login);

    }
}
