using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.ProfKlasa
{
    public class ListProfKlasa
    {
        public class Query : IRequest<List<ProfesoriKlasa>> {
            public string Id { get; set; }
         }
        public class Handler : IRequestHandler<Query, List<ProfesoriKlasa>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ProfesoriKlasa>> Handle(Query request, CancellationToken cancellationToken)
            {
             return await _context.ProfesoriKlasa.Where(k=>k.ProfId==request.Id).ToListAsync();
            }
        }
    }
}