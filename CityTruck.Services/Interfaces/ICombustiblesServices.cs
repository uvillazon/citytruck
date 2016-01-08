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
    public interface ICombustiblesServices
    {
        IEnumerable<SG_COMBUSTIBLES> ObtenerCombustiblesPaginado(PagingInfo paginacion);

        IEnumerable<SG_AJUSTES_TANQUE> ObtenerAjustesPorAnioYMes(string ANIO, string MES);

        IEnumerable<SG_AJUSTES_TANQUE> ObtenerAjustesPaginados(PagingInfo paginacion, Expression<Func<SG_AJUSTES_TANQUE, bool>> criterio = null);


        CombustiblesModel ObtenerCombustible(Expression<Func<SG_COMBUSTIBLES, bool>> criterio = null);


        SG_AJUSTES_TANQUE ObtenerAjusteTanque(Expression<Func<SG_AJUSTES_TANQUE, bool>> criterio = null);
        SG_AJUSTES_TANQUE_MN ObtenerAjusteTanqueMN(Expression<Func<SG_AJUSTES_TANQUE_MN, bool>> criterio = null);
        //RespuestaSP SP_GrabarIngreso(SG_CAJAS caja);

    }
}
