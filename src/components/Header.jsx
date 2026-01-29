import NavBar from "./NavBar";
import Breadcrumbs from "./Breadcrumbs";
import UserActions from "./UserActions";
import { pascalToLabel, pascalToUrl } from "../utilities/helper";
import { tabConfig } from "../tabConfig";

const pages = import.meta.glob('../pages/**/**/*.jsx');
function buildNavStructure(pages) {
  const navMap = {};

  Object.keys(pages).forEach((filePath) => {
    // if(filePath.split("/").length > 3) {
      const [group, tab] = filePath.replace('../pages/', '').replace('.jsx', '').split('/');

      if (!navMap[group]) {
        navMap[group] = {
          name: group,
          label: pascalToLabel(group),
          icon: tabConfig[group]?.icon,
          url: pascalToUrl(group),
          tabs: [],
        };
      }

      navMap[group].tabs.push({
        name: tab,
        label: pascalToLabel(tab),
        subtitle: tabConfig[group]?.tabs?.[tab]?.subtitle,
        icon: tabConfig[group]?.tabs?.[tab]?.icon,
        url: pascalToUrl(tab),
        importFn: pages[filePath],
      });
    }
  //  }
  );

  return Object.values(navMap);
}

export default function Header() {
  const navStructure = buildNavStructure(pages);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <NavBar navStructure={navStructure} />
        <UserActions/>
      </div>
      <Breadcrumbs navStructure={navStructure} />
    </header>
  );
}
