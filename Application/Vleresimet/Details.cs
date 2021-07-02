using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vleresimet
{
    public class Details
    {
        public class Query : IRequest<Vleresimi>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Vleresimi>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Vleresimi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Vleresimi.FindAsync(request.Id);
            }
        }
    }
}