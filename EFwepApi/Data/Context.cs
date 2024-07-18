using EFwepApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EFwepApi.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
