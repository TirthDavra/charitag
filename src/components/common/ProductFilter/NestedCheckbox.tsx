"use client";
import React, { useState } from "react";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CheckedItems {
  [key: string]: boolean;
}

interface Props {
  categories: Category[];
}

const NestedCheckboxList: React.FC<Props> = ({ categories }) => {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set(),
  );
  const [displayedCategories, setDisplayedCategories] = useState<number>(5);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: number,
  ) => {
    const isChecked = event.target.checked;
    let updatedCheckedItems: CheckedItems = { ...checkedItems };

    if (isChecked) {
      categories.forEach((category) => {
        if (category.id === categoryId) {
          updatedCheckedItems[category.id.toString()] = true;
          category.subcategories.forEach((subcategory) => {
            updatedCheckedItems[subcategory.id.toString()] = true;
          });
        }
      });
    } else {
      categories.forEach((category) => {
        if (category.id === categoryId) {
          updatedCheckedItems[category.id.toString()] = false;
          category.subcategories.forEach((subcategory) => {
            updatedCheckedItems[subcategory.id.toString()] = false;
          });
        }
      });
    }

    setCheckedItems(updatedCheckedItems);
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: number,
    subcategoryId: number,
  ) => {
    const isChecked = event.target.checked;
    let updatedCheckedItems: CheckedItems = { ...checkedItems };
    updatedCheckedItems[subcategoryId.toString()] = isChecked;

    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      const allSubcategoriesChecked = category.subcategories.every(
        (subcategory) => updatedCheckedItems[subcategory.id.toString()],
      );
      updatedCheckedItems[categoryId.toString()] = allSubcategoriesChecked;
    }

    setCheckedItems(updatedCheckedItems);
  };

  const handleCategoryToggle = (categoryId: number) => {
    setExpandedCategories((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(categoryId)) {
        newExpanded.delete(categoryId);
      } else {
        newExpanded.add(categoryId);
      }
      return newExpanded;
    });
  };

  const handleShowMore = () => {
    setDisplayedCategories((prevDisplayed) => prevDisplayed + 5);
  };

  return (
    <ul className="category-list">
      {categories.slice(0, displayedCategories).map((category) => (
        <li key={category.id} className="category-item">
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => handleCategoryToggle(category.id)}
          >
            <input
              type="checkbox"
              checked={checkedItems[category.id.toString()] || false}
              onChange={(event) => handleCheckboxChange(event, category.id)}
            />
            <label style={{ cursor: "pointer", marginLeft: "5px" }}>
              {category.name}
            </label>
          </div>
          {expandedCategories.has(category.id) && category.subcategories && (
            <ul className="subcategory-list">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id} className="subcategory-item">
                  <input
                    type="checkbox"
                    checked={checkedItems[subcategory.id.toString()] || false}
                    onChange={(event) =>
                      handleSubcategoryChange(
                        event,
                        category.id,
                        subcategory.id,
                      )
                    }
                  />
                  <label>{subcategory.name}</label>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      {categories.length > displayedCategories && (
        <li className="show-more">
          <button onClick={handleShowMore}>Show More</button>
        </li>
      )}
    </ul>
  );
};

export default NestedCheckboxList;
