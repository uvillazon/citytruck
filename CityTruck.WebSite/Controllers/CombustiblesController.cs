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
using Newtonsoft.Json;

namespace CityTruck.WebSite.Controllers
{
    public class CombustiblesController : Controller
    {
        private ICombustiblesServices _serCom;
        private IVentasDiariasServices _serVen;
        private IAjustePosServices _serAju;
        private IComprasServices _serComp;
        private IPosTurnosServices _serPos;
        private ITanquesServices _serTan;
        private IKardexCombustibleServices _serKcm;

        public CombustiblesController(ICombustiblesServices serCom, IVentasDiariasServices serVen, IComprasServices serComp, IPosTurnosServices serPos, ITanquesServices serTan, IKardexCombustibleServices serKcm, IAjustePosServices serAju)
        {
            _serCom = serCom;
            _serVen = serVen;
            _serComp = serComp;
            _serPos = serPos;
            _serTan = serTan;
            _serKcm = serKcm;
            _serAju = serAju;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerCombustiblesPaginado(PagingInfo paginacion)
        {
            var cajas = _serCom.ObtenerCombustiblesPaginado(paginacion);
            var formattData = cajas.Select(x => new
            {
                ID_COMBUSTIBLE = x.ID_COMBUSTIBLE,
                NOMBRE = x.NOMBRE,
                DESCRIPCION = x.DESCRIPCION,
                CANT_DISPONIBLE = x.CANT_DISPONIBLE,
                PRECIO_VENTA = x.PRECIO_VENTA,
                PRECIO_COMPRA = x.PRECIO_COMPRA
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerAjustesPaginado(PagingInfo paginacion)
        {
            var cajas = _serCom.ObtenerAjustesPaginados(paginacion);
            var formattData = cajas.Select(x => new
            {
                ID_COMBUSTIBLE = x.SG_TANQUES.ID_COMBUSTIBLE,
                NOMBRE = x.SG_TANQUES.NOMBRE,
                NRO_COMP = x.NRO_COMP,
                OBSERVACION = x.OBSERVACION,
                FECHA = x.FECHA,
                CANTIDAD = x.CANTIDAD,
                DIESEL = x.SG_TANQUES.SG_COMBUSTIBLES.NOMBRE == "DIESEL" ? x.CANTIDAD : 0,
                GASOLINA = x.SG_TANQUES.SG_COMBUSTIBLES.NOMBRE == "GASOLINA" ? x.CANTIDAD : 0,

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexCombustible(PagingInfo paginacion, string ANIO = null, string MES = null)
        {
            //string mes, anio;
            try
            {


                if (ANIO == null && MES == null)
                {
                    //DateTime fecha = DateTime.Now;
                    MES = DateTime.Now.ToString("MM");
                    ANIO = DateTime.Now.ToString("yyyy");
                }
                string date = string.Format("01/{0}/{1}", MES, ANIO);
                //"01/08/2008";
                DateTime dt = Convert.ToDateTime(date);
                _serKcm.SP_ActualizarKardex(dt, 0);
                List<KardexCombustibleModel> listas = new List<KardexCombustibleModel>();
                var kardex = _serKcm.ObtenerKardexCombustible(MES, ANIO);
                var grupo = kardex.GroupBy(x => x.FECHA);
                var diesel = kardex.Where(x => x.SG_COMBUSTIBLES.NOMBRE == "DIESEL").OrderBy(x => x.FECHA);
                //diesel.Where(x=>x.)
                var gasolina = kardex.Where(x => x.SG_COMBUSTIBLES.NOMBRE == "GASOLINA").OrderBy(x => x.FECHA);
                foreach (var item in grupo)
                {
                    KardexCombustibleModel venDia = new KardexCombustibleModel
                    {
                        FECHA = item.Key,
                        //SALDO_INICIAL_DIE = diesel.where(y=>y.FECHA == item.Key).fi
                    };
                    var die = diesel.Where(x => x.FECHA == item.Key).FirstOrDefault();
                    var gas = gasolina.Where(x => x.FECHA == item.Key).FirstOrDefault();
                    venDia.SALDO_INICIAL_DIE = die.SALDO_INICIAL;
                    venDia.COMPRAS_DIE = (decimal)die.COMPRAS;
                    venDia.VENTAS_DIE = (decimal)die.VENTAS;
                    venDia.AJUSTES_DIE = (decimal)die.AJUSTES;
                    venDia.ACUMULADO_DIE = (decimal)die.ACUMULADOS;

                    venDia.VENTAS_GAS = (decimal)gas.VENTAS;
                    venDia.COMPRAS_GAS = (decimal)gas.COMPRAS;
                    venDia.AJUSTES_GAS = (decimal)gas.AJUSTES;
                    venDia.SALDO_INICIAL_GAS = gas.SALDO_INICIAL;
                    venDia.ACUMULADO_GAS = (decimal)gas.ACUMULADOS;
                    listas.Add(venDia);
                }
                listas = listas.OrderBy(x => x.FECHA).ToList();
                listas.Add(new KardexCombustibleModel()
                {
                    COMPRAS_DIE = listas.Sum(x => x.COMPRAS_DIE),
                    VENTAS_DIE = listas.Sum(x => x.VENTAS_DIE),
                    AJUSTES_DIE = listas.Sum(x => x.AJUSTES_DIE),
                    COMPRAS_GAS = listas.Sum(x => x.COMPRAS_GAS),
                    VENTAS_GAS = listas.Sum(x => x.VENTAS_GAS),
                    AJUSTES_GAS = listas.Sum(x => x.AJUSTES_GAS)

                });
                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = listas, Total = paginacion.total }) + ");";
                return JavaScript(callback1);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexMNCombustible(PagingInfo paginacion, string ANIO = null, string MES = null)
        {
            //string mes, anio;
            if (ANIO == null && MES == null)
            {
                //DateTime fecha = DateTime.Now;
                MES = DateTime.Now.ToString("MM");
                ANIO = DateTime.Now.ToString("yyyy");
            }
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            //"01/08/2008";
            DateTime dt = Convert.ToDateTime(date);
            _serKcm.SP_ActualizarKardexMN(dt, 0);
            List<KardexCombustibleModel> listas = new List<KardexCombustibleModel>();
            var kardex = _serKcm.ObtenerKardexMNCombustible(MES, ANIO);
            var grupo = kardex.GroupBy(x => x.FECHA);
            var diesel = kardex.Where(x => x.SG_COMBUSTIBLES.NOMBRE == "DIESEL").OrderBy(x => x.FECHA);
            //diesel.Where(x=>x.)
            var gasolina = kardex.Where(x => x.SG_COMBUSTIBLES.NOMBRE == "GASOLINA").OrderBy(x => x.FECHA);
            foreach (var item in grupo)
            {
                KardexCombustibleModel venDia = new KardexCombustibleModel
                {
                    FECHA = item.Key,
                    //SALDO_INICIAL_DIE = diesel.where(y=>y.FECHA == item.Key).fi
                };
                var die = diesel.Where(x => x.FECHA == item.Key).FirstOrDefault();
                var gas = gasolina.Where(x => x.FECHA == item.Key).FirstOrDefault();
                venDia.SALDO_INICIAL_DIE = die.SALDO_INICIAL;
                venDia.COMPRAS_DIE = (decimal)die.COMPRAS;
                venDia.VENTAS_DIE = (decimal)die.VENTAS;
                venDia.ACUMULADO_DIE = (decimal)die.ACUMULADOS;

                venDia.VENTAS_GAS = (decimal)gas.VENTAS;
                venDia.COMPRAS_GAS = (decimal)gas.COMPRAS;
                venDia.SALDO_INICIAL_GAS = gas.SALDO_INICIAL;
                venDia.ACUMULADO_GAS = (decimal)gas.ACUMULADOS;
                listas.Add(venDia);
            }
            listas = listas.OrderBy(x => x.FECHA).ToList();
            listas.Add(new KardexCombustibleModel()
            {
                COMPRAS_DIE = listas.Sum(x => x.COMPRAS_DIE),
                VENTAS_DIE = listas.Sum(x => x.VENTAS_DIE),
                AJUSTES_DIE = listas.Sum(x => x.AJUSTES_DIE),
                COMPRAS_GAS = listas.Sum(x => x.COMPRAS_GAS),
                VENTAS_GAS = listas.Sum(x => x.VENTAS_GAS),
                AJUSTES_GAS = listas.Sum(x => x.AJUSTES_GAS)

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = listas, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        public JsonResult GuardarAjusteTanque(SG_AJUSTES_TANQUE ajus, int ID_COMBUSTIBLE)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serTan.SP_GuardarAjuste(ajus, ID_COMBUSTIBLE, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public JsonResult GuardarAjusteTanqueMN(SG_AJUSTES_TANQUE_MN ajus, int ID_COMBUSTIBLE)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serTan.SP_GuardarAjusteMN(ajus, ID_COMBUSTIBLE, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost]
        public JsonResult ObtenerAjuste(SG_AJUSTES_TANQUE tanque, int ID_COMBUSTIBLE)
        {
            var datos = _serCom.ObtenerAjusteTanque(x => x.FECHA == tanque.FECHA && x.SG_TANQUES.ID_COMBUSTIBLE == ID_COMBUSTIBLE);
            if (datos != null)
            {
                var format = new
                {
                    ID_COMBUSTIBLE = datos.SG_TANQUES.ID_COMBUSTIBLE,
                    ID_AJUSTE = datos.ID_AJUSTE,
                    CANTIDAD = datos.CANTIDAD,
                    OBSERVACION = datos.OBSERVACION,
                    NRO_COMP = datos.NRO_COMP
                    //PRECIO = datos.PRECIO
                };
                return Json(new { success = true, data = format });
            }
            else
            {
                var combustible = _serCom.ObtenerCombustible(x => x.ID_COMBUSTIBLE == ID_COMBUSTIBLE);
                var format = new
                {
                    ID_COMBUSTIBLE = combustible.ID_COMBUSTIBLE,
                    ID_AJUSTE = 0,
                    CANTIDAD = 0,
                    NRO_COMP = 0,
                    OBSERVACION = "Sin Observacion",
                    //PRECIO = combustible.PRECIO_VENTA
                };
                return Json(new { success = true, data = format });

            }
        }
        [HttpPost]
        public JsonResult ObtenerAjusteMN(SG_AJUSTES_TANQUE_MN tanque, int ID_COMBUSTIBLE)
        {
            var datos = _serCom.ObtenerAjusteTanqueMN(x => x.FECHA == tanque.FECHA && x.SG_TANQUES.ID_COMBUSTIBLE == ID_COMBUSTIBLE);
            if (datos != null)
            {
                var format = new
                {
                    ID_COMBUSTIBLE = datos.SG_TANQUES.ID_COMBUSTIBLE,
                    ID_AJUSTE = datos.ID_AJUSTE,
                    CANTIDAD = datos.CANTIDAD,
                    OBSERVACION = datos.OBSERVACION,
                    NRO_COMP = datos.NRO_COMP
                    //PRECIO = datos.PRECIO
                };
                return Json(new { success = true, data = format });
            }
            else
            {
                var combustible = _serCom.ObtenerCombustible(x => x.ID_COMBUSTIBLE == ID_COMBUSTIBLE);
                var format = new
                {
                    ID_COMBUSTIBLE = combustible.ID_COMBUSTIBLE,
                    ID_AJUSTE = 0,
                    CANTIDAD = 0,
                    NRO_COMP = 0,
                    OBSERVACION = "Sin Observacion",
                    //PRECIO = combustible.PRECIO_VENTA
                };
                return Json(new { success = true, data = format });

            }
        }
        [HttpGet]
        public ActionResult ObtenerAjustePos(PagingInfo paginacion, FiltrosModel<PosTurnosModel> filtros, PosTurnosModel posTurnos)
        {
            filtros.Entidad = posTurnos;
            var result = _serAju.ObtenerAjustePos(paginacion, filtros);

            if (paginacion.total == 0)
            {
                try
                {
                    var spPos = _serAju.SP_GenerarAjustePos(posTurnos.FECHA, Convert.ToInt32(User.Identity.Name.Split('-')[3]));
                    if (!spPos.success)
                    {
                        JavaScriptSerializer javaScriptSerializer2 = new JavaScriptSerializer();
                        string callback2 = paginacion.callback + "(" + javaScriptSerializer2.Serialize(new { success = false, msg = spPos.msg }) + ");";
                        //string callback1 = info.callback + "(" + json + ");";


                        return JavaScript(callback2);
                    }
                    else
                    {
                        result = _serAju.ObtenerAjustePos(paginacion, filtros);
                    }
                }
                catch (Exception)
                {

                    throw;
                }

            }
            if (filtros.Contiene == "AJUSTES_DIE")
            {
                result = result.Where(x => x.SG_POS.ID_COMBUSTIBLE == 2);
            }
            else { result = result.Where(x => x.SG_POS.ID_COMBUSTIBLE == 1); }

            var formattData = result.Select(x => new
            {
                PRODUCTO = x.SG_POS.CODIGO + " - " + x.SG_POS.SG_COMBUSTIBLES.NOMBRE,
                CODIGO = x.SG_POS.SG_COMBUSTIBLES.NOMBRE,
                ID_POS = x.ID_POS,
                ID_AJUSTE = x.ID_AJUSTE,
                AJUSTE = x.AJUSTE

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Total = paginacion.total, Rows = formattData }) + ");";
            //string callback1 = info.callback + "(" + json + ");";


            return JavaScript(callback1);

        }

        [HttpPost]
        public JsonResult GuardarAjustePos(string ajustes, DateTime FECHA)
        {
            try
            {
                RespuestaSP respuestaRSP = new RespuestaSP();
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                if (ajustes == "false")
                {
                    respuestaRSP.success = false;
                    respuestaRSP.msg = "No existe ningun cambio...";
                    return Json(respuestaRSP);
                }
                else
                {
                    dynamic pos_ajustes = JsonConvert.DeserializeObject(ajustes);
                    //RespuestaSP respuestaRSP = new RespuestaSP();
                    foreach (var o in pos_ajustes)
                    {
                        //p_id_ot,p_id_poste,p_id_cod_man,p_instruc_sol,p_idcentro_costo,p_descripcion_cc,p_login_usr,p_res
                        SG_AJUSTE_POS pos = new SG_AJUSTE_POS
                        {
                            ID_AJUSTE = o.ID_AJUSTE,
                            ID_POS = o.ID_POS,
                            FECHA = FECHA,
                            AJUSTE = o.AJUSTE,
                            ID_USUARIO = (short)id_usr
                        };

                        respuestaRSP = _serAju.SP_GuardarAjustePos(pos, id_usr);

                        if (!respuestaRSP.success)
                        {
                            return Json(new { success = false, msg = string.Format("Se produjo un error al intentar grabar la OT: {0}") });
                        }
                    }
                    return Json(respuestaRSP);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
