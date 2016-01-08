using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CityTruck.Services.Interfaces;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using CityTruck.Business.Interfaces;
using System.Linq.Dynamic;
using LinqKit;
using CityTruck.Business;
using System.Data.Objects;
using System.Linq.Expressions;

namespace CityTruck.Services
{
    public class TransferenciasServices : BaseService, ITransferenciasServices
    {
        //private ISG_LISTASManager _manListas;

        public TransferenciasServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_TRANSFERENCIAS> ObtenerTransferencias(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros)
        {
            IQueryable<SG_TRANSFERENCIAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_TRANSFERENCIASManager(uow);
                //if(criterio == null){
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                //if (filtros.Contiene != null) {
                //    filtros.Contiene = filtros.Contiene.ToUpper();
                //    result = result.Where(x=>x.SG_CAJAS.DESCRIPCION.Contains()
                //}

                //result = manager.BuscarTodos(x=>x.FECHA == filtros.Entidad.FECHA);
                //filtros.FiltrarDatos();
                //result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;


            });
            return result;
        }

        public RespuestaSP SP_GuardarTransferencia(SG_TRANSFERENCIAS transferencia, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_TRANFERENCIA(transferencia.ID_TRANSFERENCIA,transferencia.ID_CAJA_ORIGEN,transferencia.ID_CAJA_DESTINO,transferencia.FECHA,transferencia.CONCEPTO,transferencia.IMPORTE_BS,transferencia.OBSERVACION, ID_USR, p_res);
                try
                {
                    int result_id = Int32.Parse(p_res.Value.ToString());
                    if (result_id > 0)
                    {
                        result.success = true;
                        result.msg = "Proceso Ejecutado Correctamente";
                        result.id = result_id;
                    }
                    else
                    {
                        result.success = false;
                        result.msg = p_res.Value.ToString();
                        result.id = -1;
                    }
                }
                catch (FormatException e)
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                    result.id = -1;
                }

            });
            return result;
        }

        public RespuestaSP SP_EliminarTransferencia(int ID_TRANSFERENCIA, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_TRANSFERNCIA(ID_TRANSFERENCIA, ID_USR, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;
        }


        public SG_TRANSFERENCIAS ObtenerTransferenciasPorCriterio(Expression<Func<SG_TRANSFERENCIAS, bool>> criterio = null)
        {
            SG_TRANSFERENCIAS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_TRANSFERENCIASManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }
    }
}
