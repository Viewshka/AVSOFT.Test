// <auto-generated />
using AVSOFT.Test.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AVSOFT.Test.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220821144058_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AVSOFT.Test.Db.Entities.Counter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Key")
                        .HasColumnType("integer");

                    b.Property<int>("Value")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Counters");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Key = 1,
                            Value = 1
                        },
                        new
                        {
                            Id = 2,
                            Key = 1,
                            Value = 2
                        },
                        new
                        {
                            Id = 3,
                            Key = 1,
                            Value = 3
                        },
                        new
                        {
                            Id = 4,
                            Key = 2,
                            Value = 1
                        },
                        new
                        {
                            Id = 5,
                            Key = 2,
                            Value = 1
                        },
                        new
                        {
                            Id = 6,
                            Key = 2,
                            Value = 1
                        },
                        new
                        {
                            Id = 7,
                            Key = 2,
                            Value = 1
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
