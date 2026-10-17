
const brands = ["NIKE", "adidas", "Levi's®", "TOMMY HILFIGER", "ZARA", "H&M"];

export default function CarruselMarcas() {
  return (
    <section className="brands" id="marcas">
      <div className="brands__intro">
        <p className="eyebrow"><span /> Solo lo mejor</p>
        <h2>Marcas que <em>conoces</em></h2>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {[...brands, ...brands].map((brand, index) => (
            <span className={`brand brand--${index % brands.length}`} key={`${brand}-${index}`}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}





