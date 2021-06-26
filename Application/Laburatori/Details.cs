using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
namespace Application.Laburatori
{
    public class Details
    {
        public class Query : IRequest<Laburatiori>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Laburatiori>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Laburatiori> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Laburatioret.FindAsync(request.Id);
            }
        }
    }
} 