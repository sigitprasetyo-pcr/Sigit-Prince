import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import products from "../data/Products";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(keyword) ||
      product.code.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword)
    );
  });

  const firstProduct = filteredProducts[0];

  return (
    <section className="min-h-[calc(100vh-54px)] bg-[#F7F5F2] px-8 py-6">
      <PageHeader
        breadcrumb="Hejmana / Product List"
        title="Products"
        description="Kelola koleksi produk boutique, stok, harga, dan kategori."
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            placeholder="Cari produk..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="h-[34px] rounded-[10px] border border-[#E7E0D8] bg-white px-4 text-[11px] text-[#3A2619] transition hover:border-[#C7A765] hover:text-[#C7A765]"
              >
                Lihat Ringkasan
              </button>
            </DialogTrigger>

            <DialogContent className="rounded-[18px] border-[#E7E0D8] bg-white sm:max-w-[460px]">
              <DialogHeader>
                <DialogTitle className="font-serif text-[22px] font-normal text-[#2D2723]">
                  Ringkasan Produk
                </DialogTitle>

                <DialogDescription className="text-[12px] leading-relaxed text-[#7C7772]">
                  Ringkasan koleksi produk boutique berdasarkan data yang tampil
                  saat ini.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 rounded-[14px] border border-[#EEE7DF] bg-[#FAF9F7] p-5">
                {firstProduct ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#A58E7B]">
                        Produk Teratas
                      </p>

                      <h3 className="mt-1 font-serif text-[20px] text-[#2D2723]">
                        {firstProduct.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[12px]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58E7B]">
                          Kode
                        </p>
                        <p className="mt-1 text-[#4F4740]">
                          {firstProduct.code}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58E7B]">
                          Brand
                        </p>
                        <p className="mt-1 text-[#4F4740]">
                          {firstProduct.brand}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58E7B]">
                          Kategori
                        </p>
                        <p className="mt-1 text-[#4F4740]">
                          {firstProduct.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#A58E7B]">
                          Total Data
                        </p>
                        <p className="mt-1 text-[#4F4740]">
                          {filteredProducts.length} produk
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[13px] text-[#7C7772]">
                    Tidak ada produk yang sesuai dengan pencarian.
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>

      <ProductTable products={filteredProducts} />
    </section>
  );
}