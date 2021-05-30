using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Postimet
{
    public class Details
    {
        public class Query : IRequest<Postimi>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Postimi>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            
            {
                _context = context;
            }

            public async Task<Postimi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Postimet.FindAsync(request.Id);
            }
        }
    }
}