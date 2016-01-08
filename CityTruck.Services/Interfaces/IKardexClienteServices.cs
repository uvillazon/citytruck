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
    public interface IKardexClienteServices
    {
        IEnumerable<SG_KARDEX_CLIENTE> ObtenerKardexCliente(PagingInfo paginacion, FiltrosModel<KardexClienteModel> filtros, ConsumoAmortizacionModel consumos = null);
        IEnumerable<SG_KARDEX_CLIENTE> ObtenerKardexClientePorCriterio(Expression<Func<SG_KARDEX_CLIENTE, bool>> criterio = null);
      
    }
}
