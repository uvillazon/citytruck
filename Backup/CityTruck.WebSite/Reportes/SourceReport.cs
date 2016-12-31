using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CityTruck.Model;
using CityTruck.Services;
using CityTruck.Services.Interfaces;
using CityTruck.WebSite.Models;

namespace CityTruck.WebSite.Reportes
{
    public class SourceReport
    {
        private UsuariosServices servicioUsuario = new UsuariosServices();
        public string ObtenerMesEspanol(int m) {
            string mes = "";
            switch (m)
            {
                case 1:
                    mes = "ENERO";
                    break;
                case 2:
                    mes = "FEBRERO";
                    break;
                case 3:
                    mes = "MARZO";
                    break;
                case 4:
                    mes = "ABRIL";
                    break;
                case 5:
                    mes = "MAYO";
                    break;
                case 6:
                    mes = "JUNIO";
                    break;
                case 7:
                    mes = "JULIO";
                    break;
                case 8:
                    mes = "AGOSTO";
                    break;
                case 9:
                    mes = "SEPTIEMBRE";
                    break;
                case 10:
                    mes = "OCTUBRE";
                    break;
                case 11:
                    mes = "NOVIEMBRE";
                    break;
                case 12:
                    mes = "DICIEMBRE";
                    break;
                default:
                    mes = "";
                    break;
            }

            return mes;

        }
        public IEnumerable<SG_KARDEX_EFECTIVO> ReporteKardexEfectivo()
        {

            IEnumerable<SG_KARDEX_EFECTIVO> result = null;
            var servicio = new KardexEfectivoServices();
            result = servicio.ObtenerKardexEfectivo(x => x.ID_CAJA == 1);
            return result;
        }
        public IEnumerable<MovimientoProductoModel> ReporteSustanciasControladas(string ANIO = null, string MES = null, int ID_COMBUSTIBLE = 0)
        {
            List<MovimientoProductoModel> result = new List<MovimientoProductoModel>();
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            DateTime dt = Convert.ToDateTime(date);
            var _serKcm = new KardexCombustibleServices();
            var _serPos = new PosTurnosServices();
            var _serAju = new AjustePosServices();
            _serKcm.SP_ActualizarKardexMN(dt, 0);
            var kardex = _serKcm.ObtenerKardexMNCombustible(MES, ANIO);
            var posMes = _serPos.ObtenerPosTurnosPorFecha(ANIO, MES);
            var ajusteposMes = _serAju.ObtenerAjustePosPorFecha(ANIO, MES);
            var grupo = kardex.GroupBy(x => x.FECHA);
            var combustible = kardex.Where(x => x.SG_COMBUSTIBLES.ID_COMBUSTIBLE == ID_COMBUSTIBLE);
            foreach (var item in grupo)
            {
                MovimientoProductoModel venDia = new MovimientoProductoModel
                {
                    FECHA = item.Key,
                    //SALDO_INICIAL_DIE = diesel.where(y=>y.FECHA == item.Key).fi
                };
                var com = combustible.Where(x => x.FECHA == item.Key).FirstOrDefault();
                var pos = posMes.Where(x => x.FECHA == item.Key && x.SG_POS.ID_COMBUSTIBLE == ID_COMBUSTIBLE).OrderBy(y => y.ID_POS);
                var total = pos.Sum(x => x.TOTAL);
                var postotales = pos.GroupBy(x => x.ID_POS).Select(y => new {TOTAL = y.Sum(z=>z.TOTAL) , ID_POS = y.Key });
                

                venDia.PRODUCTO = com.SG_COMBUSTIBLES.DESCRIPCION;
                venDia.MES = ObtenerMesEspanol(com.FECHA.Month);
                venDia.SALDO_ANTERIOR = com.SALDO_INICIAL;
                venDia.COMPRA = (decimal)com.COMPRAS + (decimal)com.AJUSTES;
                venDia.VENTA = (decimal)com.VENTAS;
                decimal saldoventa = venDia.VENTA;
                venDia.SALDO_ACTUAL = (decimal)com.ACUMULADOS;
                venDia.PROVEEDOR = "YPFB";
                venDia.TELEFONO = "4703510";
                int cont = 0;
                foreach (var puntos in postotales)
                {
                    if (cont == 0)
                    {
                        venDia.MANGUERA1 = puntos.TOTAL == 0 ? 0 :(puntos.TOTAL / total) * venDia.VENTA;
                        venDia.MANGUERA1 = Math.Round(venDia.MANGUERA1, 0);
                        saldoventa = saldoventa - venDia.MANGUERA1;
                    }
                    else if (cont == 1)
                    {
                        venDia.MANGUERA2 = puntos.TOTAL == 0 ? 0 : (puntos.TOTAL / total) * venDia.VENTA;
                        venDia.MANGUERA2 = Math.Round(venDia.MANGUERA2, 0);
                        saldoventa = saldoventa - venDia.MANGUERA2;
                    }
                    else if (cont == 2)
                    {
                        venDia.MANGUERA3 = puntos.TOTAL == 0 ? 0 : (puntos.TOTAL / total) * venDia.VENTA;
                        venDia.MANGUERA3 = Math.Round(venDia.MANGUERA3, 0);
                        saldoventa = saldoventa - venDia.MANGUERA3;
                    }
                    else if (cont == 3)
                    {
                        //venDia.MANGUERA4 = puntos.TOTAL == 0 ? 0 : (puntos.TOTAL / total) * venDia.VENTA;
                        //venDia.MANGUERA4 = Math.Round(venDia.MANGUERA4, 0);
                        venDia.MANGUERA4 = saldoventa;
                        saldoventa = 0;
                    }
                    else
                    {
                        cont++;
                    }
                    cont++;
                }
                result.Add(venDia);
            }
            result = result.OrderBy(x => x.FECHA).ToList();
            return result;
        }
        public IEnumerable<EstadoResultadoModel> ReporteEstadoResultado(string ANIO = null, string MES = null)
        {
            List<EstadoResultadoModel> result = new List<EstadoResultadoModel>();
            var servicio = new IngresosServices();
            var consumo = new ClientesConsumoServices();
            var puntosVentaService = new PosTurnosServices();
            var egresos = servicio.ObtenerEgresosPaginado(null, ANIO, MES);
            var ventas = puntosVentaService.ObtenerPosTurnosPorFecha(ANIO, MES);
            var totales = ventas.GroupBy(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
            //var cons = consumo.ObtenerConsumosPorCriterio(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
            decimal? totalventa = 0;
            decimal? totalcosto = 0;
            foreach (var item in totales)
            {
                totalventa = totalventa + item.TOTALVENTA;
                totalcosto = totalcosto + item.TOTALCOSTO;
            }
            foreach (var item in egresos.OrderBy(x => x.FECHA))
            {
                EstadoResultadoModel egre = new EstadoResultadoModel()
                {
                    FECHA = item.FECHA,
                    DETALLE = item.CONCEPTO,
                    //MES =  item.FECHA.ToString("MMMM").ToUpper();
                    TOTAL = item.IMPORTE,
                    UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                };
                egre.MES = ObtenerMesEspanol(item.FECHA.Month);
                    //item.FECHA.ToString("MMMM").ToUpper();
                result.Add(egre);
            }
            return result;
        }
        public IEnumerable<EstadoResultadoCompletoModel> ReporteEstadoResultadoCompleto(string ANIO = null, string MES = null)
        {
            var puntosVentaService = new PosTurnosServices();
            List<EstadoResultadoCompletoModel> result = new List<EstadoResultadoCompletoModel>();
            var ventas = puntosVentaService.ObtenerPosTurnosPorFecha(ANIO, MES);
            var totales = ventas.GroupBy(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
            //var cons = consumo.ObtenerConsumosPorCriterio(x => x.FECHA).Select(y => new { FECHA = y.Key, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO) });
            decimal? totalventa = 0;
            decimal? totalcosto = 0;
            DateTime? fecha = null;
            foreach (var item in totales)
            {
                totalventa = totalventa + item.TOTALVENTA;
                totalcosto = totalcosto + item.TOTALCOSTO;
                fecha = item.FECHA;
            }
            result.Add(new EstadoResultadoCompletoModel() { MES = ObtenerMesEspanol(Convert.ToInt32(MES)),FECHA = fecha, NRO = 1 ,OPERACION = "INGRESOS", SUBOPERACION = "INGRESOS OPERATIVOS", DETALLE = "VENTAS", IMPORTE = totalventa });
            result.Add(new EstadoResultadoCompletoModel() { NRO = 2, OPERACION = "INGRESOS", SUBOPERACION = "INGRESOS OPERATIVOS", DETALLE = "COSTOS DE VENTAS", IMPORTE = -totalcosto });


            var serIngreso = new IngresosServices();

            var ingresos = serIngreso.ObtenerIngresosPorFecha(ANIO, MES);
            var totalesIngreso = ingresos.Where(x=>x.ID_AMORTIZACION == null).Sum(x => x.IMPORTE);

            result.Add(new EstadoResultadoCompletoModel() { NRO = 3,OPERACION = "INGRESOS", SUBOPERACION = "INGRESOS NO OPERATIVOS", DETALLE = "OTROS INGRESOS", IMPORTE = totalesIngreso });

            //ajustes
            var serAjus = new AjustePosServices();
            var ajustes = serAjus.ObtenerAjustePorMesAnio(ANIO, MES);
            var totalesAjustes = ajustes.GroupBy(x => new { x.SG_TANQUES.SG_COMBUSTIBLES.NOMBRE , x.SG_TANQUES.SG_COMBUSTIBLES.PRECIO_VENTA }).Select(y => new { TOTALAJUSTE = y.Sum(x => x.CANTIDAD) * y.Key.PRECIO_VENTA, COMBUSTIBLE = y.Key.NOMBRE });
            //consumo
            var serConsumo = new ClientesConsumoServices();
            var consumos = serConsumo.ObtenerConsumoPorMesyAnio(ANIO, MES);
            var totalesConsumos = consumos.GroupBy(x => new { x.SG_CLIENTES_CONSUMO.NOMBRE, x.SG_COMBUSTIBLES.DESCRIPCION }).Select(y => new { TOTALCONSUMO = y.Sum(x => x.IMPORTE_BS), COMBUSTIBLE = y.Key.DESCRIPCION, CLIENTE = y.Key.NOMBRE });
            decimal? calibraciongasolina = 0;
            decimal? calibracionDiesel = 0;
            foreach (var itemcalibracion in totalesConsumos)
            {
                if (itemcalibracion.CLIENTE == "CALIBRACION IBMETRO") {
                    if (itemcalibracion.COMBUSTIBLE == "GASOLINA ESPECIAL")
                    {
                        calibraciongasolina = itemcalibracion.TOTALCONSUMO;
                    }
                    else {
                        calibracionDiesel = itemcalibracion.TOTALCONSUMO;
                    }
                }
            }
            int cnt = 6;
            int cnt1 = 4;
            foreach (var item in totalesAjustes)
            {
                EstadoResultadoCompletoModel aju = new EstadoResultadoCompletoModel()
                {
                    NRO =cnt,
                    OPERACION = "INGRESOS",
                    SUBOPERACION = "EXCEDENTE/PERDIDA",
                    DETALLE = string.Format("EXCEDENTE/PERDIDA - {0}",item.COMBUSTIBLE),
                    IMPORTE = item.COMBUSTIBLE == "GASOLINA" ? item.TOTALAJUSTE - calibraciongasolina : item.TOTALAJUSTE - calibracionDiesel
                };
                cnt++;
                result.Add(aju);
            }
            //result.Add(new EstadoResultadoCompletoModel() { NRO = 4 ,OPERACION = "INGRESOS", SUBOPERACION = "EXCEDENTE/PERDIDA", DETALLE = "EXCEDENTE/PERDIDA - DIESEL", IMPORTE = 755 });
            //result.Add(new EstadoResultadoCompletoModel() { NRO = 5 ,OPERACION = "INGRESOS", SUBOPERACION = "EXCEDENTE/PERDIDA", DETALLE = "EXCEDENTE/PERDIDA - GASOLINA", IMPORTE = 523 });

            var egresos = serIngreso.ObtenerEgresosPaginado(null, ANIO, MES);
            
            foreach (var item in egresos.OrderBy(x => x.FECHA))
            {

                EstadoResultadoCompletoModel egre = new EstadoResultadoCompletoModel()
                {
                    NRO =cnt,
                    OPERACION = "EGRESOS",
                    SUBOPERACION = "GASTOS",
                    DETALLE = item.CONCEPTO,
                    //MES =  item.FECHA.ToString("MMMM").ToUpper();
                    IMPORTE = -item.IMPORTE,
                    //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                };
                cnt++;
                //egre.MES = ObtenerMesEspanol(item.FECHA.Month);
                    //item.FECHA.ToString("MMMM").ToUpper();
                result.Add(egre);
            }
            
            //consumos
            
            foreach (var itemCons in totalesConsumos)
            {
                if (itemCons.CLIENTE == "CALIBRACION IBMETRO")
                {
                    EstadoResultadoCompletoModel aux = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt1,
                        OPERACION = "INGRESOS",
                        SUBOPERACION = "INGRESOS OPERATIVOS",
                        DETALLE = string.Format("{0} {1}", itemCons.CLIENTE, itemCons.COMBUSTIBLE),
                        IMPORTE = -itemCons.TOTALCONSUMO
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    //var ajusteconsumo = result.Where(x => x.SUBOPERACION == "EXCEDENTE/PERDIDA" && x.DETALLE.Contains(itemCons.COMBUSTIBLE)).FirstOrDefault();
                    //if (ajusteconsumo != null)
                    //{
                    //    ajusteconsumo.IMPORTE = ajusteconsumo.IMPORTE - itemCons.TOTALCONSUMO;
                    //}
                    cnt1++;
                    result.Add(aux);
                }
                else
                {
                    EstadoResultadoCompletoModel cons = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "CONSUMO PROPIO",
                        DETALLE = string.Format("{0} {1}", itemCons.CLIENTE, itemCons.COMBUSTIBLE),
                        IMPORTE = -itemCons.TOTALCONSUMO
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };

                    cnt++;
                    result.Add(cons);
                }
                //egre.MES = ObtenerMesEspanol(item.FECHA.Month);
                //item.FECHA.ToString("MMMM").ToUpper();
                
            }
            return result;
        }
        public IEnumerable<UtilidadVentaBruta> ReporteUtilidadVentaBruta(string ANIO = null, string MES = null)
        {
            List<UtilidadVentaBruta> result = new List<UtilidadVentaBruta>();
            UtilidadVentaBruta result1 = new UtilidadVentaBruta()
            {
                ING_DIESEL_VALORADO = 1284385.28m,
                ING_GASOLINA_VALORADO = 605709.08m,
                EGR_DIESEL_VALORADO = 1222237.60m,
                EGR_GASOLINA_VALORADO = 570079.14m,
                EXC_DIESEL_VALORADO = 0,
                EXC_GASOLINA_VALORADO = 0,
                PER_DIESEL_VALORADO = 0,
                PER_GASOLINA_VALORADO = 0,
                ING_DIESEL_FISICO = 345264.86m,
                ING_GASOLINA_FISICO = 161954.30m,
                EGR_DIESEL_FISICO = 345264.86m,
                EGR_GASOLINA_FISICO = 161954.30m,
                EXC_DIESEL_FISICO = 0,
                EXC_GASOLINA_FISICO = 0,
                PER_DIESEL_FISICO = 0,
                PER_GASOLINA_FISICO = 0

            };
            var puntosVentaService = new PosTurnosServices();
            var ventas = puntosVentaService.ObtenerPosTurnosPorFecha(ANIO, MES);
            var totales = ventas.GroupBy(x => new { x.FECHA, x.SG_POS.ID_COMBUSTIBLE }).Select(y => new { FECHA = y.Key.FECHA, ID_COMBUSTIBLE = y.Key.ID_COMBUSTIBLE, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO), TOTAL_CANTIDAD = y.Sum(x => x.TOTAL) });
            decimal? totalventaGas = 0;
            decimal? totalcostoGas = 0;
            decimal? totalCantidadGas = 0;
            decimal? totalventaDie = 0;
            decimal? totalCantidadDie = 0;
            decimal? totalcostoDie = 0;
            foreach (var item in totales)
            {
                if (item.ID_COMBUSTIBLE == 1)
                {
                    totalventaGas = totalventaGas + item.TOTALVENTA;
                    totalCantidadGas = totalCantidadGas + item.TOTAL_CANTIDAD;
                    totalcostoGas = totalcostoGas + item.TOTALCOSTO;

                }
                else
                {
                    totalventaDie = totalventaDie + item.TOTALVENTA;
                    totalCantidadDie = totalCantidadDie + item.TOTAL_CANTIDAD;
                    totalcostoDie = totalcostoDie + item.TOTALCOSTO;
                }

            }
            result1.ING_DIESEL_FISICO = (decimal)totalCantidadDie;
            result1.ING_GASOLINA_FISICO = (decimal)totalCantidadGas;
            result1.ING_DIESEL_VALORADO = (decimal)totalventaDie;
            result1.ING_GASOLINA_VALORADO = (decimal)totalventaGas;
            result1.EGR_GASOLINA_FISICO = (decimal)totalCantidadGas;
            result1.EGR_DIESEL_FISICO = (decimal)totalCantidadDie;
            result1.EGR_DIESEL_VALORADO = (decimal)totalcostoDie;
            result1.EGR_GASOLINA_VALORADO = (decimal)totalcostoGas;
            //result1.ING_DIESEL_FISICO
            result.Add(result1);
            return result;
        }
        public IEnumerable<UtilidadVentaBruta> ReporteUtilidadVentaEstimada(string ANIO = null, string MES = null)
        {
            List<UtilidadVentaBruta> result = new List<UtilidadVentaBruta>();
            UtilidadVentaBruta result1 = new UtilidadVentaBruta()
            {
                EXC_DIESEL_VALORADO = 0,
                EXC_GASOLINA_VALORADO = 0,
                PER_DIESEL_VALORADO = 0,
                PER_GASOLINA_VALORADO = 0,
                EXC_DIESEL_FISICO = 0,
                EXC_GASOLINA_FISICO = 0,
                PER_DIESEL_FISICO = 0,
                PER_GASOLINA_FISICO = 0

            };
            var puntosVentaService = new PosTurnosServices();
            var comprasService = new ComprasServices();
            var ventas = puntosVentaService.ObtenerPosTurnosPorFecha(ANIO, MES);
            var compras = comprasService.ObtenerComprasPaginado(null, ANIO, MES);
            decimal? totalegresoGas = 0;
            decimal? totalcostoegresoGas = 0;
            decimal? totalegresoDie = 0;
            decimal? totalcostoegresoDie = 0;
            foreach (var item in compras)
            {
                if (item.ID_COMBUSTIBLE == 1)
                {
                    totalegresoGas = totalegresoGas + item.CANTIDAD;
                    totalcostoegresoGas = totalcostoegresoGas + (item.CANTIDAD * item.PRECIO);

                }
                else
                {
                    totalegresoDie = totalegresoDie + item.CANTIDAD;
                    totalcostoegresoDie = totalcostoegresoDie + (item.CANTIDAD * item.PRECIO);
                }
            }
            result1.EGR_GASOLINA_FISICO = (decimal)totalegresoGas;
            result1.EGR_DIESEL_FISICO = (decimal)totalegresoDie;
            result1.EGR_DIESEL_VALORADO = (decimal)totalcostoegresoDie;
            result1.EGR_GASOLINA_VALORADO = (decimal)totalcostoegresoGas;

            var totales = ventas.GroupBy(x => new { x.FECHA, x.SG_POS.ID_COMBUSTIBLE }).Select(y => new { FECHA = y.Key.FECHA, ID_COMBUSTIBLE = y.Key.ID_COMBUSTIBLE, TOTALVENTA = y.Sum(x => x.TOTAL_VENTA), TOTALCOSTO = y.Sum(x => x.TOTAL_COSTO), TOTAL_CANTIDAD = y.Sum(x => x.TOTAL) });
            decimal? totalventaGas = 0;
            decimal? totalCantidadGas = 0;
            decimal? totalventaDie = 0;
            decimal? totalCantidadDie = 0;
            foreach (var item in totales)
            {
                if (item.ID_COMBUSTIBLE == 1)
                {
                    totalventaGas = totalventaGas + item.TOTALVENTA;
                    totalCantidadGas = totalCantidadGas + item.TOTAL_CANTIDAD;

                }
                else
                {
                    totalventaDie = totalventaDie + item.TOTALVENTA;
                    totalCantidadDie = totalCantidadDie + item.TOTAL_CANTIDAD;
                }

            }
            result1.ING_DIESEL_FISICO = (decimal)totalCantidadDie;
            result1.ING_GASOLINA_FISICO = (decimal)totalCantidadGas;
            result1.ING_DIESEL_VALORADO = (decimal)totalventaDie;
            result1.ING_GASOLINA_VALORADO = (decimal)totalventaGas;
            result.Add(result1);
            return result;
        }
        public IEnumerable<UtilidadBrutaReal> ReporteUtilidadBrutaReal(string ANIO = null, string MES = null)
        {
            //obtener precvios
            var _serCom = new CombustiblesServices();
            var Gas = _serCom.ObtenerCombustible(x => x.ID_COMBUSTIBLE == 1);

            var Die = _serCom.ObtenerCombustible(x => x.ID_COMBUSTIBLE == 2);
            ////
            var _serKcm = new KardexCombustibleServices();
            List<UtilidadBrutaReal> result = new List<UtilidadBrutaReal>();
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            DateTime dt = Convert.ToDateTime(date);
            _serKcm.SP_ActualizarKardexMN(dt, 0);
            var kardex = _serKcm.ObtenerKardexCombustible(MES, ANIO);
            var grupo = kardex.GroupBy(x => x.FECHA);
            var diesel = kardex.Where(x => x.SG_COMBUSTIBLES.NOMBRE == "DIESEL").OrderBy(x => x.FECHA);
            var gasolina = kardex.Where(x => x.SG_COMBUSTIBLES.NOMBRE == "GASOLINA").OrderBy(x => x.FECHA);
            UtilidadBrutaReal result1 = new UtilidadBrutaReal();
            result1.ING_INV_INI_FIS_DIE = diesel.FirstOrDefault().SALDO_INICIAL;
            result1.ING_VEN_TOT_FIS_DIE = diesel.GroupBy(x => x.SG_COMBUSTIBLES.ID_COMBUSTIBLE).Select(x => x.Sum(y => y.VENTAS)).FirstOrDefault().Value;

            result1.ING_VEN_TOT_VAL_DIE = (decimal)(result1.ING_VEN_TOT_FIS_DIE * Die.PRECIO_VENTA);
            result1.ING_INV_INI_VAL_DIE = (decimal)(result1.ING_INV_INI_FIS_DIE * Die.PRECIO_VENTA);

            result1.ING_INV_INI_FIS_GAS = gasolina.FirstOrDefault().SALDO_INICIAL;
            result1.ING_VEN_TOT_FIS_GAS = gasolina.GroupBy(x => x.SG_COMBUSTIBLES.ID_COMBUSTIBLE).Select(x => x.Sum(y => y.VENTAS)).FirstOrDefault().Value;

            result1.ING_VEN_TOT_VAL_GAS = (decimal)(result1.ING_VEN_TOT_FIS_GAS * Gas.PRECIO_VENTA);
            result1.ING_INV_INI_VAL_GAS = (decimal)(result1.ING_INV_INI_FIS_GAS * Gas.PRECIO_VENTA);

            result1.EGR_INV_INI_FIS_DIE = (decimal)diesel.LastOrDefault().ACUMULADOS;
            result1.EGR_VEN_TOT_FIS_DIE = diesel.GroupBy(x => x.SG_COMBUSTIBLES.ID_COMBUSTIBLE).Select(x => x.Sum(y => y.COMPRAS)).FirstOrDefault().Value;

            result1.EGR_INV_INI_FIS_GAS = (decimal)gasolina.LastOrDefault().ACUMULADOS;
            result1.EGR_VEN_TOT_FIS_GAS = gasolina.GroupBy(x => x.SG_COMBUSTIBLES.ID_COMBUSTIBLE).Select(x => x.Sum(y => y.COMPRAS)).FirstOrDefault().Value;

            result1.EGR_VEN_TOT_VAL_DIE = (decimal)(result1.EGR_VEN_TOT_FIS_DIE * Die.PRECIO_COMPRA);
            result1.EGR_INV_INI_VAL_DIE = (decimal)(result1.EGR_INV_INI_FIS_DIE * Die.PRECIO_COMPRA);

            result1.EGR_VEN_TOT_VAL_GAS = (decimal)(result1.EGR_VEN_TOT_FIS_GAS * Gas.PRECIO_COMPRA);
            result1.EGR_INV_INI_VAL_GAS = (decimal)(result1.EGR_INV_INI_FIS_GAS * Gas.PRECIO_COMPRA);


            result.Add(result1);
            return result;
        }
        public IEnumerable<KardexCombustibleModel> ReporteANH(string ANIO = null, string MES = null)
        {
            List<KardexCombustibleModel> result = new List<KardexCombustibleModel>();
            if (ANIO == null && MES == null)
            {
                //DateTime fecha = DateTime.Now;
                MES = DateTime.Now.ToString("MM");
                ANIO = DateTime.Now.ToString("yyyy");
            }
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            //"01/08/2008";
            DateTime dt = Convert.ToDateTime(date);
            var _serKcm = new KardexCombustibleServices();
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
                    MES = ObtenerMesEspanol(item.Key.Month)
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
                result.Add(venDia);
            }
            //listas = listas.OrderBy(x => x.FECHA).ToList();
            //JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            //string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = listas, Total = paginacion.total }) + ");";
            //return JavaScript(callback1);
            result = result.OrderBy(x => x.FECHA).ToList();
            return result;
        }
        public IEnumerable<KardexCombustibleModel> ReporteTanques(string ANIO = null, string MES = null)
        {
            List<KardexCombustibleModel> result = new List<KardexCombustibleModel>();
            if (ANIO == null && MES == null)
            {
                //DateTime fecha = DateTime.Now;
                MES = DateTime.Now.ToString("MM");
                ANIO = DateTime.Now.ToString("yyyy");
            }
            string date = string.Format("01/{0}/{1}", MES, ANIO);
            //"01/08/2008";
            DateTime dt = Convert.ToDateTime(date);
            var _serKcm = new KardexCombustibleServices();
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
                venDia.MES = ObtenerMesEspanol(item.Key.Month);
                var die = diesel.Where(x => x.FECHA == item.Key).FirstOrDefault();
                var gas = gasolina.Where(x => x.FECHA == item.Key).FirstOrDefault();
                venDia.SALDO_INICIAL_DIE = die.SALDO_INICIAL;
                venDia.COMPRAS_DIE = (decimal)die.COMPRAS;
                venDia.VENTAS_DIE = (decimal)die.VENTAS;
                venDia.AJUSTES_DIE = (decimal)die.AJUSTES;
                venDia.ACUMULADO_DIE = (decimal)die.ACUMULADOS;
                
                venDia.VENTAS_GAS = (decimal)gas.VENTAS;
                venDia.COMPRAS_GAS = (decimal)gas.COMPRAS;
                venDia.SALDO_INICIAL_GAS = gas.SALDO_INICIAL;
                venDia.ACUMULADO_GAS = (decimal)gas.ACUMULADOS;
                venDia.AJUSTES_GAS = (decimal)gas.AJUSTES;
                result.Add(venDia);
            }
            result = result.OrderBy(x => x.FECHA).ToList();
            return result;
        }

