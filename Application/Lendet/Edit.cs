using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Lendet
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var lenda = await _context.Lendet.FindAsync(request.Lenda.LendaId);

                _mapper.Map(request.Lenda, lenda);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}