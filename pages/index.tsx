import fs from "fs/promises";
import path from "path";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
interface HomeProps {
  products: { id: number; title: string }[];
}

function Home({ products }: HomeProps) {
  return (
    <ul>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          {product.title}
        </Link>
      ))}
    </ul>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  console.log("Re generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