        public IEnumerable<IngresosEgresosModel> ReporteIngreso(int ID)
        {
            List<IngresosEgresosModel> result = new List<IngresosEgresosModel>();
            var servicio = new IngresosServices();
            NumLetra nl = new NumLetra();
            SG_INGRESOS ingreso = servicio.ObtenerIngreso(ID);
            string user = HttpContext.Current.User.Identity.Name.Split('-')[0];
            IngresosEgresosModel ingresoModel = new IngresosEgresosModel()
            {
                DETALLE = ingreso.CONCEPTO,
                FECHA = ingreso.FECHA,
                TOTAL = ingreso.IMPORTE,
                CAJA = ingreso.ID_CAJA != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", ingreso.SG_CAJAS.CODIGO, ingreso.SG_CAJAS.NOMBRE, ingreso.SG_CAJAS.NRO_CUENTA, ingreso.SG_CAJAS.DESCRIPCION) : string.Format("{0} - {1} ", ingreso.SG_CAJAS.CODIGO, ingreso.SG_CAJAS.NOMBRE),
                USUARIO = servicioUsuario.ObtenerUsuariosPorCriterio(y => y.ID_USUARIO == ingreso.ID_USUARIO).FirstOrDefault().NOMBRE,
                TOTAL_LITERAL = nl.Convertir(ingreso.IMPORTE.ToString(), true),
                NRO_COMPROBANTE = ingreso.NRO_COMP
            };

            result.Add(ingresoModel);
            return result;
        }

