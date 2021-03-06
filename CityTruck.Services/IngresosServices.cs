﻿using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using CityTruck.Services.Interfaces;
using CityTruck.Business;
using CityTruck.Common;
using CityTruck.Model;
using CityTruck.Services.Model;
using System.Linq.Dynamic;
using LinqKit;
using System.Diagnostics;

namespace CityTruck.Services
{
    public class IngresosServices : BaseService, IIngresosServices
    {
        //private ISG_LISTASManager _manListas;

        public IngresosServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }

        public IEnumerable<SG_INGRESOS> ObtenerIngresosPaginado(PagingInfo paginacion, string ANIO, string MES)
        {
            IQueryable<SG_INGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_INGRESOSManager(uow);
                result = manager.BuscarTodos();

                result = manager.ObtenerIngresosPorMesyAnio(ANIO, MES);

                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public SG_INGRESOS ObtenerIngreso(int ID)
        {
            SG_INGRESOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_INGRESOSManager(uow);

                result = manager.ObtenerIngresoPorId(ID).FirstOrDefault();
            });
            return result;
        }

        public RespuestaSP SP_GrabarIngreso(SG_INGRESOS ing, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                //var manager = new SG_INGRESOSManager(uow);
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_INGRESOS(ing.ID_INGRESO, ing.FECHA, ing.CONCEPTO, ing.ID_CAJA, ing.IMPORTE, ID_USR, ing.ID_AMORTIZACION,p_res);

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


        public IEnumerable<SG_EGRESOS> ObtenerEgresosPaginado(PagingInfo paginacion, string ANIO, string MES)
        {
            IQueryable<SG_EGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_EGRESOSManager(uow);
                result = manager.BuscarTodos();
                result = manager.ObtenerEgresosPorMesyAnio(ANIO, MES);
                if (paginacion != null)
                {
                    paginacion.total = result.Count();
                    result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                }

            });
            return result;
        }

        public SG_EGRESOS ObtenerEgreso(int ID)
        {
            SG_EGRESOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_EGRESOSManager(uow);

                result = manager.ObtenerEgresoPorId(ID).FirstOrDefault();
            });
            return result;
        }

        public RespuestaSP SP_GrabarEgreso(SG_EGRESOS egr, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_EGRESOS(egr.ID_EGRESO, egr.FECHA, egr.CONCEPTO, egr.ID_CAJA, egr.IMPORTE, ID_USR, p_res);
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

        public RespuestaSP SP_EliminarIngreso(int ID_INGRESO, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_INGRESO(ID_INGRESO, ID_USR, p_res);
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

        public RespuestaSP SP_EliminarEgreso(int ID_EGRESO, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_EGRESO(ID_EGRESO, ID_USR, p_res);
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
        public IEnumerable<SG_INGRESOS> ObtenerIngresosPorFecha(string ANIO, string MES)
        {
            IQueryable<SG_INGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_INGRESOSManager(uow);
                result = manager.ObtenerIngresosPorMesyAnio(ANIO, MES);

            });
            return result;
        }
        
    }
}
