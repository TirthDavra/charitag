export interface IShopQueryPrams {
  sorting?: string;
  product?: string;
  deal?: string;
  category?: string; // Either a string or an object
  price?: string;
  min_price?: string;
  max_price?: string;
  rating?: string;
  m_search?: string;
  page?: string;
  merchant?: string;
}
