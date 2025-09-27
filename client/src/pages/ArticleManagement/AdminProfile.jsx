import AdminPanel from '@/components/ArticleManagement/AdminPanel'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/authentication';
import { useRef } from 'react';
import axios from 'axios';


const AdminProfile = () => {

  const { state } = useAuth();
  // console.log("Profile data from useAuth", state, state.profile);

  const nameInputRef = useRef();
  const bioInputRef = useRef();

  const handleUpdateAdminProfile = async () => {
    const updateProfileValue = {
      name: nameInputRef.current.value,
      bio: bioInputRef.current.value
    }
      try {
        const response = await axios.put(
          `https://orathai-personal-blog-backend.vercel.app/profiles/${state.profile.id}`,
          updateProfileValue
        );
        console.log(response)
      } catch (err) {
        console.error("Edit Profile failed:", err);
      } 
    }
    // console.log("Update Profile value", updateProfileValue);


  return (
    <div className='flex h-screen'>
      <AdminPanel/>

      {/* Main Admin Profile Section */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <Button 
          className="px-8 py-2 rounded-full bg-black text-white"
          onClick={() => handleUpdateAdminProfile()}
          >
            Save
            </Button>
        </div>

        <form>
          <div className="flex items-center mb-6">
            <label for="fileInput" className="border bg-white text-sm w-35 h-35 border-gray-500 py-10 mr-4 flex flex-col rounded-full items-center gap-4  cursor-pointer">
                <p className="text-gray-500">+</p>
                <p className="text-gray-500">Upload Image</p>
                <input name="fileInput" type="file" className="hidden" />
            </label>
            <Button className="border-1 border-black text-black rounded-full font-normal">Upload profile picture</Button>
          </div>

          <div className="space-y-7 max-w-2xl">
            <div>
              <label htmlFor="name">Full Name</label>
              <Input
                id="name"
                defaultValue={state.profile.name}
                ref={nameInputRef}
                className="mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                defaultValue={state.profile.username}
                disabled
                className="mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                defaultValue={state.profile.email}
                disabled
                className="mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio (max 120 letters)</label>
              <Textarea
                id="bio"
                ref={bioInputRef}
                defaultValue={state.profile.bio}
                rows={10}
                className="mt-1 py-3 border-[#DAD6D1] rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AdminProfile