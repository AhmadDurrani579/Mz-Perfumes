// src/components/VariantPicker.jsx

export default function VariantPicker({ sizeOptions = [], value = [], onChange }) {
  function isSelected(sizeId) {
    return value.some((v) => v.variant_size_id === sizeId);
  }

  function toggleSize(size) {
    if (isSelected(size.id)) {
      onChange(value.filter((v) => v.variant_size_id !== size.id));
    } else {
      onChange([
        ...value,
        {
          variant_size_id: size.id,
          price: size.price ?? "",
          stock_quantity: "",
        },
      ]);
    }
  }

  function updateVariant(sizeId, key, newValue) {
    onChange(
      value.map((v) =>
        v.variant_size_id === sizeId ? { ...v, [key]: newValue } : v
      )
    );
  }

  return (
    <div className="variant-picker">
      {sizeOptions.map((size) => {
        const selected = value.find((v) => v.variant_size_id === size.id);

        return (
          <div key={size.id} className="variant-picker__row">
            <button
              type="button"
              className={`chip ${selected ? "chip--active" : ""}`}
              onClick={() => toggleSize(size)}
            >
              {size.label}
            </button>

            {selected && (
              <>
                <input
                  type="number"
                  placeholder="Price"
                  value={selected.price}
                  onChange={(e) =>
                    updateVariant(size.id, "price", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={selected.stock_quantity}
                  onChange={(e) =>
                    updateVariant(size.id, "stock_quantity", e.target.value)
                  }
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}