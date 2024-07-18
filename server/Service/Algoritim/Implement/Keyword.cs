using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Service.Algoritim.ResponseData
{
    public class Keyword
    {
        public string Word { get; set; }
        public int DocumentFrequency { get; set; }
        public List<string> PosTags { get; set; } // אפשר לשנות את הסוג לסוג מתאים
        public int Score { get; set; }

    }
}
