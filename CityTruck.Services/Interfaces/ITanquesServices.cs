using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;

namespace CityTruck.Services.Interfaces
{
    public interface ITanquesServices
    {
        IEnumerable<SG_TANQUES> ObtenerTanquesPaginado(PagingInfo paginacion);
        decimal? SaldoTanque(int ID_COMBUSTIBLE , DateTime FECHA, int ID_USR);
        RespuestaSP SP_GuardarAjuste(SG_AJUSTES_TANQUE ajus,int ID_COMBUSTIBLE, int ID_USR);
        RespuestaSP SP_GuardarAjusteMN(SG_AJUSTES_TANQUE_MN ajus, int ID_COMBUSTIBLE, int ID_USR);
    }
}
