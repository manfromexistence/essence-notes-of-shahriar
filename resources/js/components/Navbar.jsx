import { MenuIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [siteTitle, setSiteTitle] = useState("Shahriar Khan");
  const [loading, setLoading] = useState(true);
  const location = { pathname: window.location.pathname };

  // Fetch dynamic menu items and site title from API
  useEffect(() => {
    fetch("/api/menu")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data) {
          setMenuItems(data.data);
        }
        if (data.site_title) {
          setSiteTitle(data.site_title);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load menu items:", error);
        setLoading(false);
      });
  }, []);

  // Fallback static menu items if API fails or returns empty
  const defaultMenuItems = [
    { label: "Home", url: "/home" },
    { label: "About Me", url: "/aboutme" },
    { label: "Blogs", url: "/blogs" },
    { label: "Books", url: "/books" },
    { label: "Contact", url: "/contact" },
    { label: "Donations", url: "/donations" },
    { label: "Events", url: "/events" },
    { label: "Entepreneourship", url: "/entrepreneurship" },
    { label: "Life Events", url: "/life-events" },
    { label: "Technology", url: "/technology" },
    { label: "Videos", url: "/videos" },
  ];

  const displayMenuItems = menuItems.length > 0 ? menuItems : defaultMenuItems;

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getTextColor = () => {
    if (location.pathname === "/") return "text-slate-950";
    if (location.pathname === "/home") return "text-black";
    if (location.pathname === "/aboutme") return "text-slate-950";
    if (location.pathname === "/life-events") return "text-slate-950";
    if (location.pathname === "/entrepreneurship") return "text-slate-950";
    if (location.pathname === "/technology") return "text-slate-950";
    if (location.pathname === "/donations") return "text-slate-950";
    if (location.pathname === "/contact") return "text-white";
    return "text-black";
  };

  const getIconColor = () => {
    if (location.pathname === "/") return "text-slate-950";
    if (location.pathname === "/aboutme") return "text-slate-950";
    if (location.pathname === "/life-events") return "text-slate-950";
    if (location.pathname === "/entrepreneurship") return "text-slate-950";
    if (location.pathname === "/technology") return "text-slate-950";
    if (location.pathname === "/donations") return "text-slate-900";
    if (location.pathname === "/contact") return "text-white";
    return "text-black";
  };

  return (
    <div className={``}>
      <div className={`py-6 w-11/12 mx-auto`}>
        <div className="flex items-center justify-between">
          <a href="/">
            <div className={`text-4xl special-text ${getTextColor()}`}>
              {siteTitle}
            </div>
          </a>
          <div>
            <p
              className={`text-4xl cursor-pointer px-4 py-2 rounded-lg`}
              onClick={toggleDrawer}
            >
              <MenuIcon className={`h-8 w-8 ${getIconColor()}`} />
            </p>
          </div>
        </div>

        {/* Drawer */}
        <div
          className={`fixed top-0 right-0 w-3/4 lg:w-2/5 h-full bg-white text-slate-900 p-0 transform transition-transform ${drawerOpen ? "translate-x-0" : "translate-x-full"
            } z-50`}
        >
          <div className="flex justify-end">
            <button
              className="text-4xl text-slate-950 cursor-pointer"
              onClick={toggleDrawer}
            >
              <X className="h-8 w-8 text-black" />
            </button>
          </div>
          <div className="mt-10 text-3xl font-medium md:px-20 px-10">
            <ul>
              {loading ? (
                <li className="mb-6 text-slate-400 animate-pulse">Loading menu...</li>
              ) : (
                displayMenuItems.map((item, index) => (
                  <a
                    key={item.id || index}
                    href={item.url}
                    target={item.target || "_self"}
                    onClick={toggleDrawer}
                    className={
                      location.pathname === item.url
                        ? "text-blue-500 font-bold"
                        : "text-black hover:text-blue-500"
                    }
                  >
                    <li className="mb-6">{item.label}</li>
                    {/* Render child menu items if any */}
                    {item.children && item.children.length > 0 && (
                      <ul className="pl-6 text-xl">
                        {item.children.map((child, childIndex) => (
                          <a
                            key={child.id || childIndex}
                            href={child.url}
                            target={child.target || "_self"}
                            onClick={(e) => e.stopPropagation()}
                            className={
                              location.pathname === child.url
                                ? "text-blue-500 font-bold"
                                : "text-slate-600 hover:text-blue-500"
                            }
                          >
                            <li className="mb-4">{child.label}</li>
                          </a>
                        ))}
                      </ul>
                    )}
                  </a>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
