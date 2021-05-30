
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Postimet
{
    public class List
    {
        public class Query : IRequest<List<Postimi>>{}

        public class Handler : IRequestHandler<Query, List<Postimi>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Postimi>> Handle(Query request, CancellationToken cancellationToken)
            {
                // try{
                //     for(var i = 0 ;i<10 ; i++){
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000,cancellationToken);
                //         _logger.LogInformation($"Task{i}has Completed!");
                //     }
                // }catch(Exception ex) when(ex is TaskCanceledException){
                //     _logger.LogInformation("Task was cancelled!");
                // }
                return await _context.Postimet.ToListAsync();
            }
        }
    }
}