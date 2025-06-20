import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-200">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Card wrapper using Daisy UI card */}
        <div className="card bg-base-300 shadow-xl rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold select-none">Profile</h1>
            <p className="mt-2 text-base-content/70 select-none">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <label
                htmlFor="avatar-upload"
                className={`btn btn-primary btn-circle btn-sm absolute bottom-0 right-0 p-2 hover:scale-105 transition-transform duration-200 ${
                  isUpdatingProfile ? "loading pointer-events-none" : "cursor-pointer"
                }`}
                title="Update Profile Picture"
              >
                {!isUpdatingProfile && <Camera className="w-5 h-5 text-white" />}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400 select-none">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400 select-none">
                <User className="w-5 h-5" />
                <span>Full Name</span>
              </div>
              <input
                type="text"
                readOnly
                value={authUser?.fullName || ""}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed select-text"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-zinc-400 select-none">
                <Mail className="w-5 h-5" />
                <span>Email Address</span>
              </div>
              <input
                type="email"
                readOnly
                value={authUser?.email || ""}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed select-text"
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-base-300 rounded-xl p-6 shadow-inner">
            <h2 className="text-lg font-semibold mb-4 select-none">Account Information</h2>
            <div className="space-y-3 text-sm select-none">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-success font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
