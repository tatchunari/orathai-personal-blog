import AdminPanel from "@/components/ArticleManagement/AdminPanel"
import Articles from "./Articles"

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-4">
      {/* Left Panel */}
      <AdminPanel/>

      {/* Right Panel */}
      <div className="col-span-3">
        <Articles/>
      </div>
    </div>
  )
}

export default AdminDashboard