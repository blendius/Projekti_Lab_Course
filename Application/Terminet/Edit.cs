using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Terminet
{
    public class Edit
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
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var termini = await _context.Terminet.FindAsync(request.Termini.Id);

                if(termini == null){
                    return null;
                }
                _mapper.Map(request.Termini,termini);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update termini");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}