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
    public class TransferenciasController : Controller
    {
        private ITransferenciasServices _serTra;
        public TransferenciasController(ITransferenciasServices serTra)
        {
            _serTra = serTra;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerTransferenciasPaginado(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros , TransferenciasModel Entidad)
        {
            filtros.Entidad = Entidad;
            var Transf = _serTra.ObtenerTransferencias(paginacion, filtros);
            var formatData = Transf.Select(x => new
            {
               ID_TRANSFERENCIA = x.ID_TRANSFERENCIA,
               CAJA_ORIGEN = string.Format("{0} - {1}",x.SG_CAJAS.NOMBRE, x.SG_CAJAS.DESCRIPCION),
               CAJA_DESTINO = string.Format("{0} - {1}", x.SG_CAJAS1.NOMBRE, x.SG_CAJAS1.DESCRIPCION),
               ID_CAJA_ORIGEN = x.SG_CAJAS.ID_CAJA,
               ID_CAJA_DESTINO = x.SG_CAJAS1.ID_CAJA,
               FECHA = x.FECHA,
               NRO_COMP = x.NRO_COMP,
               IMPORTE_BS = x.IMPORTE_BS,
               CONCEPTO = x.CONCEPTO
            });
            formatData = formatData.OrderBy(x => x.FECHA).ThenBy(x => x.ID_TRANSFERENCIA);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarTransferencia(SG_TRANSFERENCIAS tra)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP =_serTra.SP_GuardarTransferencia(tra, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarTransferencia(int ID_TRANSFERENCIA)
        {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serTra.SP_EliminarTransferencia(ID_TRANSFERENCIA, id_usr);
                return Json(respuestaRSP);
        }
    }
}
