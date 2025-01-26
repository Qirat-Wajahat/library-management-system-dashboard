import React, { useState } from "react";
import "../styles/Table.css";

function Table({ data, setSearchTerm, addItem, updateItem, deleteItem, columns }) {
  const [newItem, setNewItem] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="table-section">
      <div className="container-fluid mb-3">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          className="form-control form-control-lg w-50"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Add Button */}
        <button
          className="add-product-btn bg-dark"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          <i className="bi bi-plus-circle me-1"></i> Add Item
        </button>
      </div>

      {/* Table */}
      <table className="table table-hover rounded">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {typeof col.accessor === "function"
                    ? col.accessor(item)
                    : item[col.accessor] || "N/A"}
                </td>
              ))}
              <td>
                <i
                  className="bi bi-pencil-fill h5 text-warning"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => setSelectedItem(item)}
                ></i>
              </td>
              <td>
                <i
                  className="bi bi-trash-fill h5 text-danger"
                  role="button"
                  onClick={() => deleteItem(item.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Item</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Heading"
                className="form-control mb-2"
                onChange={(e) =>
                  setNewItem({ ...newItem, Heading: e.target.value }) // Fixed key
                }
              />
              <input
                type="text"
                placeholder="Paragraph"
                className="form-control mb-2"
                onChange={(e) =>
                  setNewItem({ ...newItem, Paragraph: e.target.value }) // Fixed key
                }
              />
              <input
                type="text"
                placeholder="Optional Paragraph"
                className="form-control mb-2"
                onChange={(e) =>
                  setNewItem({ ...newItem, optionalParagraph: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="form-control mb-2"
                onChange={(e) =>
                  setNewItem({ ...newItem, imageURL: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                className="add-product-btn bg-dark"
                onClick={() => addItem(newItem)}
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedItem && (
        <div className="modal fade" id="editModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Heading"
                  className="form-control mb-2"
                  value={selectedItem.Heading || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, Heading: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Paragraph"
                  className="form-control mb-2"
                  value={selectedItem.Paragraph || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      Paragraph: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Optional Paragraph"
                  className="form-control mb-2"
                  value={selectedItem.optionalParagraph || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      optionalParagraph: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="form-control mb-2"
                  value={selectedItem.imageURL || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      imageURL: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="add-product-btn bg-dark"
                  onClick={() => updateItem(selectedItem)}
                  data-bs-dismiss="modal"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Table;
