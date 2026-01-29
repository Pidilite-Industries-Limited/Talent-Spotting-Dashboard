import React, { Suspense, lazy, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { pascalToUrl } from "./utilities/helper";
import { DataContext } from "./utilities/DataProvider.jsx";
import RequireAuth from "./utilities/RequireAuth.jsx";

const pages = import.meta.glob('./pages/**/**/*.jsx');

function generateRoutes(pages) {
  const routes = [];
  let path;
  Object.keys(pages).forEach((filePath) => {
    // if(filePath.split("/").length <= 3) {
    //   const [pagePath] = filePath.replace('./pages/', '').replace('.jsx', '').split('/');
    //   path = `/${pascalToUrl(pagePath)}`
    // }
    // else {
      const [group, tab] = filePath.replace('./pages/', '').replace('.jsx', '').split('/');
      path = `/${pascalToUrl(group)}/${pascalToUrl(tab)}`;
    // }
    // if(path.includes('talent-spotting/talent-profile')) {
    //   routes.push(
    //     <Route
    //       key="/talent-spotting/talent-profile"
    //       path="/talent-spotting/talent-profile" // Default route redirects to first employee
    //       element={<Navigate to={`/talent-spotting/talent-profile/employee/${employees[0]?.id}`} />}
    //     />
    //   );

    //   const Component = lazy(() => import('./pages/TalentSpotting/TalentProfile.jsx'));
    //   routes.push(
    //       <Route
    //         key="/talent-spotting/talent-profile/employee/:empId" // This is the dynamic route for employee
    //         path="/talent-spotting/talent-profile/employee/:empId" // This defines the dynamic part of the route
    //         element={
    //           <Suspense fallback={<div>Loading...</div>}>
    //             <Component />
    //           </Suspense>
    //         }
    //       />
    //     );
    // }
    // else 
    {
      const Component = lazy(pages[filePath]);  // Default lazy load for other pages
      routes.push(
        <Route key={path} path={path} element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>}/>
      );
    }
  });
  return routes;
}

export default function App() {
  const { data: employees } = useContext(DataContext);
  const ProfilePage = lazy(() => import('./pages/TalentSpotting/TalentProfile.jsx'));
  return (
    // <BrowserRouter>
    <RequireAuth>
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          {/* <Route
             key="/talent-spotting/talent-profile"
             path="/talent-spotting/talent-profile" // Default route redirects to first employee
             element={<Navigate to={`/talent-spotting/talent-profile/employee/${employees[0]?.id}`} />}
           /> */}
          <Route
            key="/talent-spotting/talent-profile/employee/:empId" // This is the dynamic route for employee
            path="/talent-spotting/talent-profile/employee/:empId" // This defines the dynamic part of the route
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProfilePage />
              </Suspense>
            }
          />
          {generateRoutes(pages)}
        </Routes>
      </main>
    </RequireAuth>
    // </BrowserRouter>
  );
}
