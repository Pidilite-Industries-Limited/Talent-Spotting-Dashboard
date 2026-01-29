import { Link, useLocation } from "react-router-dom";
import { pascalToUrl } from "../utilities/helper";

function BreadcrumbChevron() {
  return (
    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[14px]">
      chevron_right
    </span>
  );
}

function BreadcrumbItem({ href, children, isCurrent }) {
  if (isCurrent) return <span className="text-slate-900 dark:text-slate-100 font-medium">{children}</span>;
  return (
    <Link to={href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
      {children}
    </Link>
  );
}

export default function Breadcrumbs({ navStructure }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  let crumbs = [];
  if (pathnames.length > 0) {
    const groupUrl = pathnames[0];
    const currentGroup = navStructure.find(g => pascalToUrl(g.name).toLowerCase() === groupUrl.toLowerCase());
    if (currentGroup) {
      crumbs.push({ label: currentGroup.label, href: `/${groupUrl}` });

      if (pathnames.length > 1) {
        const tabUrl = pathnames[1];
        const currentTab = currentGroup.tabs.find(t => pascalToUrl(t.name).toLowerCase() === tabUrl.toLowerCase());
        if (currentTab) {
          crumbs.push({ label: currentTab.label, href: `/${groupUrl}/${tabUrl}` });
        }
      }
    }
  }

  return (
    <nav aria-label="Breadcrumb">
      <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          {crumbs.map((c, index) => (
            <span key={c.href} className="flex items-center gap-2">
              <BreadcrumbChevron />
              <BreadcrumbItem href={c.href} isCurrent={index === crumbs.length - 1}>
                {c.label}
              </BreadcrumbItem>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
