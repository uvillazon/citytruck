﻿using System;
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
    public class ClientesConsumoController : Controller
    {
        private IClientesConsumoServices _serCli;

        public ClientesConsumoController(IClientesConsumoServices serCli)
        {
            _serCli = serCli;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerClientesConsumoPaginado(PagingInfo paginacion)
        {
            var clientes = _serCli.ObtenerClientesPaginado(paginacion);
            var formatData = clientes.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                CODIGO = x.CODIGO,
                NOMBRE = x.NOMBRE,
                RESPONSABLE = x.RESPONSABLE,
                CONSUMO_BS = x.CONSUMO_BS,
                CONSUMO = x.CONSUMO,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerClientesPaginado(PagingInfo paginacion)
        {
            _serCli.SP_ActualizarConsumos();
            var clientes = _serCli.ObtenerClientesConsumoPaginado(paginacion);
            var formatData = clientes.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                CODIGO = _serCli.ObtenerCliente(y => y.ID_CLIENTE == x.ID_CLIENTE).CODIGO,
                NOMBRE = _serCli.ObtenerCliente(y => y.ID_CLIENTE == x.ID_CLIENTE).NOMBRE,
                DESCRIPCION = x.CLIENTE + " - " + x.COMBUSTIBLE,
                RESPONSABLE = _serCli.ObtenerCliente(y => y.ID_CLIENTE == x.ID_CLIENTE).RESPONSABLE,
                CONSUMO_BS = x.CONSUMO_BS,
                CONSUMO = x.CONSUMO,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerConsumosPaginado(PagingInfo paginacion,FiltrosModel<ConsumoDetalleModel>filtros , ConsumoDetalleModel Entidad)
        {
            filtros.Entidad = Entidad;
            var clientes = _serCli.ObtenerConsumosPaginado(paginacion,filtros);
            var formatData = clientes.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                CLIENTE = x.SG_CLIENTES_CONSUMO.NOMBRE,
                FECHA = x.FECHA,
                NRO_COMP = x.NRO_COMP,
                TURNO = x.TURNO,
                RESPONSABLE = x.RESPONSABLE,
                CONSUMO = x.IMPORTE_LTS,
                CONSUMO_BS = x.IMPORTE_BS
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCliente(SG_CLIENTES_CONSUMO cli)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarCliente(cli, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarCliente(int ID_CLIENTE)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_EliminarCliente(ID_CLIENTE, id_usr);
            return Json(respuestaSP);
        }
    }
}
