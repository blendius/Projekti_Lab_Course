using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Nxenesit
{
    public class ListByClass
    {
        public class Query : IRequest<List<Nxenesi>> {
            public string EmriKlases { get; set; }
         }
        public class Handler : IRequestHandler<Query, List<Nxenesi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Nxenesi>> Handle(Query request, CancellationToken cancellationToken)
            {
             return await _context.Nxenesit.Where(k=>k.Class ==request.EmriKlases).ToListAsync();
            }
        }
    }
}