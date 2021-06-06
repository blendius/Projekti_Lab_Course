using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Terminet
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Termini Termini { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Termini).SetValidator(new TerminiValidator());
            }
        }
        public class Handler : IRequestHandler<Command , Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Terminet.Add(request.Termini);

                var result =await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create termini");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}