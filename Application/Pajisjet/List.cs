using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
namespace Application.Pajisjet
{
    public class List
    {
        
        public class Query : IRequest<List<Pajisja>> { }
        public class Handler : IRequestHandler<Query, List<Pajisja>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Pajisja>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Pajisjet.ToListAsync();
            }
        }
    }
}
   