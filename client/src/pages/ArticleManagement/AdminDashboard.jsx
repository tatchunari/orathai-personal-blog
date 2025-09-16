import AdminPanel from "@/components/ArticleManagement/AdminPanel"
import Articles from "./Articles"
import Categories from "./Categories"
import Notifications from "./Notifications"
import Profile from "./Profile"
import ResetPassword from "./ResetPassword"
import { useState } from "react"

const AdminDashboard = () => {

  const [activePage, setActivePage] = useState("articles");

  function renderPage() {
    switch (activePage) {
      case "articles":
        return <Articles />;
      case "categories":
        return <Categories />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile />;
      case "resetPassword":
        return <ResetPassword />;
      default:
        return <Articles />;
    }
  }

  return (
    <div className="grid grid-cols-4">
      {/* Left Panel */}
      <AdminPanel onSelect={setActivePage} activePage={activePage} />

      {/* Right Panel */}
      <div className="col-span-3">
        {renderPage()}
      </div>
    </div>
  )
}

export default AdminDashboard