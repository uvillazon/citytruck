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
using Newtonsoft.Json;

namespace CityTruck.WebSite.Controllers
{
    public class ComprasController : Controller
    {
        private IComprasServices _serCmp;
        public ComprasController(IComprasServices serCmp)
        {
            _serCmp = serCmp;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerComprasPaginado(PagingInfo paginacion, string ANIO = null, string MES = null)
        {
            if (ANIO == null && MES == null)
            {
                //DateTime fecha = DateTime.Now;
                MES = DateTime.Now.ToString("MM");
                ANIO = DateTime.Now.ToString("yyyy");
            }
            var compras = _serCmp.ObtenerComprasPaginado(paginacion, ANIO, MES);

            var formatData = compras.Select(x => new
            {
                ID_COMPRA = x.ID_COMPRA,
                FECHA = x.FECHA,
                CANTIDAD = x.CANTIDAD,
                IMPORTE = x.IMPORTE,
                FORMULARIO = x.FORMULARIO,
                TOTAL = x.TOTAL,
                PRECIO = x.PRECIO,
                NRO_COMP = x.NRO_COMP,
                NRO_FACTURA = x.NRO_FACTURA,
                ID_CAJA = x.ID_CAJA,
                ID_COMBUSTIBLE = x.ID_COMBUSTIBLE,
                TIPO = x.TIPO,
                USUARIO = x.ID_USUARIO,
                CUENTA = x.SG_CAJAS.DESCRIPCION,
                COMBUSTIBLE = x.SG_COMBUSTIBLES.NOMBRE,
            });

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetallesPaginado(PagingInfo paginacion,int ID_COMPRA = 0)
        {
            var compras = _serCmp.ObtenerDetallesPorCriterio(x=>x.ID_COMPRA == ID_COMPRA);

            var formatData = compras.Select(x => new
            {
                ID_COMPRA = x.ID_COMPRA,
                ID_DETALLE = x.ID_DETALLE,
                DETALLE = x.DETALLE,
                SIMPORTE = x.IMPORTE
            });

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = compras.Count() }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetalles(PagingInfo paginacion)
        {
            var compras = _serCmp.ObtenerDetallesPorCriterio(null);
            var dist = compras.GroupBy(x => x.DETALLE).Select(y => new { DETALLE = y.Key });
            var formatData = dist.Select(x => new
            {
                DETALLE = x.DETALLE
            });

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = compras.Count() }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCompra(SG_COMPRAS comp, string detalles)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCmp.SP_GrabarCompra(comp, id_usr);
            int id_compra;
            bool esNumero = int.TryParse(respuestaSP.msg, out id_compra);
            if (esNumero)
            {
                if (detalles != "false")
                {
                    dynamic det = JsonConvert.DeserializeObject(detalles);
                    foreach (var item in det)
                    {
                        SG_DETALLES_COMPRAS detalleCompra = new SG_DETALLES_COMPRAS()
                        {
                            ID_DETALLE = item.ID_DETALLE,
                            DETALLE = item.DETALLE,
                            ID_COMPRA = id_compra,
                            IMPORTE = item.SIMPORTE,
                        };
                        respuestaSP = _serCmp.SP_GrabarDetalleCompra(detalleCompra, id_usr);
                    }
                }
                else {
                    respuestaSP.msg = "Proceso Ejecutado Correctamente...";
                }
            }
            else
            {
                respuestaSP.success = false;
            }
            respuestaSP.id = id_compra;
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarDetalleCompra(int ID_DETALLE)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serCmp.SP_EliminarDetalleCompra(ID_DETALLE, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost]
        public JsonResult EliminarCompra(int ID_COMPRA)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serCmp.SP_EliminarCompra(ID_COMPRA, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
