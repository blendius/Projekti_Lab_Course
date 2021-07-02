using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Kontaktet
{
    public class ListPrindi
    {
        public class Query : IRequest<List<Kontakti>> {
            public string Id { get; set; }
         }
        public class Handler : IRequestHandler<Query, List<Kontakti>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Kontakti>> Handle(Query request, CancellationToken cancellationToken)
            {
             return await _context.Kontaktet.Where(k=>k.PrindiId==request.Id).ToListAsync();
                // return await _context.Kontaktet.ToListAsync();
            }
        }
    }
}