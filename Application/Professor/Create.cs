using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Professor
{
    public class Create
    {
        private readonly UserManager<Profesori> _userManagerProf;

        public class Command : IRequest
        {
            public Profesori Profesori { get; set; }
            public string LendaEmri { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var lenda = await _context.Lendet.FirstOrDefaultAsync(x => x.EmriLendes == request.LendaEmri);

                request.Profesori.Lenda = lenda;

               // var result = await _userManagerProf.CreateAsync(prof, registerDto.Password);

                _context.Profesoret.Add(request.Profesori);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}