import React, { useState } from "react";
import TitleGenerate from "../hooks/TitleGenerate";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/Axios";
import toast from "react-hot-toast";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onsubmit = async (data) => {
    setLoading(true);
    try {
      // formatting data for backend
      const formattedData = {
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        icon: data.icon,
        cover_image: data.cover_image,
        short_description: data.short_description,
        long_description: data.long_description,

        stats: {
          pages: Number(data.stats.pages),
          words: data.stats.words,
          size: data.stats.size,
        },

        file_details: {
          type: data.file_details.type,
          size: data.stats.size,
        },

        // converting comma-separated strings to arrays
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        whats_inside: data.whats_inside
          ? data.whats_inside.split(",").map((t) => t.trim())
          : [],
        usage_rights: data.usage_rights
          ? data.usage_rights.split(",").map((t) => t.trim())
          : [],
      };

      const response = await axiosInstance.post("/books", formattedData);

      if (response.status === 201 || response.data.success) {
        toast.success("Book added successfully!");
        reset();
      }
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Failed to add book";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const inputClass =
    "w-full rounded-md border border-gray-300 p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";
  return (
    <section>
      <TitleGenerate
        title={"Books Zone"}
        subtitle={"Add another new book for your website"}
      />
      <section name="form">
        <form
          onSubmit={handleSubmit(onsubmit)}
          noValidate
          className="w-full max-w-3xl mx-auto rounded-xl bg-white p-8 shadow-2xl"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Add New Book
          </h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
            {/* Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className={labelClass}>
                Title
              </label>
              <input
                id="title"
                type="text"
                className={inputClass}
                placeholder="e.g., The 6-Day YouTube Accelerator"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Subtitle */}
            <div className="md:col-span-2">
              <label htmlFor="subtitle" className={labelClass}>
                Subtitle (Optional)
              </label>
              <input
                id="subtitle"
                type="text"
                className={inputClass}
                placeholder="A short subtitle for the product"
                {...register("subtitle")}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>
              <select
                id="category"
                className={inputClass}
                {...register("category", { required: "Category is required" })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="E-Mail Course">E-Mail Course</option>
                <option value="E-Book">E-Book</option>
                <option value="Video Course">Video Course</option>
              </select>
              {errors.category && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Icon */}
            <div>
              <label htmlFor="icon" className={labelClass}>
                Icon Name (Optional)
              </label>
              <input
                id="icon"
                type="text"
                className={inputClass}
                placeholder="e.g., mail, book, video"
                {...register("icon")}
              />
            </div>

            {/* Cover Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="cover_image" className={labelClass}>
                Cover Image URL
              </label>
              <input
                id="cover_image"
                type="url"
                className={inputClass}
                placeholder="https://example.com/image.jpg"
                {...register("cover_image", {
                  required: "Image URL is required",
                })}
              />
              {errors.cover_image && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.cover_image.message}
                </span>
              )}
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <label htmlFor="short_description" className={labelClass}>
                Short Description
              </label>
              <textarea
                id="short_description"
                rows="3"
                className={inputClass}
                placeholder="A brief summary of the product..."
                {...register("short_description", {
                  required: "Short description is required",
                })}
              ></textarea>
              {errors.short_description && (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.short_description.message}
                </span>
              )}
            </div>

            {/* Long Description */}
            <div className="md:col-span-2">
              <label htmlFor="long_description" className={labelClass}>
                Long Description (Optional)
              </label>
              <textarea
                id="long_description"
                rows="5"
                className={inputClass}
                placeholder="Detailed description..."
                {...register("long_description")}
              ></textarea>
            </div>

            {/* --- Stats Section --- */}
            <fieldset className="rounded-lg border border-gray-300 p-4 md:col-span-2">
              <legend className="px-2 text-sm font-medium text-gray-700">
                Product Stats
              </legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="stats.pages" className={labelClass}>
                    Pages
                  </label>
                  <input
                    id="stats.pages"
                    type="number"
                    className={inputClass}
                    placeholder="25"
                    {...register("stats.pages", { valueAsNumber: true })}
                  />
                </div>
                <div>
                  <label htmlFor="stats.words" className={labelClass}>
                    Words
                  </label>
                  <input
                    id="stats.words"
                    type="text"
                    className={inputClass}
                    placeholder="5,000"
                    {...register("stats.words")}
                  />
                </div>
                <div>
                  <label htmlFor="stats.size" className={labelClass}>
                    File Size
                  </label>
                  <input
                    id="stats.size"
                    type="text"
                    className={inputClass}
                    placeholder="2.5 MB"
                    {...register("stats.size")}
                  />
                </div>
              </div>
            </fieldset>

            {/* --- File Details --- */}
            <fieldset className="rounded-lg border border-gray-300 p-4 md:col-span-2">
              <legend className="px-2 text-sm font-medium text-gray-700">
                File Details
              </legend>
              <div>
                <label htmlFor="file_details.type" className={labelClass}>
                  File Type
                </label>
                <select
                  id="file_details.type"
                  className={inputClass}
                  {...register("file_details.type")}
                  defaultValue="ZIP"
                >
                  <option value="ZIP">ZIP</option>
                  <option value="PDF">PDF</option>
                  <option value="MP4">MP4</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </fieldset>

            {/* --- Array Fields (Comma-separated) --- */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className={labelClass}>
                Tags (Comma separated)
              </label>
              <input
                id="tags"
                type="text"
                className={inputClass}
                placeholder="Marketing, Social Media, Content"
                {...register("tags")}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="whats_inside" className={labelClass}>
                What's Inside (Comma separated)
              </label>
              <input
                id="whats_inside"
                type="text"
                className={inputClass}
                placeholder="Daily lessons, Worksheets, Community"
                {...register("whats_inside")}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="usage_rights" className={labelClass}>
                Usage Rights (Comma separated)
              </label>
              <input
                id="usage_rights"
                type="text"
                className={inputClass}
                placeholder="Personal use, Team use, Cannot resell"
                {...register("usage_rights")}
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <input
                type="submit"
                value={loading ? "loading..." : "Create Book"}
                disabled={loading}
                className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 p-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddBook;
