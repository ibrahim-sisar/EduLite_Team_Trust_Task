const ItemList = ({ items, setEditing, deleteItem }) => {
  return (
    <div className="max-w-4xl mx-auto overflow-x-auto shadow rounded bg-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-100 text-black">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => setEditing(item)}>
                  <span className="text-yellow-600">✏️</span>
                </button>
                <button onClick={() => deleteItem(item.id)}>
                  <span className="text-red-600">🗑️</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
