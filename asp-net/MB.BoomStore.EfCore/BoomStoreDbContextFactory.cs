using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace MB.BoomStore.EfCore
{
    internal class BoomStoreDbContextFactory : IDesignTimeDbContextFactory<BoomStoreDbContext>
    {
        public BoomStoreDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<BoomStoreDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=BoomStore;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new BoomStoreDbContext(optionsBuilder.Options);
        }
    }
}
