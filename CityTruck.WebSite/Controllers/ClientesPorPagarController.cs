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
                SALDO = x.SG_CONTRATOS == null ? 0: x.SG_CONTRATOS.Sum(y=>y.SALDO),
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
        public JsonResult GuardarAnticipo(SG_ANTICIPOS c)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarAnticipo(c, id_usr);
            return Json(respuestaSP);
        }

        //[AcceptVerbs(HttpVerbs.Get)]
        //public ActionResult ObtenerClientesPaginado(PagingInfo paginacion)
        //{
        //    _serCli.SP_ActualizarConsumos();
        //    var clientes = _serCli.ObtenerClientesConsumoPaginado(paginacion);
        //    var formatData = clientes.Select(x => new
        //    {
        //        ID_CLIENTE = x.ID_CLIENTE,
        //        CODIGO = _serCli.ObtenerCliente(y => y.ID_CLIENTE == x.ID_CLIENTE).CODIGO,
        //        NOMBRE = _serCli.ObtenerCliente(y => y.ID_CLIENTE == x.ID_CLIENTE).NOMBRE,
        //        DESCRIPCION = x.CLIENTE,
        //        RESPONSABLE = _serCli.ObtenerCliente(y => y.ID_CLIENTE == x.ID_CLIENTE).RESPONSABLE,
        //        CONSUMO_BS = x.CONSUMO_BS,
        //        CONSUMO = x.CONSUMO,
        //    });
        //    JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //    string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
        //    return JavaScript(callback1);
        //}
        //[AcceptVerbs(HttpVerbs.Get)]
        //public ActionResult ObtenerConsumosPaginado(PagingInfo paginacion,FiltrosModel<ConsumoDetalleModel>filtros , ConsumoDetalleModel Entidad)
        //{
        //    filtros.Entidad = Entidad;
        //    var clientes = _serCli.ObtenerConsumosPaginado(paginacion,filtros);
        //    var formatData = clientes.Select(x => new
        //    {
        //        ID_CLIENTE = x.ID_CLIENTE,
        //        CLIENTE = x.SG_CLIENTES_CONSUMO.NOMBRE,
        //        FECHA = x.FECHA,
        //        NRO_COMP = x.NRO_COMP,
        //        TURNO = x.TURNO,
        //        RESPONSABLE = x.RESPONSABLE,
        //        CONSUMO = x.IMPORTE_LTS,
        //        CONSUMO_BS = x.IMPORTE_BS
        //    });
        //    JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //    string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
        //    return JavaScript(callback1);
        //}

        //[HttpPost]
        //public JsonResult GuardarCliente(SG_CLIENTES_CONSUMO cli)
        //{
        //    int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serCli.SP_GrabarCliente(cli, id_usr);
        //    return Json(respuestaSP);
        //}
        //[HttpPost]
        //public JsonResult EliminarCliente(int ID_CLIENTE)
        //{
        //    int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serCli.SP_EliminarCliente(ID_CLIENTE, id_usr);
        //    return Json(respuestaSP);
        //}
    }
}
