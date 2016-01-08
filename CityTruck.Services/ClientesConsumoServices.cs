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

namespace CityTruck.Services
{
    public class ClientesConsumoServices : BaseService, IClientesConsumoServices
    {
        //private ISG_LISTASManager _manListas;

        public ClientesConsumoServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        IEnumerable<SG_CLIENTES_CONSUMO> IClientesConsumoServices.ObtenerClientesPaginado(PagingInfo paginacion)
        {
            IQueryable<SG_CLIENTES_CONSUMO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CLIENTES_CONSUMOManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        IEnumerable<SG_CONSUMOS> IClientesConsumoServices.ObtenerConsumosPaginado(PagingInfo paginacion, FiltrosModel<ConsumoDetalleModel> filtros)
        {
            IQueryable<SG_CONSUMOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CONSUMOSManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GrabarCliente(SG_CLIENTES_CONSUMO cli, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_CLIENTE_CONSUMO(cli.ID_CLIENTE,cli.CODIGO,cli.NOMBRE,cli.RESPONSABLE,ID_USR,p_res);
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


        public RespuestaSP SP_EliminarCliente(int ID_CLIENTE, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_CLIENTE_CONSUMO(ID_CLIENTE, ID_USR, p_res);
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


        public RespuestaSP SP_ActualizarConsumos()
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ACT_CONSUMO( p_res);
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


        public IEnumerable<SG_CLIENTE_CONSUMO_COMBUSTIBLE> ObtenerClientesConsumoPaginado(PagingInfo paginacion)
        {
            IQueryable<SG_CLIENTE_CONSUMO_COMBUSTIBLE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CLIENTE_CONSUMO_COMBUSTIBLEManager(uow);
                result = manager.BuscarTodos();

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public SG_CLIENTES_CONSUMO ObtenerCliente(System.Linq.Expressions.Expression<Func<SG_CLIENTES_CONSUMO, bool>> criterio = null)
        {
            SG_CLIENTES_CONSUMO result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CLIENTES_CONSUMOManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }


        public IEnumerable<SG_CONSUMOS> ObtenerConsumosPorCriterio(System.Linq.Expressions.Expression<Func<SG_CONSUMOS, bool>> criterio = null)
        {
            IQueryable<SG_CONSUMOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CONSUMOSManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }

        public IEnumerable<SG_CONSUMOS> ObtenerConsumoPorMesyAnio(string ANIO, string MES)
        {
            IQueryable<SG_CONSUMOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CONSUMOSManager(uow);
                result = manager.ObtenerConsumosPorMesyAnio(ANIO, MES);

            });
            return result;
        }
    }
}
