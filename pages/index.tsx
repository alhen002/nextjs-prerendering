import fs from "fs/promises"
import path from "path";
interface HomeProps {
    products: {id: number, title: string}[]
}


 function Home({products}: HomeProps) {
  return (
    <ul>
        {products.map((product) => (
            <li key={product.id}>{product.title}</li>
            )
        )}
    </ul>
  );
}

export async function getStaticProps() {

    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

    const jsonData = await fs.readFile(filePath)
    const data = await JSON.parse(jsonData.toString())

    return {
        props: {
            products: data.products
        }
    }
}

 export default Home;