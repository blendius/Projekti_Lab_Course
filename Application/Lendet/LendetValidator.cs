using Domain;
using FluentValidation;

namespace Application.Lendet
{
    public class LendetValidator : AbstractValidator<Lenda>
    {
        public LendetValidator()
        {
            RuleFor(x => x.EmriLendes).NotEmpty();
            RuleFor(x => x.Pershkrimi).NotEmpty();
            RuleFor(x => x.DataEShtimit).NotEmpty();
        }
    }
}