import React from "react";

export default function ChangPassWord() {
  return (
    <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
      {/* sidebar */}
      <div className="col-span-3">
        {/* account profile */}
        <div className="px-4 py-3 shadow flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src="images/avatar.png"
              className="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"
            />
          </div>
          <div>
            <p className="text-gray-600">Hello,</p>
            <h4 className="text-gray-800 capitalize font-medium">
              Russell Ahmed
            </h4>
          </div>
        </div>
        {/* account profile end */}
        {/* profile links */}
        <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
          {/* single link */}
          <div className="space-y-1 pl-8">
            <a
              href="account.html"
              className="relative text-base font-medium capitalize hover:text-primary transition block"
            >
              Manage account
              <span className="absolute -left-8 top-0 text-base">
                <i className="far fa-address-card" />
              </span>
            </a>
            <a
              href="profile-info.html"
              className="hover:text-primary transition capitalize block"
            >
              Profile information
            </a>
            <a
              href="manage-address.html"
              className="hover:text-primary transition capitalize block"
            >
              Manage address
            </a>
            <a
              href="change-password.html"
              className="hover:text-primary transition capitalize block text-primary"
            >
              change password
            </a>
          </div>
          {/* single link end */}
          {/* single link */}
          <div className="space-y-1 pl-8 pt-4">
            <a
              href="#"
              className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              My order history
              <span className="absolute -left-8 top-0 text-base">
                <i className="fas fa-gift" />
              </span>
            </a>
            <a
              href="#"
              className="hover:text-primary transition block capitalize"
            >
              my returns
            </a>
            <a
              href="#"
              className="hover:text-primary transition block capitalize"
            >
              my cancellations
            </a>
            <a
              href="#"
              className="hover:text-primary transition block capitalize"
            >
              my reviews
            </a>
          </div>
          {/* single link end */}
          {/* single link */}
          <div className="space-y-1 pl-8 pt-4">
            <a
              href="#"
              className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              Payment methods
              <span className="absolute -left-8 top-0 text-base">
                <i className="far fa-credit-card" />
              </span>
            </a>
            <a
              href="#"
              className="hover:text-primary transition block capitalize"
            >
              Voucher
            </a>
          </div>
          {/* single link end */}
          {/* single link */}
          <div className="pl-8 pt-4">
            <a
              href="wishlist.html"
              className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              my wishlist
              <span className="absolute -left-8 top-0 text-base">
                <i className="far fa-heart" />
              </span>
            </a>
          </div>
          {/* single link end */}
          {/* single link */}
          <div className="pl-8 pt-4">
            <a
              href="#"
              className="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              logout
              <span className="absolute -left-8 top-0 text-base">
                <i className="fas fa-sign-out-alt" />
              </span>
            </a>
          </div>
          {/* single link end */}
        </div>
        {/* profile links end */}
      </div>
      {/* sidebar end */}
      {/* account content */}
      <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
        <form action>
          <h3 className="text-lg font-medium capitalize mb-4">
            Change password
          </h3>
          <div className="space-y-4 max-w-sm">
            <div>
              <label className="text-gray-600 mb-2 block">
                Current Password
              </label>
              <div className="relative">
                <span className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                  <i className="far fa-eye-slash" />
                </span>
                <input
                  type="text"
                  className="input-box"
                  placeholder="enter current password"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">New Password</label>
              <div className="relative">
                <span className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                  <i className="far fa-eye-slash" />
                </span>
                <input
                  type="text"
                  className="input-box"
                  placeholder="enter new password"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                  <i className="far fa-eye-slash" />
                </span>
                <input
                  type="text"
                  className="input-box"
                  placeholder="enter confirm password"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
            >
              Save change
            </button>
          </div>
        </form>
      </div>
      {/* account content end */}
    </div>
  );
}
