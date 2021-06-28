using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Nxenesit
{
    public class Details
    {
        public class Query : IRequest<Nxenesi>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Nxenesi>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Nxenesi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Nxenesit.FindAsync(request.Id);
            }
        }

    }
}