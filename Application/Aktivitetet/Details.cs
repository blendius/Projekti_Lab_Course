using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Aktivitetet
{
    public class Details
    {
        public class Query : IRequest<Aktiviteti>
        {
            public Guid AktivitetiId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Aktiviteti>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            
            {
                _context = context;
            }

            public async Task<Aktiviteti> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Aktivitetet.FindAsync(request.AktivitetiId);
            }
        }
    }
}