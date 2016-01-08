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
    public class CajasController : Controller
    {
        private ICajasServices _serCaj;
        private IKardexEfectivoServices _serKar;
        public CajasController(ICajasServices serCaj, IKardexEfectivoServices serKar)
        {
            _serCaj = serCaj;
            _serKar = serKar;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerCajasPaginado(PagingInfo paginacion)
        {
            var cajas = _serCaj.ObtenerCajasPaginado(paginacion);
            var formatData = cajas.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                NOMBRE = x.NOMBRE,
                CODIGO = x.CODIGO,
                DESCRIPCION = x.DESCRIPCION,
                NRO_CUENTA = x.NRO_CUENTA,
                MONEDA = x.MONEDA,
                SALDO = x.SALDO,
                COMPRAS = x.SG_COMPRAS.Count(),
            });
            //formatData.ToList().Add(new
            //{
            //    SALDO = formatData.Sum(x => x.SALDO)
            //});
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexEfectivoPaginado(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros, KardexEfectivoModel Kardex)
        {
            filtros.Entidad = Kardex;
            var kardexd = _serKar.ObtenerKardexEfectivo(paginacion, filtros);
            //kardexd = kardexd.OrderByDescending(x => new { x.FECHA , x.ID_KARDEX});
            var formatData = kardexd.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                ID_KARDEX = x.ID_KARDEX,
                FECHA = x.FECHA,
                INGRESO = x.INGRESO,
                EGRESO = x.EGRESO,
                SALDO = x.SALDO,
                DETALLE = x.DETALLE,
            });
            formatData = formatData.OrderBy(x => x.FECHA).ThenBy(x => x.ID_KARDEX);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCaja(SG_CAJAS caj)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCaj.SP_GrabarCaja(caj, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarCaja(int ID_CAJA)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serCaj.SP_EliminarCaja(ID_CAJA, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
