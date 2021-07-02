using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
namespace Application.Laburatori
{
    public class List
    {
        
        public class Query : IRequest<List<Laburatiori>> { }
        public class Handler : IRequestHandler<Query, List<Laburatiori>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Laburatiori>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Laburatioret.ToListAsync();
            }
        }
    }
}
   