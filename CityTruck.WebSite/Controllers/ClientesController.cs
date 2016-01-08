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
    public class ClientesController : Controller
    {
        private IClientesServices _serCli;
        private IKardexClienteServices _serKar;

        public ClientesController(IClientesServices serCli, IKardexClienteServices serKar)
        {
            _serCli = serCli;
            _serKar = serKar;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerClientesPaginado(PagingInfo paginacion, string ANIO = null, string MES = null)
        {
            var clientes = _serCli.ObtenerClientesPaginado(paginacion, ANIO, MES);
            var formatData = clientes.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                CODIGO = x.CODIGO,
                EMPRESA = x.EMPRESA,
                SALDO = x.SALDO,
                CONSUMO = x.CONSUMO,
                NIT = x.NIT,
                CONTACTO = x.CONTACTO,
                TELEFONO = x.TELEFONO,
                DIRECCION = x.DIRECCION,
                LIMITE = x.LIMITE,
            });
            var lista = formatData.ToList();
            //lista = lista.Add(m);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexClientePaginado(PagingInfo paginacion, FiltrosModel<KardexClienteModel> filtros, KardexClienteModel Kardex)
        {
            filtros.Entidad = Kardex;
            ConsumoAmortizacionModel cons = new ConsumoAmortizacionModel();
            var kardexd = _serKar.ObtenerKardexCliente(paginacion, filtros ,cons);
            var formatData = kardexd.Select(x => new
            {
                ID_CLIENTE = x.ID_CLIENTE,
                ID_KARDEX = x.ID_KARDEX,
                FECHA = x.FECHA,
                CONSUMO = x.CONSUMO,
                AMORTIZACION = x.AMORTIZACION,
                SALDO = x.SALDO,
                DETALLE = x.DETALLE,
                TOTAL_AMOR  = cons.amortizacion,
                TOTAL_CONS = cons.consumo
            });
           
            formatData = formatData.OrderBy(x => x.FECHA).ThenByDescending(x => x.ID_KARDEX);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total ,consumo = cons.consumo , amortizacion = cons.amortizacion}) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarAmortizacion(SG_AMORTIZACIONES a)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarAmortizacion(a, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult GuardarCliente(SG_CLIENTES cli)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCli.SP_GrabarCliente(cli, id_usr);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarCliente(int ID_CLIENTE)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serCli.SP_EliminarCliente(ID_CLIENTE, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
