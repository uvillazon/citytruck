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
    public class ListasServices : BaseService, IListasServices
    {
        //private ISG_LISTASManager _manListas;

        public ListasServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public ListasServices(string conexion) {
            this.conexion = conexion;
        }
        public DataPaged<SG_LISTAS> ObtenerListas(PagingInfo paginacion, FiltrosModel<SG_LISTAS> filtros)
        {
            DataPaged<SG_LISTAS> resultado = new DataPaged<SG_LISTAS>();
            IQueryable<SG_LISTAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_LISTASManager(uow);
                result = manager.QueryPaged(manager.Query(), paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                resultado.Rows = result.ToList();
                resultado.Total = manager.Query().Count();
                resultado.success = true;

            });

            return resultado;
        }

        public DataPaged<SG_LISTAS_ITEMS> ObtenerListasItem(PagingInfo info, FiltrosModel<SG_LISTAS> filtros)
        {
            throw new NotImplementedException();
        }


        public RespuestaSP SP_GrabarLista(SG_LISTAS lista)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ALTA_LISTA(lista.LISTA, lista.DESCRIPCION, lista.TAM_LIMITE, lista.TIPO_VALOR, lista.MAYUS_MINUS, 0, p_res);
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

        public RespuestaSP SP_GrabarListaItem(SG_LISTAS_ITEMS listaItems, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GRABAR_LISTAS_ITEMS(listaItems.ID_TABLA, listaItems.ID_PADRE, listaItems.ID_LISTA, listaItems.CODIGO, listaItems.VALOR, listaItems.ESTADO, login, p_res);
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


        public IEnumerable<SG_LISTAS_ITEMS> ObtenerListasItems(PagingInfo paginacion, FiltrosModel<ListasItemsModel> filtros)
        {
            IQueryable<SG_LISTAS_ITEMS> result = null;
            ExecuteManager(uow =>
            {
                var managerVentas = new SG_LISTAS_ITEMSManager(uow);
                result = managerVentas.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = managerVentas.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public IEnumerable<SG_LISTAS> ObtenerTodasListas()
        {
            IQueryable<SG_LISTAS> result = null;
            ExecuteManager(uow =>
            {
                var managerLista = new SG_LISTASManager(uow);
                result = managerLista.BuscarTodos();
                

            });
            return result;
        }
    }
}
