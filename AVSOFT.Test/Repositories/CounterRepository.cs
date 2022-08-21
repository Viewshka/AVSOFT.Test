using AVSOFT.Test.Db;
using AVSOFT.Test.Db.Entities;
using AVSOFT.Test.Models;
using Microsoft.EntityFrameworkCore;

namespace AVSOFT.Test.Repositories;

public class CounterRepository
{
    private readonly AppDbContext _context;

    public CounterRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Counter>> GetCountersAsync(int skip, int take)
    {
        return await _context.Counters
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }

    public async Task<Counter> AddCounterAsync(CounterDto counter)
    {
        var newCounter = new Counter(counter.Key, counter.Value);

        await _context.Counters.AddAsync(newCounter);
        await _context.SaveChangesAsync();

        return newCounter;
    }

    public async Task<int> GetPageCountAsync(int recordCount)
    {
        var countersCount = await _context.Counters.CountAsync();

        return (int) Math.Ceiling((double) countersCount / recordCount);
    }
}