        public IEnumerable<TransferenciaModel> ReporteTransferencia(int ID)
        {
            List<TransferenciaModel> result = new List<TransferenciaModel>();
            var servicio = new TransferenciasServices();
            NumLetra nl = new NumLetra();
            SG_TRANSFERENCIAS ingreso = servicio.ObtenerTransferenciasPorCriterio(x => x.ID_TRANSFERENCIA == ID);
            string user = HttpContext.Current.User.Identity.Name.Split('-')[0];
            TransferenciaModel ingresoModel = new TransferenciaModel()
            {
                DETALLE = ingreso.CONCEPTO,
                FECHA = ingreso.FECHA,
                TOTAL = ingreso.IMPORTE_BS,
                CAJA_ORIGEN = ingreso.ID_CAJA_ORIGEN != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", ingreso.SG_CAJAS.CODIGO, ingreso.SG_CAJAS.NOMBRE, ingreso.SG_CAJAS.NRO_CUENTA, ingreso.SG_CAJAS.DESCRIPCION) : string.Format("{0} - {1} ", ingreso.SG_CAJAS.CODIGO, ingreso.SG_CAJAS.NOMBRE),
                CAJA_DESTINO = ingreso.ID_CAJA_DESTINO != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", ingreso.SG_CAJAS1.CODIGO, ingreso.SG_CAJAS1.NOMBRE, ingreso.SG_CAJAS1.NRO_CUENTA, ingreso.SG_CAJAS1.DESCRIPCION) : string.Format("{0} - {1} ", ingreso.SG_CAJAS1.CODIGO, ingreso.SG_CAJAS1.NOMBRE),
                USUARIO = servicioUsuario.ObtenerUsuariosPorCriterio(y => y.ID_USUARIO == ingreso.ID_USUARIO).FirstOrDefault().NOMBRE,
                TOTAL_LITERAL = nl.Convertir(ingreso.IMPORTE_BS.ToString(), true),
                NRO_COMPROBANTE = ingreso.NRO_COMP
            };

            result.Add(ingresoModel);
            return result;
        }

