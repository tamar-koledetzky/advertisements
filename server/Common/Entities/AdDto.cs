﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewsProject.Common.Entities
{
    public class AdDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
        public int? CategoryId { get; set; }
        public DateTime? Date { get; set; }


    }
}
