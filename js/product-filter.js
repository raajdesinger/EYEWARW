
document.addEventListener("DOMContentLoaded", function () {

    const products = [...document.querySelectorAll(".product-item")];
    const filters = document.querySelectorAll(".filter-option");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const sortProducts = document.getElementById("sortProducts");
    const productCount = document.getElementById("productCount");
    const noProducts = document.getElementById("noProducts");
    const clearFilters = document.getElementById("clearFilters");
    const productList = document.getElementById("productList");

    function applyFilters() {

        let visibleProducts = [];

        products.forEach(product => {

            let show = true;

            // PRICE FILTER
            let price = Number(product.dataset.price);

            if (price > Number(priceRange.value)) {
                show = false;
            }

            // CATEGORY AND OTHER FILTERS
            const groups = [
                "category", "gender", "shape",
                "material", "color", "lens",
                "brand", "rating", "stock", "discount"
            ];

            groups.forEach(group => {

                const selected = [...document.querySelectorAll(
                    `.filter-option[data-group="${group}"]:checked`
                )].map(input => input.value);

                if (selected.length === 0) return;

                const value = product.dataset[group];

                let matched = false;

                if (group === "rating") {
                    matched = selected.some(v => Number(value) >= Number(v));
                }
                else if (group === "discount") {
                    matched = selected.some(v => Number(value) >= Number(v));
                }
                else {
                    matched = selected.some(v =>
                        value.split(",").includes(v)
                    );
                }

                if (!matched) show = false;

            });

            product.style.display = show ? "" : "none";

            if (show) visibleProducts.push(product);

        });

        // PRODUCT COUNT
        productCount.textContent = visibleProducts.length;

        // NO PRODUCT MESSAGE
        noProducts.style.display =
            visibleProducts.length === 0 ? "block" : "none";

        // SORT PRODUCTS
        const sortValue = sortProducts.value;

        visibleProducts.sort((a, b) => {

            const priceA = Number(a.dataset.price);
            const priceB = Number(b.dataset.price);

            const ratingA = Number(a.dataset.rating);
            const ratingB = Number(b.dataset.rating);

            const discountA = Number(a.dataset.discount);
            const discountB = Number(b.dataset.discount);

            if (sortValue === "low") return priceA - priceB;
            if (sortValue === "high") return priceB - priceA;
            if (sortValue === "rating") return ratingB - ratingA;
            if (sortValue === "discount") return discountB - discountA;

            return products.indexOf(a) - products.indexOf(b);
        });

        visibleProducts.forEach(product => {
            productList.appendChild(product);
        });

    }

    // FILTER CHANGE
    filters.forEach(filter => {
        filter.addEventListener("change", applyFilters);
    });

    // PRICE RANGE
    priceRange.addEventListener("input", function () {
        priceValue.textContent =
            "₹" + Number(this.value).toLocaleString("en-IN");

        applyFilters();
    });

    // SORT
    sortProducts.addEventListener("change", applyFilters);

    // CLEAR ALL FILTERS
    clearFilters.addEventListener("click", function () {

        filters.forEach(filter => {
            filter.checked = false;
        });

        priceRange.value = 10000;

        priceValue.textContent = "₹10,000";

        sortProducts.value = "default";

        applyFilters();

    });

    // INITIAL LOAD
    applyFilters();

});
