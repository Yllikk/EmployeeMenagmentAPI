using EmployeeManagmentAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagmentAPI.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Employee> employees { get; set; }
        public DbSet<RegisterReqUsers> registerReqUsers { get; set; }

        public DbSet<Work> UserWork { get; set; }
    }
}
