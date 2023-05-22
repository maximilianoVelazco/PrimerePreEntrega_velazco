export const validateProducts = (products) => {
    let isValid = true;
    if (!products.title || !products.description || !products.price || !products.stock || !products.category || !products.code || products.price <= 0) {
        isValid = false;
    }
    return isValid;
}
