using System.Web.Optimization;

namespace mvcSearch
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/handlebars-1.0.rc.1.js",
                        "~/Scripts/simplePagingGrid-0.6.0.0.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/bootstrap/bootstrap.css"));
        }
    }
}