import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/services/api/products";
import { Link } from "react-router-dom";

function ProductPage() {
  const { data } = useGetAllProductsQuery();
  console.log({ data });

  return (
    <div>
      <div className="flex p-2">
        <div className="flex-1"></div>
        <Link to={"/addProduct"}>
          <Button>
            <span>Add Product</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;
