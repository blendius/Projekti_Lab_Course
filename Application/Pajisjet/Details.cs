using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
namespace Application.Pajisjet
{
    public class Details
    {
        public class Query : IRequest<Pajisja>
        {
            public Guid PajisjaId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Pajisja>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Pajisja> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Pajisjet.FindAsync(request.PajisjaId);
            }
        }
    }
} 