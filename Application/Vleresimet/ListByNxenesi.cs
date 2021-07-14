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
    public class ListByNxenesi
    {
        public class Query : IRequest<List<Vleresimi>> { 
            public string nxenesiId { get; set; }
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
                return await _context.Vleresimi.Where(k=>k.NxenesiId == request.nxenesiId).ToListAsync();
            }
        }
    }
}