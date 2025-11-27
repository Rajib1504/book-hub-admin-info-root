import React, { useEffect, useState } from "react";
import { HiPencil, HiTrash, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import TitleGenerate from "../hooks/TitleGenerate";
import axiosInstance from "../utils/Axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BookMannagement = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchBooks = async (currentPage) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/books?page=${currentPage}&limit=${limit}`);
      if (data.success) {
        setBooks(data.data);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosInstance.delete(`/books/${id}`);
          if (data.success) {
            Swal.fire("Deleted!", "Your book has been deleted.", "success");
            fetchBooks(page);
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete book.", "error");
        }
      }
    });
  };

  const onEditClick = (book) => {
    setEditingBook(book);
    
    setValue("title", book.title);
    setValue("subtitle", book.subtitle);
    setValue("category", book.category?.name || book.category);
    setValue("icon", book.icon);
    setValue("coverImage", book.coverImage);
    setValue("short_description", book.short_description || book.description);
    setValue("long_description", book.long_description);
    
    setValue("stats.pages", book.stats?.pages);
    setValue("stats.words", book.stats?.words);
    setValue("stats.size", book.stats?.size);
    
    setValue("file_details.type", book.file_details?.type);

    setValue("tags", book.tags?.join(", "));
    setValue("whats_inside", book.whats_inside?.join(", "));
    setValue("usage_rights", book.usage_rights?.join(", "));
    
    setIsEditOpen(true);
  };

  const onUpdateSubmit = async (formData) => {
    try {
      const updatedData = {
        ...formData,
        description: formData.short_description,
        
        stats: {
          pages: Number(formData.stats.pages),
          words: formData.stats.words,
          size: formData.stats.size,
        },
        file_details: {
          type: formData.file_details.type,
          size: formData.stats.size, 
        },
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        whats_inside: formData.whats_inside ? formData.whats_inside.split(",").map((t) => t.trim()) : [],
        usage_rights: formData.usage_rights ? formData.usage_rights.split(",").map((t) => t.trim()) : [],
      };

      const { data } = await axiosInstance.put(`/books/${editingBook._id}`, updatedData);

      if (data.success) {
        toast.success("Book updated successfully!");
        setIsEditOpen(false);
        fetchBooks(page);
        reset();
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update book");
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  if (loading && books.length === 0) {
    return <div className="flex h-screen items-center justify-center bg-gray-100"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="w-full bg-gray-100 p-4 min-h-screen">
      <TitleGenerate title={"Manage Books"} subtitle={"You can manage your books from here"} />

      {books.length === 0 && !loading ? (
        <div className="mt-10 text-center text-gray-500">No books found.</div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>File Size</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={book.coverImage} alt={book.title} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 max-w-[200px] truncate" title={book.title}>{book.title}</div>
                          <div className="text-sm opacity-50">{book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-ghost badge-sm">
                        {book.category?.name || book.category}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {book.tags?.slice(0, 2).map((tag, index) => (
                          <span key={index} className="badge badge-outline badge-xs text-blue-600 border-blue-200">{tag}</span>
                        ))}
                        {book.tags?.length > 2 && <span className="text-xs text-gray-400">+{book.tags.length - 2}</span>}
                      </div>
                    </td>
                    <td className="text-gray-700 font-medium">
                      {book.stats?.size || "N/A"}
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onEditClick(book)} 
                          className="btn btn-ghost btn-xs text-indigo-600 hover:bg-indigo-50"
                        >
                          <HiPencil className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(book._id)} 
                          className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {books.map((book) => (
              <div key={book._id} className="card bg-white shadow-md border border-gray-100">
                <div className="card-body p-4">
                  <div className="flex items-center gap-4">
                    <img className="h-16 w-16 rounded-lg object-cover border border-gray-200" src={book.coverImage} alt={book.title} />
                    <div className="overflow-hidden">
                      <h3 className="card-title text-base text-gray-900 truncate">{book.title}</h3>
                      <div className="badge badge-ghost badge-sm mt-1">
                        {book.category?.name || book.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center border-t border-gray-100 pt-3">
                    <span className="text-sm font-semibold text-gray-700">
                      {book.stats?.size}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => onEditClick(book)} className="btn btn-sm btn-square btn-ghost text-indigo-600">
                        <HiPencil className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-square btn-ghost text-red-600">
                        <HiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="join">
              <button 
                className="join-item btn bg-white text-gray-700 border-gray-300 hover:bg-gray-50" 
                onClick={handlePrevPage} 
                disabled={page === 1}
              >
                «
              </button>
              <button className="join-item btn bg-white text-gray-700 border-gray-300 no-animation">
                Page {page} of {totalPages}
              </button>
              <button 
                className="join-item btn bg-white text-gray-700 border-gray-300 hover:bg-gray-50" 
                onClick={handleNextPage} 
                disabled={page === totalPages}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}

      {isEditOpen && (
        <div className="modal modal-open modal-bottom sm:modal-middle">
          <div className="modal-box w-11/12 max-w-4xl bg-white text-gray-900">
            <h3 className="font-bold text-lg mb-6 text-center border-b pb-4">Edit Book Details</h3>
            
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="form-control w-full md:col-span-2">
                <label className="label"><span className="label-text text-gray-700">Title</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("title", { required: true })} />
              </div>

              <div className="form-control w-full md:col-span-2">
                <label className="label"><span className="label-text text-gray-700">Subtitle</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("subtitle")} />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-gray-700">Category</span></label>
                <select className="select select-bordered w-full bg-white border-gray-300 text-gray-800" {...register("category", { required: true })}>
                  <option value="E-Book">E-Book</option>
                  <option value="Video Course">Video Course</option>
                  <option value="E-Mail Course">E-Mail Course</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-gray-700">Icon</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("icon")} />
              </div>

              <div className="form-control w-full md:col-span-2">
                <label className="label"><span className="label-text text-gray-700">Cover Image URL</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("coverImage")} />
              </div>

              <div className="form-control w-full md:col-span-1">
                <label className="label"><span className="label-text text-gray-700">Short Description</span></label>
                <textarea className="textarea textarea-bordered h-24 bg-white border-gray-300 text-gray-800" {...register("short_description")} pla ></textarea>
              </div>

              <div className="form-control w-full md:col-span-1">
                <label className="label"><span className="label-text text-gray-700">Long Description</span></label>
                <textarea className="textarea textarea-bordered h-32 bg-white border-gray-300 text-gray-800" {...register("long_description")} ></textarea>
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-gray-700">Pages</span></label>
                <input type="number" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("stats.pages")} />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-gray-700">Words</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("stats.words")} />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-gray-700">Size</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("stats.size")} />
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text text-gray-700">File Type</span></label>
                <select className="select select-bordered w-full bg-white border-gray-300 text-gray-800" {...register("file_details.type")}>
                  <option value="ZIP">ZIP</option>
                  <option value="PDF">PDF</option>
                  <option value="MP4">MP4</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-control w-full md:col-span-2">
                <label className="label"><span className="label-text text-gray-700">Tags (Comma separated)</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("tags")} />
              </div>

              <div className="form-control w-full md:col-span-2">
                <label className="label"><span className="label-text text-gray-700">What's Inside (Comma separated)</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("whats_inside")} />
              </div>

              <div className="form-control w-full md:col-span-2">
                <label className="label"><span className="label-text text-gray-700">Usage Rights (Comma separated)</span></label>
                <input type="text" className="input input-bordered w-full bg-white border-gray-300 text-gray-800" {...register("usage_rights")} />
              </div>

              <div className="modal-action mt-6 md:col-span-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  className="btn btn-ghost text-gray-600" 
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn bg-blue-600 border-none hover:bg-blue-700 text-white px-8"
                >
                  Update Book
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsEditOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default BookMannagement;