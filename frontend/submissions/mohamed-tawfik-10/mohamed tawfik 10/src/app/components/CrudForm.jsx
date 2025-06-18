import { useEffect, useState } from "react";

const CrudForm = ({ editItem, onSave, onDone }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: editItem.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[1000]">
      <div className="bg-[#2b3549] text-white p-6 rounded-lg w-full max-w-sm shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            {editItem?.id ? "Edit Book" : "Create New Book"}
          </h2>
          <button
            onClick={onDone}
            className="text-gray-300 text-xl hover:text-white focus:outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Book Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Book Name"
              className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Book Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write book description here"
              className="w-full px-3 py-2 rounded border border-gray-600 bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-3xs bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-semibold transition duration-150"
          >
            {editItem?.id ? "Save Changes" : "Add new Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
