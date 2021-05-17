using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class PostimetController : BaseApiController
    {
        private DataContext _context;
        public PostimetController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<Postimi>>> GetPostimet()
        {
            return await _context.Postimet.ToListAsync();
        }
        [HttpGet("{id}")] //postimi/id
        public async Task<ActionResult<Postimi>> GetPostimi(Guid id)
        {
            return await _context.Postimet.FindAsync(id);
        }
    }
}