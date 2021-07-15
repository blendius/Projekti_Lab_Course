using System;
using System.Collections.Generic;

namespace Domain
{
    public class Salla
    {
        public Guid SallaId { get; set; }
        public string EmriSalles { get; set; }
        public string Kati { get; set; }
        public int NrUleseve { get; set; }
        public string HasProjector { get; set; }
        public Klasa Klasa { get; set; }
      
    }
}