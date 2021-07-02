
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.FeedbackToNxenesit
{

    public class Create
    {
        public class Command : IRequest
        {
            public FeedbackToNxenesi FeedbackToNxenesi { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IProfessoriAccesor _professoriAccesor;
            public Handler(DataContext context, IProfessoriAccesor professoriAccesor)
            {
                _professoriAccesor = professoriAccesor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var profesori = await _context.Profesoret.FirstOrDefaultAsync(x => x.UserName == _professoriAccesor.GetUsername());

                 request.FeedbackToNxenesi.Profesori =profesori; 

                 _context.FeedbackToNxenesit.Add(request.FeedbackToNxenesi);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}