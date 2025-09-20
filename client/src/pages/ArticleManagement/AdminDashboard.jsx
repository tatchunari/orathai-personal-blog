import AdminPanel from "@/components/ArticleManagement/AdminPanel"
import Articles from "./Articles"
import CreateArticle from "./CreateArticle"
import EditArticle from "./EditArticle"
import Categories from "./Categories"
import Notifications from "./Notifications"
import Profile from "./Profile"
import ResetPassword from "./ResetPassword"
import { useState } from "react"

const AdminDashboard = () => {
  // Enhanced navigation state
  const [navigation, setNavigation] = useState({
    mainPage: "articles",
    subPage: null,
    params: null // for storing IDs, etc.
  });

  // Navigation helper functions
  const navigateToPage = (mainPage, subPage = null, params = null) => {
    setNavigation({ mainPage, subPage, params });
  };

  const goBack = () => {
    setNavigation(prev => ({ 
      ...prev, 
      subPage: null, 
      params: null 
    }));
  };

  // Main page renderer
  function renderMainPage() {
    switch (navigation.mainPage) {
      case "articles":
        return <Articles onNavigate={navigateToPage} />;
      case "categories":
        return <Categories onNavigate={navigateToPage} />;
      case "notifications":
        return <Notifications onNavigate={navigateToPage} />;
      case "profile":
        return <Profile onNavigate={navigateToPage} />;
      case "resetPassword":
        return <ResetPassword onNavigate={navigateToPage} />;
      default:
        return <Articles onNavigate={navigateToPage} />;
    }
  }

  // Subpage renderer
  function renderSubPage() {
    const { mainPage, subPage, params } = navigation;
    
    if (mainPage === "articles") {
      switch (subPage) {
        case "create":
          return <CreateArticle onBack={goBack} onNavigate={navigateToPage} />;
        case "edit":
          return <EditArticle articleId={params?.id} onBack={goBack} onNavigate={navigateToPage} />;
        default:
          return null;
      }
    }
    
    // Add other main page subpages here as needed
    if (mainPage === "categories") {
      switch (subPage) {
        case "create":
          return <CreateCategory onBack={goBack} />;
        default:
          return null;
      }
    }
    
    return null;
  }

  // Breadcrumb generator
  function getBreadcrumbs() {
    const { mainPage, subPage } = navigation;
    const breadcrumbs = [];
    
    // Main page breadcrumb
    const mainPageLabels = {
      articles: "Article Management",
      categories: "Category Management", 
      notifications: "Notifications",
      profile: "Profile",
      resetPassword: "Reset Password"
    };
    
    breadcrumbs.push({
      label: mainPageLabels[mainPage],
      onClick: () => goBack()
    });
    
    // Subpage breadcrumb
    if (subPage) {
      const subPageLabels = {
        create: "Create Article",
        edit: "Edit Article"
      };
      
      breadcrumbs.push({
        label: subPageLabels[subPage],
        onClick: null // Current page, no click
      });
    }
    
    return breadcrumbs;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Always Visible */}
      <div className="w-72 flex-shrink-0">
        <AdminPanel 
          onSelect={(mainPage) => navigateToPage(mainPage)} 
          activePage={navigation.mainPage}
        />
      </div>

      {/* Right Panel - Flexible Width */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumbs - Only show on subpages */}
        {navigation.subPage && (
          <div className="flex items-center gap-2 p-4 text-sm text-gray-600 border-b border-gray-200 bg-white">
            {getBreadcrumbs().map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                <button
                  onClick={crumb.onClick}
                  className={`${
                    crumb.onClick 
                      ? "text-blue-600 hover:underline cursor-pointer" 
                      : "text-gray-800 font-medium"
                  }`}
                  disabled={!crumb.onClick}
                >
                  {crumb.label}
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Page Content - Takes remaining space */}
        <div className="flex-1">
          {navigation.subPage ? renderSubPage() : renderMainPage()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard