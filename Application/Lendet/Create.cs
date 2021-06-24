using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Lendet
{
    public class Create
    {
        public class Command : IRequest
        {
            public Lenda Lenda { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Lenda).SetValidator(new LendetValidator());
            }
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
                _context.Lendet.Add(request.Lenda);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}