using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Paralelet
{
    public class List
    {
        public class Query : IRequest<List<Paralelja>> { }
        public class Handler : IRequestHandler<Query, List<Paralelja>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Paralelja>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Paralelet.ToListAsync();
            }
        }
    }
}