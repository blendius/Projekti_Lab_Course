using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Njoftimet
{
    public class Details
    {
        public class Query : IRequest<Njoftimi>
        {
            public Guid NjoftimiId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Njoftimi>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<Njoftimi> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Njoftimet.FindAsync(request.NjoftimiId);
            }
        }
    }
}