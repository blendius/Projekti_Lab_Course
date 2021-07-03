using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Vleresimet
{
    public class List
    {
        public class Query : IRequest<List<Vleresimi>> { 
            public string profId { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<Vleresimi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Vleresimi>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vleresimi.Where(k=>k.ProfesoriId == request.profId).ToListAsync();
            }
        }
    }
}