import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                console.log(json)
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function getAllProducts() {
    return request({
        url: API_BASE_URL + "/product/all",
        method: 'GET'
    });
}
export function getAllProductsBySubCategory(id) {
    return request({
        url: API_BASE_URL + "/product/subcategory/"+id,
        method: 'GET'
    });
}
export function getAllOrders() {
    return request({
        url: API_BASE_URL + "/orders/all",
        method: 'GET'
    });
}
export function getAllCategories() {
    return request({
        url: API_BASE_URL + "/category/all",
        method: 'GET'
    });
}
export function getAllSubCategories(id) {
    return request({
        url: API_BASE_URL + "/subcategory/all/"+id,
        method: 'GET'
    });
}
export function createProduct(productData) {
    return request({
        url: API_BASE_URL + "/product",
        method: 'POST',
        body: JSON.stringify(productData)         
    });
}
export function checkout(checkoutData) {
    return request({
        url: API_BASE_URL + "/order",
        method: 'POST',
        body: JSON.stringify(checkoutData)         
    });
}
export function addToCart(cartdata) {
    return request({
        url: API_BASE_URL + "/cart",
        method: 'POST',
        body: JSON.stringify(cartdata)         
    });
}
export function deleteCartItem(userId,id) {
    return request({
        url: API_BASE_URL + "/cartitem/"+userId+"/" + id,
        method: 'DELETE'
    });
}
export function getAllCartItems(id) {
    return request({
        url: API_BASE_URL + "/cartitems/all/"+id,
        method: 'GET'
    });
}
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function getProductDetails(id) {
    return request({
        url: API_BASE_URL + "/product/" + id,
        method: 'GET'
    });
}

export function deleteProduct(id) {
    return request({
        url: API_BASE_URL + "/product/" + id,
        method: 'DELETE'
    });
}
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}
