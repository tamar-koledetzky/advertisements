using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Repository.Entities
{
    public class WordCategory
    {
        public int Id { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        [ForeignKey("Word")]
        public int WordId { get; set; }
        public virtual Word Word { get; set; }
        public int Weight { get; set; }

        public WordCategory(int categoryId, int WordId)
        {
            this.CategoryId = categoryId;
            this.WordId = WordId;
            this.Weight = 1;
        }

    }
}
