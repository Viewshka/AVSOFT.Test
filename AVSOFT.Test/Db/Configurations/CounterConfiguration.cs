using AVSOFT.Test.Db.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AVSOFT.Test.Db.Configurations;

public class CounterConfiguration : IEntityTypeConfiguration<Counter>
{
    public void Configure(EntityTypeBuilder<Counter> builder)
    {
        builder.HasData(new List<Counter>
        {
            new(1, 1, 1),
            new(2, 1, 2),
            new(3, 1, 3),
            new(4, 2, 1),
            new(5, 2, 1),
            new(6, 2, 1),
            new(7, 2, 1)
        });
    }
}