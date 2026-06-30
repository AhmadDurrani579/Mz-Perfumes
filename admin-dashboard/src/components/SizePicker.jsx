// src/components/SizePicker.jsx
//
// Shows every size+price from the Variants master list as a checkbox.
// Check a size to make this product available in it. Price is fixed —
// it always comes from the Variants page, never typed here. Only Stock
// is set per product, since inventory genuinely differs per product.
//
// onPick(size) fires whenever a size is checked (not unchecked) — used
// by ModalForm to auto-fill another field (e.g. "Actual Price") with
// whichever size was just clicked.
export default function SizePicker({ sizeOptions, value, onChange, onPick }) {
  const selected = value || [];

  function findRow(variantId) {
    return selected.find((v) => String(v.variant_size_id) === String(variantId));
  }
  
  function toggle(variant, checked) {
    if (checked) {
      onChange([...selected, { variant_size_id: variant.id, price: variant.price ?? 0, stock_quantity: "" }]);
      if (onPick) onPick(variant);
    } else {
      onChange(selected.filter((v) => String(v.variant_size_id) !== String(variant.id)));
    }
  }

  function updateStock(variantId, val) {
    onChange(
      selected.map((v) =>
          String(v.variant_size_id) === String(variantId)
            ? { ...v, stock_quantity: val }
            : v
        )
    );
  }

  if (!sizeOptions || sizeOptions.length === 0) {
    return (
      <p className="variants-field__empty">
        No sizes defined yet — add some on the Variants page first (e.g. 10ml
        Tester, 30ml, 50ml, each with its price), then come back here to
        select them.
      </p>
    );
  }

  return (
    <div className="variants-field">
      <div className="variants-field__rows">
        <div className="variants-field__row variants-field__row--picker variants-field__row--header">
          <span />
          <span>Size</span>
          <span>Price</span>
          <span>Stock</span>
        </div>
        {sizeOptions.map((variant) => {
          const row = findRow(variant.id);
          const checked = !!row;
          return (
            <div
              className="variants-field__row variants-field__row--picker"
              key={variant.id}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => toggle(variant, e.target.checked)}
              />
              <span className="variants-field__size-label">{variant.label}</span>
              <span className="variants-field__price-display">
                PKR {variant.price ?? 0}
              </span>
              <input
                type="number"
                placeholder="Stock"
                disabled={!checked}
                value={row?.stock_quantity ?? ""}
                onChange={(e) => updateStock(variant.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}