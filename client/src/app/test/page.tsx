import Bubbles from "@/components/bubble";

export const dynamic = "force-dynamic";

async function getCoins() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/" +
      "coins/markets?" +
      "vs_currency=usd" +
      "&order=market_cap_desc" +
      "&per_page=25" +
      `&page=${1}` +
      "&sparkline=true" +
      "&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y" +
      "&locale=en" +
      `&x_cg_demo_api_key=CG-FhgpMP8NqfuKiBmSibfkK8mv`,
  );

  const data = await response.json();

  return data;
}

export default async function Main() {
  const coins = await getCoins();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <section className="size-[800px]">
        <Bubbles coins={coins} />
      </section>
    </div>
  );
}
