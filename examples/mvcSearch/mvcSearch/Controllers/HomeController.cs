using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using mvcSearch.Models;

namespace mvcSearch.Controllers
{
    public class HomeController : Controller
    {
        private readonly static List<Product> Products = new List<Product>
            {
                new Product { OrderLineId=1, Name= "Pineapple", Price= 1.50, Quantity= 4 },
				new Product { OrderLineId= 2, Name= "Fresh Spring Onions", Price= 1.10, Quantity= 40 },
				new Product { OrderLineId= 3, Name= "Oranges", Price= 0.20, Quantity= 8 },
				new Product { OrderLineId= 4, Name= "Apples", Price= 1.50, Quantity= 5 },
				new Product { OrderLineId= 5, Name= "Raspberries", Price= 1.20, Quantity= 12 },
				new Product { OrderLineId= 6, Name= "Blueberries", Price= 1.50, Quantity= 20 },
				new Product { OrderLineId= 7, Name= "Pairs", Price= 1.50, Quantity= 8 },
				new Product { OrderLineId= 8, Name= "Melons", Price= 1.50, Quantity= 2 },
				new Product { OrderLineId= 9, Name= "Potatoes", Price= 1.50, Quantity= 6 },
				new Product { OrderLineId= 10, Name= "Sweet Potatoes", Price= 1.50, Quantity= 3 },
				new Product { OrderLineId= 11, Name= "Cabbages", Price= 1.50, Quantity= 1 },
				new Product { OrderLineId= 12, Name= "Lettuce", Price= 1.50, Quantity= 1 },
				new Product { OrderLineId= 13, Name= "Onions", Price= 1.50, Quantity= 25 },
				new Product { OrderLineId= 14, Name= "Carrots", Price= 1.50, Quantity= 30 },
				new Product { OrderLineId= 15, Name= "Broccoli", Price= 1.50, Quantity= 1 },
				new Product { OrderLineId= 16, Name= "Cauliflower", Price= 1.50, Quantity= 1 },
				new Product { OrderLineId= 17, Name= "Peas", Price= 1.50, Quantity= 1 },
				new Product { OrderLineId= 18, Name= "Sweetcorn", Price= 1.50, Quantity= 2 },
				new Product { OrderLineId= 19, Name= "Gooseberries", Price= 1.50, Quantity= 20 },
				new Product { OrderLineId= 20, Name= "Spring Onions", Price= 1.50, Quantity= 9 },
		        new Product { OrderLineId= 21, Name= "Beetroot", Price= 0.30, Quantity= 3 },
                new Product { OrderLineId= 22, Name= "Avocado", Price= 2.30, Quantity= 1 }
            };

        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public virtual JsonResult GridData(string organisationFriendlyName, string searchText, int page, int pageSize, string sortColumn, string sortOrder)
        {
            // If you are careful and validate the inputs Dynamic Linq can clean the below up
            IQueryable<Product> query = Products.AsQueryable();
            if (!String.IsNullOrWhiteSpace(searchText))
            {
                query = query.Where(x => x.Name.ToLower().Contains(searchText.ToLower()));
            }
            if (sortColumn == "Quantity")
            {
                query = sortOrder == "asc" ? query.OrderBy(x => x.Quantity) : query.OrderByDescending(x => x.Quantity);
            }
            else if (sortColumn == "Price")
            {
                query = sortOrder == "asc" ? query.OrderBy(x => x.Price) : query.OrderByDescending(x => x.Price);
            }
            else
            {
                query = sortOrder == "asc" ? query.OrderBy(x => x.Name) : query.OrderByDescending(x => x.Name);
            }

            int totalRows = query.Count();
            Product[] items = query.Skip(page*pageSize).Take(pageSize).ToArray();
            
            return Json(new
                            {
                                currentPage = items,
                                totalRows
                            }, JsonRequestBehavior.AllowGet);
        }
    }
}
