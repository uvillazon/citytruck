using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CityTruck.Services.Model
{
    public class ConsumosModel
    {
        public int? ID_CONSUMO { get; set; }
        public int? ID_COMBUSTIBLE { get; set; }
        public int? ID_CLIENTE { get; set; }
        public string TURNO { get; set; }
        public DateTime? FECHA { get; set; }
    }
    public class ConsumoDetalleModel {
        public int? ID_CONSUMO { get; set; }
        public string CLIENTE { get; set; }
        public int? ID_CLIENTE { get; set; }
    }
}