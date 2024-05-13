using MB.BoomStore.Entities.Categories;
using MB.BoomStore.Entities.Customers;
using MB.BoomStore.Entities.Orders;
using MB.BoomStore.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace MB.BoomStore.EfCore
{
    public class BoomStoreContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        public BoomStoreContext(DbContextOptions<BoomStoreContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>()
                .HasKey(bc => new { bc.OrderId, bc.ProductId });

            modelBuilder.Entity<OrderProduct>()
                .HasOne(bc => bc.Order)
                .WithMany(b => b.OrderProducts)
                .HasForeignKey(bc => bc.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(bc => bc.Product)
                .WithMany(c => c.OrderProducts)
                .HasForeignKey(bc => bc.ProductId);
        }
    }
}
