import {GetStaticPropsContext} from "next";
import path from "path";
import fs from "fs/promises";

function ProductDetailPage({loadedProduct} : any) {

    return <>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </>
}


export async function getStaticProps(context: GetStaticPropsContext) {
    const {params} = context;
    const productId = params?.pid

    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath)
    const data = await JSON.parse(jsonData.toString())

    const product = data.products.find((product:any) => product.id === productId)


    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: { pid: "p1"}},
            {params: { pid: "p2"}},
            {params: { pid: "p3"}},
            {params: { pid: "p4"}}
        ],
        fallback: false
    }
}

export default ProductDetailPage