using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vleresimet
{
    public class GetNxenesiById
    {
        public class Query : IRequest<Familja[]>
        {
            public string prindiId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Familja[]>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Familja[]> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Familjet.Where(k=>k.PrindiId == request.prindiId).ToArrayAsync();
            }
        }
    }
}