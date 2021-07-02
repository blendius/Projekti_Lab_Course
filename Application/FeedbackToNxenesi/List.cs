using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.FeedbackToNxenesit
{
    public class List
    {
        public class Query : IRequest<List<FeedbackToNxenesi>> { }
        public class Handler : IRequestHandler<Query, List<FeedbackToNxenesi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<FeedbackToNxenesi>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.FeedbackToNxenesit.ToListAsync();
            }
        }
    }
}