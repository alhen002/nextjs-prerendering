import React, { useEffect, useState } from "react";
import useSWR from "swr";
interface PageProps {
  sales: {
    id: string;
    username: string;
    volume: number;
  }[];
}

function LastSales(props: PageProps) {
  /*const [data, setData] = useState<
    { id: string; username: string; volume: number }[]
  >([]);
  const [loading, setLoading] = useState(false);*/

  const fetcher = (url: string) =>
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const transformedData = [];
        for (const key in d) {
          transformedData.push({
            id: key,
            username: d[key].username,
            volume: d[key].volume,
          });
        }
        return transformedData;
      });

  const { data, error, isLoading } = useSWR(
    "https://nextjs-course-28a64-default-rtdb.firebaseio.com/sales.json",
    fetcher,
    { fallbackData: props.sales },
  );

  /*useEffect(() => {
    setLoading(true);
    fetch("https://nextjs-course-28a64-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = [];

        for (const key in data) {
          transformedData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setData(transformedData);
        setLoading(false);
      });
  }, []);*/

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {data?.map((sale: any) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-28a64-default-rtdb.firebaseio.com/sales.json",
  );
  const data = await response.json();

  const transformedData = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformedData,
    },
  };
}

export default LastSales;
