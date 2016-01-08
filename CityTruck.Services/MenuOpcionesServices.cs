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
using System.Linq.Expressions;
using System.Data.Objects;

namespace CityTruck.Services
{
    public class MenuOpcionesServices : BaseService, IMenuOpcionesServices
    {
        //private ISG_LISTASManager _manListas;

        public MenuOpcionesServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SG_MENU_OPCIONES> ObtenerMenuOpciones(Expression<Func<SG_MENU_OPCIONES, bool>> criterio)
        {
            IQueryable<SG_MENU_OPCIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_MENU_OPCIONESManager(uow);
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }


        public RespuestaSP SP_GuardarPerfilOpcion(SG_PERFILES_OPCIONES per, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_PERFIL_OPCION(per.ID_PERFIL,per.ID_OPC,0, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejectuado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }
                

            });
            return result;
        }

        public RespuestaSP SP_EliminarPerfilOpcion(SG_PERFILES_OPCIONES per, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_PERFIL_OPCION(per.ID_PERFIL, per.ID_OPC, 0, p_res);
                if (p_res.Value.ToString() == "1")
                {
                    result.success = true;
                    result.msg = "Proceso Ejectuado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }
            });
            return result;
        }
    }
}
