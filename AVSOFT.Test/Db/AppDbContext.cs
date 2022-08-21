using System.Reflection;
using AVSOFT.Test.Db.Entities;
using Microsoft.EntityFrameworkCore;

namespace AVSOFT.Test.Db;

public class AppDbContext : DbContext
{
    public DbSet<Counter> Counters { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}