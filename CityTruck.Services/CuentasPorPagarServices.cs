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
    public class CuentasPorPagarServices : BaseService, ICuentasPorPagarServices
    {
        //private ISG_LISTASManager _manListas;

        public CuentasPorPagarServices(/*ISG_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }

        public IEnumerable<SG_CLIENTES_CPP> ObtenerClientesCuentasPorPagaPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros)
        {
            IQueryable<SG_CLIENTES_CPP> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CLIENTES_CPPManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SG_CONTRATOS> ObtenerContratosPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros)
        {
            IQueryable<SG_CONTRATOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CONTRATOSManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SG_ANTICIPOS> ObtenerAnticiposPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros)
        {
            IQueryable<SG_ANTICIPOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_ANTICIPOSManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP SP_GrabarClienteCuentasPorPagar(SG_CLIENTES_CPP cliente, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_CLIENTES_CPP(cliente.ID_CLIENTE, cliente.RAZON_SOCIAL, cliente.NIT, cliente.CONTACTO, cliente.TELEFONO, cliente.DIRECCION, cliente.EMAIL, cliente.OBSERVACIONES, ID_USR, p_res);
                //context.P_SG_GUARDAR_CAJAS(caja.ID_CAJA, caja.CODIGO, caja.NOMBRE, caja.NRO_CUENTA, caja.MONEDA, caja.DESCRIPCION, caja.SALDO, ID_USR, p_res);


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

        public RespuestaSP SP_GrabarContrato(SG_CONTRATOS c, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_CONTRATO(c.ID_CONTRATO, c.ID_CLIENTE, c.FECHA, c.FECHA_VENCIMIENTO, c.COMPROBANTE_RES, c.GLOSA, c.IMPORTE, c.OBSERVACIONES, ID_USR, p_res);  //(cliente.ID_CLIENTE, cliente.RAZON_SOCIAL, cliente.NIT, cliente.CONTACTO, cliente.TELEFONO, cliente.DIRECCION, cliente.EMAIL, cliente.OBSERVACIONES, ID_USR, p_res);
                //context.P_SG_GUARDAR_CAJAS(caja.ID_CAJA, caja.CODIGO, caja.NOMBRE, caja.NRO_CUENTA, caja.MONEDA, caja.DESCRIPCION, caja.SALDO, ID_USR, p_res);


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

        public RespuestaSP SP_EliminarContrato(int ID_CONTRATO, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_CONTRATO(ID_CONTRATO, ID_USR, p_res);  //(c.ID_CONTRATO, c.ID_CLIENTE, c.FECHA, c.FECHA_VENCIMIENTO, c.COMPROBANTE_RES, c.GLOSA, c.IMPORTE, c.OBSERVACIONES, ID_USR, p_res);  //(cliente.ID_CLIENTE, cliente.RAZON_SOCIAL, cliente.NIT, cliente.CONTACTO, cliente.TELEFONO, cliente.DIRECCION, cliente.EMAIL, cliente.OBSERVACIONES, ID_USR, p_res);
                //context.P_SG_GUARDAR_CAJAS(caja.ID_CAJA, caja.CODIGO, caja.NOMBRE, caja.NRO_CUENTA, caja.MONEDA, caja.DESCRIPCION, caja.SALDO, ID_USR, p_res);


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


        public RespuestaSP SP_GrabarAnticipo(SG_ANTICIPOS c, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_GUARDAR_ANTICIPOS(c.ID_ANTICIPO, c.ID_CONTRATO, c.ID_CAJA, c.FECHA, c.GLOSA, c.IMPORTE_BS, c.OBSERVACION, ID_USR, p_res);
                //context.P_SG_GUARDAR_CONTRATO(c.ID_CONTRATO, c.ID_CLIENTE, c.FECHA, c.FECHA_VENCIMIENTO, c.COMPROBANTE_RES, c.GLOSA, c.IMPORTE, c.OBSERVACIONES, ID_USR, p_res);  //(cliente.ID_CLIENTE, cliente.RAZON_SOCIAL, cliente.NIT, cliente.CONTACTO, cliente.TELEFONO, cliente.DIRECCION, cliente.EMAIL, cliente.OBSERVACIONES, ID_USR, p_res);
                //context.P_SG_GUARDAR_CAJAS(caja.ID_CAJA, caja.CODIGO, caja.NOMBRE, caja.NRO_CUENTA, caja.MONEDA, caja.DESCRIPCION, caja.SALDO, ID_USR, p_res);


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


        //public List<object> ObtenerKardexClientes(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros)
        //{
        //    List<object> result = new List<object>();
        //    ExecuteManager(uow =>
        //    {
        //        //var manager = new SG_CONSUMOS(uow);
        //        //result = manager.BuscarTodos();
        //        //filtros.FiltrarDatos();
        //        //result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
        //        //paginacion.total = result.Count();
        //        //result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

        //    });
        //    return result;
        //}


        //IEnumerable<SG_KARDEX_CLIENTE_POR_PAGAR> ICuentasPorPagarServices.ObtenerKardexClientes(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros)
        //{
        //    throw new NotImplementedException();
        //}


        public IEnumerable<SG_KARDEX_CLIENTE_POR_PAGAR> ObtenerKardexClientes(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros)
        {
            IQueryable<SG_KARDEX_CLIENTE_POR_PAGAR> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_KARDEX_CLIENTE_POR_PAGARManager(uow);
                var managerContrato = new SG_CONTRATOSManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                decimal TOTAL_CONT = paginacion.total > 0 ? result.Sum(x => x.CONTRATO) : 0;
                decimal TOTAL_AMORT = paginacion.total > 0 ? result.Sum(x => x.AMORTIZACION) : 0;
                foreach (var item in result)
                {
                    object SG_CONTRATO = new object { };
                    if (item.OPERACION == "CONTRATO")
                    {
                        var contrato = managerContrato.BuscarTodos(x => x.ID_CONTRATO == item.ID_OPERACION).FirstOrDefault();
                        if (contrato != null)
                        {

                            SG_CONTRATO = new
                            {
                                //SALDO = contrato.SALDO,
                                SALDO = contrato.IMPORTE - contrato.SG_ANTICIPOS.Sum(x => x.IMPORTE_BS),
                                ID_CLIENTE = contrato.ID_CLIENTE,
                                ID_CONTRATO = contrato.ID_CONTRATO,
                                IMPORTE = contrato.IMPORTE,
                                NRO_COMP = contrato.NRO_COMP,
                                RAZON_SOCIAL = contrato.SG_CLIENTES_CPP.RAZON_SOCIAL
                            };
                        }
                        else
                        {
                            SG_CONTRATO = new { };
                        }
                    }
                    item.TOTAL_AMOR = TOTAL_AMORT;
                    item.TOTAL_CONT = TOTAL_CONT;
                    item.SG_CONTRATOS = SG_CONTRATO;
                }
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public SG_CONTRATOS ObtenerContratoCriterio(System.Linq.Expressions.Expression<Func<SG_CONTRATOS, bool>> criterio = null)
        {
            SG_CONTRATOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_CONTRATOSManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }

        public SG_ANTICIPOS ObtenerAnticipoCriterio(System.Linq.Expressions.Expression<Func<SG_ANTICIPOS, bool>> criterio = null)
        {
            SG_ANTICIPOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SG_ANTICIPOSManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }

        public DataForm<object> ObtenerContratoPorCriterio(System.Linq.Expressions.Expression<Func<SG_CONTRATOS, bool>> criterio = null)
        {
            DataForm<object> result = new DataForm<object>();
            ExecuteManager(uow =>
            {
                var manager = new SG_CONTRATOSManager(uow);
                var contrato = manager.BuscarTodos(criterio).FirstOrDefault();
                if (contrato == null)
                {
                    result.success = false;
                    result.msg = "No existe registro";
                }
                else
                {
                    result.success = true;
                    result.data = new
                    {
                        COMPROBANTE_RES = contrato.COMPROBANTE_RES,
                        FECHA = contrato.FECHA.ToString("dd/MM/yyyy"),
                        FECHA_REG = contrato.FECHA_REG,
                        FECHA_VENCIMIENTO = contrato.FECHA_VENCIMIENTO,
                        GLOSA = contrato.GLOSA,
                        ID_CLIENTE = contrato.ID_CLIENTE,
                        CLIENTE = contrato.SG_CLIENTES_CPP.RAZON_SOCIAL,
                        ID_CONTRATO = contrato.ID_CONTRATO,
                        IMPORTE = contrato.IMPORTE,
                        NRO_COMP = contrato.NRO_COMP,
                        OBSERVACIONES = contrato.OBSERVACIONES,
                        SALDO = contrato.SALDO,

                    };
                }
            });
            return result;

        }

        public DataForm<object> ObtenerAnticipoPorCriterio(System.Linq.Expressions.Expression<Func<SG_ANTICIPOS, bool>> criterio = null)
        {
            DataForm<object> result = new DataForm<object>();
            ExecuteManager(uow =>
            {
                var manager = new SG_ANTICIPOSManager(uow);
                var contrato = manager.BuscarTodos(criterio).FirstOrDefault();
                if (contrato == null)
                {
                    result.success = false;
                    result.msg = "No existe registro";
                }
                else
                {
                    result.success = true;
                    result.data = new
                    {
                        FECHA = contrato.FECHA,
                        GLOSA = contrato.GLOSA,
                        ID_ANTICIPO = contrato.ID_ANTICIPO,
                        ID_CAJA = contrato.ID_CAJA,
                        ID_CONTRATO = contrato.ID_CONTRATO,
                        ID_EGRESO = contrato.ID_EGRESO,
                        IMPORTE_BS = contrato.IMPORTE_BS,
                        NRO_COMP = contrato.NRO_COMP,
                        OBSERVACION = contrato.OBSERVACION,
                        CAJA = contrato.SG_CAJAS.NOMBRE
                    };
                }
            });
            return result;
        }


        public RespuestaSP SP_EliminarAnticipo(int ID_ANTICIPO, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (CityTruckContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SG_ELIMINAR_ANTICIPO(ID_ANTICIPO, ID_USR, p_res);

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
    }
}
