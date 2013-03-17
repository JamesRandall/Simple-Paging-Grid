namespace mvcSearch.Models
{
    public class Product
    {
        public int OrderLineId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}