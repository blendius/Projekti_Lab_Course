using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Autobusat
{
    public class Details
    {
        public class Query : IRequest<Autobusi>
        {
            public string targatId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Autobusi>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            
            {
                _context = context;
            }

            public async Task<Autobusi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Autobusat.FindAsync(request.targatId);
            }
        }
    }
}