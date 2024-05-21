import { User } from "phosphor-react";
import React from "react";
import moment from "moment/moment";

export default function Comments({ username, content, time }) {
  return (
    <div>
      <article className="p-6 mb-6 text-base bg-primary/30 rounded-lg border-b-2 dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center font-semibold">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <User
                className="mr-2 w-6 h-6 rounded-full"
                size={28}
                weight="bold"
              />
              {username}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex gap-x-5">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                {moment(time).fromNow()}
              </time>
              <time
                className="underline"
                dateTime="2022-02-08"
                title="February 8th, 2022"
              >
                {new Date(time).toLocaleString()}
              </time>
            </p>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
        </footer>
        <p className="text-gray-700 dark:text-gray-400">{content}</p>
      </article>
    </div>
  );
}
