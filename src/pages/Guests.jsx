import { Link } from "react-router-dom";

export default function Guests() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-pink-50 py-24 px-10 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to VelvetNova Boutique
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Discover elegant fashion collections and exclusive member benefits.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/products"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Shop Now
          </Link>

          <Link
            to="/membership"
            className="border border-black px-6 py-3 rounded-lg"
          >
            Become Member
          </Link>
        </div>
      </section>

      {/* Feature */}
      <section className="py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="shadow rounded-xl p-6">
            <h3 className="font-bold text-xl mb-3">
              Premium Quality
            </h3>

            <p>
              High quality boutique products selected exclusively.
            </p>
          </div>

          <div className="shadow rounded-xl p-6">
            <h3 className="font-bold text-xl mb-3">
              Fast Delivery
            </h3>

            <p>
              Secure and fast delivery service.
            </p>
          </div>

          <div className="shadow rounded-xl p-6">
            <h3 className="font-bold text-xl mb-3">
              Member Benefits
            </h3>

            <p>
              Discounts and special promotions for members.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-gray-50 py-20 px-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white shadow rounded-xl p-5"
            >
              <div className="h-52 bg-gray-200 rounded mb-4"></div>

              <h3 className="font-semibold">
                Product {item}
              </h3>

              <p className="text-gray-500">
                Luxury Collection
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}