export default function ProfileTab() {
  return (
    <div className="w-full px-6 py-4">

      {/* Top card */}
      <div className="bg-white shadow-sm rounded-xl p-6 mb-6 border">
        <div className="flex items-start gap-6">

          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-3xl">
              <span>👤</span>
            </div>
            <button className="text-sm text-indigo-600 mt-2">Change photo</button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6 w-full">
            <div>
              <p className="text-sm font-medium mb-1">Full name</p>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue="Anita Kam"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Username</p>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue="Nita"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Email</p>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue="Anitakam@gmail.com"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Location</p>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 text-sm"
                defaultValue="Lagos"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white shadow-sm rounded-xl p-6 border">
        <h3 className="font-semibold mb-6">Account Security</h3>

        {/* Change Password */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-sm">Change Password</p>
            <p className="text-xs text-gray-500">Last updated 3 months ago</p>
          </div>
          <button className="px-4 py-1.5 border rounded-md text-sm">
            Update
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between py-3 border-t">
          <div>
            <p className="font-medium text-sm">Two-Factor Authentication</p>
            <p className="text-xs text-gray-500">Add an extra layer of security</p>
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:bg-indigo-500 transition-all
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-all
                  peer-checked:after:translate-x-5">
            </div>
          </label>
        </div>

        {/* Login Sessions */}
        <div className="flex items-center justify-between py-3 border-t">
          <div>
            <p className="font-medium text-sm">Login Sessions</p>
            <p className="text-xs text-gray-500">Manage your active sessions</p>
          </div>
          <button className="px-4 py-1.5 border rounded-md text-sm">
            Update
          </button>
        </div>
      </div>

      {/* Logout */}
      <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md">
        Log out
      </button>
    </div>
  );
}
