import { GetStaticPropsContext } from "next";
import path from "path";
import fs from "fs/promises";

function ProductDetailPage({ loadedProduct }: any) {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return await JSON.parse(jsonData.toString());
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const productId = params?.pid;

  const data = await getData();
  const product = data.products.find(
    (product: any) => product.id === productId,
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const pathsWithParams = data.products.reduce(
    (acc: any, product: any) => [...acc, { params: { pid: product.id } }],
    [],
  );

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}

export default ProductDetailPage;
