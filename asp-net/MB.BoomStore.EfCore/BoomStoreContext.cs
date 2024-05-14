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
                .HasKey(op => new { op.OrderId, op.ProductId });

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(bc => bc.ProductId);
        }
    }
}
