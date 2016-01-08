using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CityTruck.Services.Model
{
    public class KardexClienteModel
    {
        public int? ID_KARDEX { get; set; }
        public int? ID_CLIENTE { get; set; }
        public string OPERACION { get; set; }
        public DateTime? FECHA { get; set; }
    }
    public class ConsumoAmortizacionModel
    {
        public decimal consumo { get; set; }
        public decimal amortizacion { get; set; }
    }
}