using System;
using System.Collections.Generic;

namespace Domain
{
    public class Salla
    {
        public Guid SallaId { get; set; }
        public string EmriSalles { get; set; }
        public Klasa Klasa { get; set; }
    }
}