   using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Terminet
{
    public class Details
    {
        public class Query : IRequest<Result<Termini>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Termini>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Termini>> Handle(Query request, CancellationToken cancellationToken)
            {
                var termini = await _context.Terminet.FindAsync(request.Id);
                return Result<Termini>.Success(termini);
            }
        }
    }
}