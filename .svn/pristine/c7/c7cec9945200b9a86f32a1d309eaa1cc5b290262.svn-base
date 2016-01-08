using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface IKardexCombustibleServices
    {
        IEnumerable<SG_KARDEX_COMBUSTIBLE_MN> ObtenerKardexMNCombustible(string MES , string ANIO);
        RespuestaSP SP_ActualizarKardexMN(DateTime FECHA, int ID_USR);

        IEnumerable<SG_KARDEX_COMBUSTIBLE> ObtenerKardexCombustible(string MES, string ANIO);
        RespuestaSP SP_ActualizarKardex(DateTime FECHA, int ID_USR);
    }
}