        public IEnumerable<IngresosEgresosModel> ReporteEgreso(int ID)
        {
            List<IngresosEgresosModel> result = new List<IngresosEgresosModel>();
            var servicio = new IngresosServices();
            NumLetra nl = new NumLetra();
            SG_EGRESOS egreso = servicio.ObtenerEgreso(ID);
            string user = HttpContext.Current.User.Identity.Name.Split('-')[0];
            IngresosEgresosModel ingresoModel = new IngresosEgresosModel()
            {
                DETALLE = egreso.CONCEPTO,
                FECHA = egreso.FECHA,
                TOTAL = egreso.IMPORTE,
                CAJA = egreso.ID_CAJA != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", egreso.SG_CAJAS.CODIGO, egreso.SG_CAJAS.NOMBRE, egreso.SG_CAJAS.NRO_CUENTA, egreso.SG_CAJAS.DESCRIPCION) : string.Format("{0} - {1} ", egreso.SG_CAJAS.CODIGO, egreso.SG_CAJAS.NOMBRE),
                USUARIO = servicioUsuario.ObtenerUsuariosPorCriterio(y => y.ID_USUARIO == egreso.ID_USUARIO).FirstOrDefault().NOMBRE,
                TOTAL_LITERAL = nl.Convertir(egreso.IMPORTE.ToString(), true),
                NRO_COMPROBANTE = egreso.NRO_COMP
            };

            result.Add(ingresoModel);
            return result;
        }
        public IEnumerable<AjustesTanqueModel> ReporteAjusteTanque(int ID)
        {
            List<AjustesTanqueModel> result = new List<AjustesTanqueModel>();
            var servicio = new CombustiblesServices();
            NumLetra nl = new NumLetra();
            SG_AJUSTES_TANQUE egreso = servicio.ObtenerAjusteTanque(x=>x.ID_AJUSTE == ID);
            string user = HttpContext.Current.User.Identity.Name.Split('-')[0];
            AjustesTanqueModel ingresoModel = new AjustesTanqueModel()
            {
                DETALLE = egreso.OBSERVACION,
                FECHA = egreso.FECHA,
                TOTAL = egreso.CANTIDAD,
                //CAJA = egreso.ID_CAJA != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", egreso.SG_CAJAS.CODIGO, egreso.SG_CAJAS.NOMBRE, egreso.SG_CAJAS.NRO_CUENTA, egreso.SG_CAJAS.DESCRIPCION) : string.Format("{0} - {1} ", egreso.SG_CAJAS.CODIGO, egreso.SG_CAJAS.NOMBRE),
                USUARIO = servicioUsuario.ObtenerUsuariosPorCriterio(y => y.ID_USUARIO == egreso.ID_USUARIO).FirstOrDefault().NOMBRE,
                //TOTAL_LITERAL = nl.Convertir(egreso.IMPORTE.ToString(), true),
                NRO_COMPROBANTE = egreso.NRO_COMP
            };

            result.Add(ingresoModel);
            return result;
        }
        public IEnumerable<VentaDiaria> ReporteVentaDiaria()
        {

            List<VentaDiaria> result = new List<VentaDiaria>();
            VentaDiaria ven = new VentaDiaria()
            {
                TIPO = "Ventas Combustibles",
                DETALLE = "Diesel",
                PARCIAL = 446,
                FECHA = DateTime.Now,
                TURNO = "DIA"

            };
            VentaDiaria ven1 = new VentaDiaria()
            {
                TIPO = "Ventas Combustibles",
                DETALLE = "Gasolina",
                PARCIAL = 527,
                FECHA = DateTime.Now,
                TURNO = "DIA"

            };
            VentaDiaria ven2 = new VentaDiaria()
            {
                TIPO = "Cuentas Por Cobrar",
                DETALLE = "Sergio Mercado GASOLINA",
                PARCIAL = 10,
                FECHA = DateTime.Now,
                TURNO = "DIA"

            };
            VentaDiaria ven21 = new VentaDiaria()
            {
                TIPO = "Cuentas Por Cobrar",
                DETALLE = "Sergio Mercado DIESEL",
                PARCIAL = 10,
                FECHA = DateTime.Now,
                TURNO = "DIA"

            };
            VentaDiaria ven3 = new VentaDiaria()
            {
                TIPO = "Consumo Propio",
                DETALLE = "CityTruck",
                PARCIAL = 10,
                FECHA = DateTime.Now,
                TURNO = "DIA"

            };
            result.Add(ven);
            result.Add(ven1);
            result.Add(ven2);
            result.Add(ven21);
            result.Add(ven3);

            return result;
        }
        public IEnumerable<DetalleMangueraModel> ReporteVenta(string FECHA1, string TURNO)
        {
            DateTime FECHA = DateTime.ParseExact(FECHA1, "dd/MM/yyyy", null);
            var servicio = new PosTurnosServices();
            //var servicioUsuario = new UsuariosServices();
            var query = servicio.ObtenerPosTurnosPorCriterio(x => x.FECHA == FECHA && x.TURNO == TURNO);
            var result = query.Select(x => new DetalleMangueraModel
            {
                COMBUSTIBLE = x.SG_POS.SG_COMBUSTIBLES.DESCRIPCION,
                ENT_LITTER = x.ENT_LITTER,
                SAL_LITTER = x.SAL_LITTER,
                MANGUERA = x.SG_POS.CODIGO,
                FECHA = FECHA,
                TURNO = TURNO,
                USUARIO = servicioUsuario.ObtenerUsuariosPorCriterio(y=>y.ID_USUARIO == x.ID_USUARIO).FirstOrDefault().NOMBRE,
                RESPONSABLE = "RESPONSABLE"
            });
            return result;
        }
        public IEnumerable<VentaCreditoConsumo> ReporteVentaCredito(DateTime FECHA, string TURNO)
        {
            var servicio = new VentasDiariasServices();
            var query = servicio.ObtenerVentasCreditoPorCriterio(x => x.FECHA == FECHA && x.TURNO == TURNO);
            var result = query.Select(x => new VentaCreditoConsumo
            {
                CLIENTE = x.SG_CLIENTES.EMPRESA,
                DIESEL = x.SG_COMBUSTIBLES.NOMBRE == "DIESEL" ? x.IMPORTE_BS : 0,
                GASOLINA = x.SG_COMBUSTIBLES.NOMBRE == "GASOLINA" ? x.IMPORTE_BS : 0,
            });
            return result;
        }
        public IEnumerable<VentaCreditoConsumo> ReporteVentaConsumo(DateTime FECHA, string TURNO)
        {
            var servicio = new VentasDiariasServices();
            var query = servicio.ObtenerConsumosPorCriterio(x => x.FECHA == FECHA && x.TURNO == TURNO);
            var result = query.Select(x => new VentaCreditoConsumo
            {
                CLIENTE = x.SG_CLIENTES_CONSUMO.NOMBRE,
                DIESEL = x.SG_COMBUSTIBLES.NOMBRE == "DIESEL" ? x.IMPORTE_BS : 0,
                GASOLINA = x.SG_COMBUSTIBLES.NOMBRE == "GASOLINA" ? x.IMPORTE_BS : 0,
            });
            return result;
        }
        public IEnumerable<VentaCreditoConsumoTotal> ReporteVentaCreditoConsumo(DateTime FECHA, string TURNO)
        {
            List<VentaCreditoConsumoTotal> result = new List<VentaCreditoConsumoTotal>();
            VentaCreditoConsumoTotal model = new VentaCreditoConsumoTotal();

            var servicio = new VentasDiariasServices();
            var serComb = new CombustiblesServices();
            var ventas = ReporteVenta(String.Format("{0:dd/MM/yyyy}", FECHA), TURNO);
            var creditos = ReporteVentaCredito(FECHA, TURNO);
            var consumo = ReporteVentaConsumo(FECHA, TURNO);
            var grupoventas = ventas.GroupBy(x => x.COMBUSTIBLE).Select(y => new { COMBUSTIBLE = y.Key, TOTAL = y.Sum(z => z.SAL_LITTER) - y.Sum(z => z.ENT_LITTER) });
            model.TOTAL_LITROS_GAS = grupoventas.Where(x => x.COMBUSTIBLE == "GASOLINA ESPECIAL").FirstOrDefault().TOTAL;
            model.TOTAL_LITROS_DIE = grupoventas.Where(x => x.COMBUSTIBLE == "DIESEL  OIL").FirstOrDefault().TOTAL;
            model.PRECIO_COMPRA_GAS = (decimal)serComb.ObtenerCombustible(x => x.ID_COMBUSTIBLE == 1).PRECIO_COMPRA;
            model.PRECIO_COMPRA_DIE = (decimal)serComb.ObtenerCombustible(x => x.ID_COMBUSTIBLE == 2).PRECIO_COMPRA;
            model.PRECIO_VENTA_DIE = (decimal)serComb.ObtenerCombustible(x => x.ID_COMBUSTIBLE == 2).PRECIO_VENTA;
            model.PRECIO_VENTA_GAS = (decimal)serComb.ObtenerCombustible(x => x.ID_COMBUSTIBLE == 1).PRECIO_VENTA;
            model.TOTAL_VENTA_DIE = model.TOTAL_LITROS_DIE * model.PRECIO_VENTA_DIE;
            model.TOTAL_VENTA_GAS = model.TOTAL_LITROS_GAS * model.PRECIO_VENTA_GAS;
            model.CREDITO_DIE = creditos.Sum(x => x.DIESEL);
            model.CREDITO_GAS = creditos.Sum(x => x.GASOLINA);
            model.CONSUMO_DIE = consumo.Sum(x => x.DIESEL);
            model.CONSUMO_GAS = consumo.Sum(x => x.GASOLINA);
            result.Add(model);
            //
            //var consumo = ReporteVentaConsumo(FECHA, TURNO);
            //var query = servicio.ObtenerConsumosPorCriterio(x => x.FECHA == FECHA && x.TURNO == TURNO);
            //var result = query.Select(x => new VentaCreditoConsumo
            //{
            //    CLIENTE = x.SG_CLIENTES_CONSUMO.NOMBRE,
            //    DIESEL = x.SG_COMBUSTIBLES.NOMBRE == "DIESEL" ? x.IMPORTE_BS : 0,
            //    GASOLINA = x.SG_COMBUSTIBLES.NOMBRE == "GASOLINA" ? x.IMPORTE_BS : 0,
            //});

            return result;
        }

