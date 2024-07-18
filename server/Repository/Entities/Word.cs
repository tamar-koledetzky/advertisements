using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Repository.Entities
{
    public class Word
    {
        public int Id { get; set; }
        public string word { get; set; }
        public Word(string word)
        {
            this.word = word;
        }
    }
}
