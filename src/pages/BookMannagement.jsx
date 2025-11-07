import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import TitleGenerate from "../hooks/TitleGenerate";

const BookMannagement = () => {
  return (
    <div className="w-full bg-gray-100 p-4 md:p-8">
<TitleGenerate title={"Mannage Books"} subtitle={"you can mannage you books form here"}/>
      {/* --- 1. ডেস্কটপ ভিউ (টেবিল) --- */}
      <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                File Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date Added
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {/* --- একটি মাত্র স্ট্যাটিক রো --- */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src="https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
                      alt="The 6-Day YouTube Accelerator"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      The 6-Day YouTube Accelerator
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                  E-Mail Course
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    Marketing
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    Social Media
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2.5 MB
              </td>
              <td className="px-6 py-4 whitespace-nowradp text-sm text-gray-500">
                October 1, 2025
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                  //   onClick={() => handleEdit(productId)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <HiPencil className="h-5 w-5" />
                  </button>
                  <button
                  //   onClick={() => handleDelete(productId)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <HiTrash className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
            {/* --- রো শেষ --- */}
          </tbody>
        </table>
      </div>

      {/* --- 2. মোবাইল ভিউ (কার্ড) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {/* --- একটি মাত্র স্ট্যাটিক কার্ড --- */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded-lg object-cover"
              src="https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg"
              alt="The 6-Day YouTube Accelerator"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                The 6-Day YouTube Accelerator
              </h3>
              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                E-Mail Course
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
              Marketing
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
              Social Media
            </span>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <p>
              <strong>Size:</strong> 2.5 MB
            </p>
            <p>
              <strong>Added:</strong> October 1, 2025
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t pt-3">
            <button
              //   onClick={() => handleEdit(productId)}
              className="flex items-center gap-1 rounded-md bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100"
            >
              <HiPencil className="h-4 w-4" />
              Edit
            </button>
            <button
              //   onClick={() => handleDelete(productId)}
              className="flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              <HiTrash className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
        {/* --- কার্ড শেষ --- */}
      </div>
    </div>
  );
};

export default BookMannagement;
