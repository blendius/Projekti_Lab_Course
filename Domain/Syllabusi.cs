using System;
using System.Collections.Generic;

namespace Domain
{
    public class Syllabusi
    {
        public Guid SyllabusiId { get; set; }
        public string EmriSyllabusit { get; set; }
        public string LinkuISyllabusit { get; set; }
        public DateTime DataEKrijimit { get; set; } = DateTime.Now;

        public ICollection<Lenda> Lendet {get;set;} 
    }
}