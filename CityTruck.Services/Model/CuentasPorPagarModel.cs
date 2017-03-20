using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CityTruck.Services.Model
{
    public class CuentasPorPagarModel
    {
        public int? ID_CLIENTE { get; set; }
        public int? ID_CONTRATO { get; set; }
        public int? ID_ANTICIPO { get; set; }
        public int? ID_CAJA { get; set; }
    }
}