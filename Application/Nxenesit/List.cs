using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class List
    {
        public class Query : IRequest<List<Nxenesi>> {}

        public class Handler : IRequestHandler<Query, List<Nxenesi>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Nxenesi>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Nxenesit.ToListAsync();
            }

          
        }
    }
}