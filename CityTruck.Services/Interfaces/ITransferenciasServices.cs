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
    public interface ITransferenciasServices
    {
        IEnumerable<SG_TRANSFERENCIAS> ObtenerTransferencias(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros);
        SG_TRANSFERENCIAS ObtenerTransferenciasPorCriterio(Expression<Func<SG_TRANSFERENCIAS, bool>> criterio = null);
        RespuestaSP SP_GuardarTransferencia(SG_TRANSFERENCIAS transferencia,int ID_USR);
        RespuestaSP SP_EliminarTransferencia(int ID_TRANSFERENCIA, int ID_USR);
     
    }
}
