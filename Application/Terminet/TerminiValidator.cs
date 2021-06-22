using Domain;
using FluentValidation;

namespace Application.Terminet
{
    public class TerminiValidator : AbstractValidator<Termini>
    {
        public TerminiValidator()
        {
            RuleFor(x=> x.DataFillimit).NotEmpty();
            RuleFor(x=> x.DataMbarimit).NotEmpty();
            RuleFor(x=> x.KohaMbajtjes).NotEmpty();
            RuleFor(x=> x.Salla).NotEmpty();
        }
    }
}