﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CityTruck.Services.Model
{
    public class VentasCreditoModel
    {
        public int? ID_VENTA { get; set; }
        public int? ID_COMBUSTIBLE { get; set; }
        public int? ID_CLIENTE { get; set; }
        public string TURNO { get; set; }
        public DateTime? FECHA { get; set; }
    }

    public class VentasRegistroModel {
        public string FECHA { get; set; }
        public string TURNO { get; set; }
        public string resp { get; set; }
    }
}