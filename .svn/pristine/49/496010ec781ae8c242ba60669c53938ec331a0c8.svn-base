using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using System.Linq.Expressions;

namespace CityTruck.Services.Interfaces
{
    public interface IKardexEfectivoServices
    {
        IEnumerable<SG_KARDEX_EFECTIVO> ObtenerKardexEfectivo(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros);
        IEnumerable<SG_KARDEX_EFECTIVO> ObtenerKardexEfectivo(Expression<Func<SG_KARDEX_EFECTIVO, bool>> criterio);

    }
}
