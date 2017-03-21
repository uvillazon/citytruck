using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CityTruck.Services.Interfaces;
using CityTruck.Common;
using System.Web.Script.Serialization;
using System.Collections;
using CityTruck.WebSite.Models;
using CityTruck.Services.Model;
using CityTruck.Model;

namespace CityTruck.WebSite.Controllers
{
    public class ClientesPorPagarController : Controller
    {
        private ICuentasPorPagarServices _serCli;

        public ClientesPorPagarController(ICuentasPorPagarServices serCli)
        {
            _serCli = serCli;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerClientesPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros, CuentasPorPagarModel entidad)
        {
            filtros.Entidad = entidad;
            var clientes = _serCli.ObtenerClientesCuentasPorPagaPaginado(paginacion, filtros);
            var formatData = clientes.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                CODIGO = x.CODIGO,
                RAZON_SOCIAL = x.RAZON_SOCIAL,
                SALDO = x.SALDO,
                EMAIL = x.EMAIL,
                NIT = x.NIT,
                CONTACTO = x.CONTACTO,
                TELEFONO = x.TELEFONO,
                DIRECCION = x.DIRECCION,
                OBSERVACIONES = x.OBSERVACIONES,
                FECHA_REG = x.FECHA_REG,
                TOTAL_CONTRATOS = x.SG_CONTRATOS.Count()
            });
            var lista = formatData.ToList();
            //lista = lista.Add(m);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerAmortizacionesPaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros, CuentasPorPagarModel entidad)
        {
            filtros.Entidad = entidad;
            var clientes = _serCli.ObtenerAnticiposPaginado(paginacion, filtros);
            var formatData = clientes.Select(x => new
            {
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                GLOSA = x.GLOSA,
                ID_ANTICIPO = x.ID_ANTICIPO,
                ID_CAJA = x.ID_CAJA,
                ID_CONTRATO = x.ID_CONTRATO,
                CAJA = x.SG_CAJAS.NOMBRE,
                ID_EGRESO = x.ID_EGRESO,
                IMPORTE_BS = x.IMPORTE_BS,
                NRO_COMP = x.NRO_COMP,
                OBSERVACION = x.OBSERVACION,
                CONCEPTO = x.SG_EGRESOS.CONCEPTO
            });
            var lista = formatData.ToList();
            //lista = lista.Add(m);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCliente(SG_CLIENTES_CPP cli)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarClienteCuentasPorPagar(cli, id_usr);
            return Json(respuestaSP);
        }

        [HttpGet]
        public ActionResult ObtenerKardexPorClientePaginado(PagingInfo paginacion, FiltrosModel<CuentasPorPagarModel> filtros, CuentasPorPagarModel entidad)
        {
            filtros.Entidad = entidad;
            var result = _serCli.ObtenerKardexClientes(paginacion, filtros);

            //lista = lista.Add(m);
            result = result.OrderBy(x => x.FECHA).ThenByDescending(x => x.ID_KARDEX);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = result, Total = paginacion.total , success = paginacion.total > 0 ? true : false }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarContrato(SG_CONTRATOS c)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarContrato(c, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarContrato(int ID)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_EliminarContrato(ID, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult GuardarAnticipo(SG_ANTICIPOS c)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarAnticipo(c, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarAnticipo(int ID)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_EliminarAnticipo(ID, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult ObtenerContratoPorId(int ID_CONTRATO)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            var result = _serCli.ObtenerContratoPorCriterio(x=>x.ID_CONTRATO == ID_CONTRATO);
            return Json(result);
        }

         [HttpPost]
        public JsonResult ObtenerAnticipoPorId(int ID_ANTICIPO)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            var result = _serCli.ObtenerAnticipoPorCriterio(x=>x.ID_ANTICIPO == ID_ANTICIPO);
            return Json(result);
        }
    }
}