        public IEnumerable<CompraDetalle> ReporteCompra(int ID_COMPRA)
        {
            var servicio = new ComprasServices();
            List<CompraDetalle> result = new List<CompraDetalle>();
            NumLetra nl = new NumLetra();
            var query = servicio.ObtenerComprasPorCriterio(x => x.ID_COMPRA == ID_COMPRA).FirstOrDefault();
            string user = HttpContext.Current.User.Identity.Name.Split('-')[0];
            CompraDetalle model = new CompraDetalle()
            {
                CAJA = query.ID_CAJA != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", query.SG_CAJAS.CODIGO, query.SG_CAJAS.NOMBRE, query.SG_CAJAS.NRO_CUENTA, query.SG_CAJAS.DESCRIPCION) : string.Format("{0} - {1} ", query.SG_CAJAS.CODIGO, query.SG_CAJAS.NOMBRE),
                COMBUSTIBLE = query.SG_COMBUSTIBLES.NOMBRE,
                DETALLE = string.Format("Compra Combustible {0}", query.SG_COMBUSTIBLES.NOMBRE),
                CANTIDAD = query.CANTIDAD,
                PRECIO = query.PRECIO,
                IMPORTE_DET = query.CANTIDAD * query.PRECIO,
                NRO_COMP = query.NRO_COMP,
                NRO_FACTURA = query.NRO_FACTURA,
                FECHA = query.FECHA,
                USUARIO = user
            };
            result.Add(model);
            if (query.SG_DETALLES_COMPRAS.Count() > 0)
            {

                foreach (var item in query.SG_DETALLES_COMPRAS)
                {
                    CompraDetalle rec = new CompraDetalle()
                    {
                        CAJA = query.ID_CAJA != 1 ? string.Format("{0} - {1}  Nro Cuenta : {2} {3}", query.SG_CAJAS.CODIGO, query.SG_CAJAS.NOMBRE, query.SG_CAJAS.NRO_CUENTA, query.SG_CAJAS.DESCRIPCION) : string.Format("{0} - {1} ", query.SG_CAJAS.CODIGO, query.SG_CAJAS.NOMBRE),
                        COMBUSTIBLE = query.SG_COMBUSTIBLES.NOMBRE,
                        DETALLE = item.DETALLE,
                        CANTIDAD = 1,
                        PRECIO = item.IMPORTE,
                        IMPORTE_DET = item.IMPORTE,
                        NRO_COMP = query.NRO_COMP,
                        NRO_FACTURA = query.NRO_FACTURA,
                        FECHA = query.FECHA,
                        USUARIO = user
                    };
                    result.Add(rec);

                }
            }
            foreach (var item in result)
            {
                item.TOTAL = result.Sum(y => y.IMPORTE_DET);
                item.TOTAL_LITERAL = nl.Convertir(item.TOTAL.ToString(), true);

            }
            return result;
        }
        public IEnumerable<AmortizacionesModel> ReporteKardexCliente(int ID, DateTime? FECHA_INICIO, DateTime? FECHA_FINAL)
        {
            //List<AmortizacionesModel> result = new List<AmortizacionesModel>();
            var servicio = new KardexClienteServices();
            NumLetra nl = new NumLetra();
            string user = HttpContext.Current.User.Identity.Name.Split('-')[0];
            IEnumerable<SG_KARDEX_CLIENTE> resultkardex = null;

            resultkardex = servicio.ObtenerKardexClientePorCriterio(x => x.ID_CLIENTE == ID);

            if (FECHA_FINAL != null)
            {
                resultkardex = resultkardex.Where(x => x.ID_CLIENTE == ID && x.FECHA <= FECHA_FINAL);
            }
            if (FECHA_INICIO != null)
            {
                resultkardex = resultkardex.Where(x => x.ID_CLIENTE == ID && x.FECHA >= FECHA_INICIO);
            }
            var result = resultkardex.OrderBy(y=>y.FECHA).Select(x => new AmortizacionesModel() { 
                AMORTIZACION = x.AMORTIZACION,
                CLIENTE = x.SG_CLIENTES.EMPRESA,
                CUENTA = x.SG_CLIENTES.CODIGO.ToString(),
                CONSUMO = x.CONSUMO,
                FECHA = x.FECHA,
                SALDO = x.SALDO,
                DETALLE = x.DETALLE,
                USUARIO  = user,
                FECHA_FINAL = FECHA_FINAL,
                FECHA_INICIO = FECHA_INICIO
            });
            return result;
        }


    }
}