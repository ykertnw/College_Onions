var app = new Vue({
    el: "#app",
    data: {
        products: [
            { id: 1, title: "TAG 2000 (TAG 710)", short_text: "Onion Yellow Bunching", image: "onion-1.jpg", desc: "Strong vigor, good leaf coverage, early matured." },
            { id: 2, title: "TAG 1001 (TAG 855)", short_text: "Onion Yellow Standard", image: "onion-2.jpg", desc: "High productivity, excellent fruit setting." },
            { id: 3, title: "TAG 1002 (TAG 809)", short_text: "Onion Red Standard", image: "onion-3.jpg", desc: "Attractive deep red color." },
            { id: 4, title: "TAG 1003 (TAG 834)", short_text: "Onion Dark Red", image: "onion-4.jpg", desc: "Dark red hybrid, perfect for salads." },
            { id: 5, title: "TAG 1004 (TAG 848)", short_text: "Onion Shallot Type", image: "onion-5.jpg", desc: "Brown elongated bulbs." }
        ],
        product: {},    
        btnVisible: 0,
        cart: [],             
        contactFields: {},    
        orderMade: false      
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart();
        this.getCart(); 
    },
    methods: {
        getProduct: function() {
            var hashId = window.location.hash.replace('#', '');
            if (hashId) {
                var found = this.products.find(p => p.id == hashId);
                if (found) this.product = found;
            }
        },
        addToCart: function(id) {
            var cartIds = [];
            if (localStorage.getItem('cart')) {
                cartIds = localStorage.getItem('cart').split(',');
            }
            if (cartIds.indexOf(String(id)) === -1) {
                cartIds.push(id);
                localStorage.setItem('cart', cartIds.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function() {
            if (localStorage.getItem('cart') && this.product.id) {
                var cartIds = localStorage.getItem('cart').split(',');
                this.btnVisible = cartIds.indexOf(String(this.product.id)) !== -1 ? 1 : 0;
            }
        },


        getCart: function() {
            if (localStorage.getItem('cart')) {
                var cartIds = localStorage.getItem('cart').split(',');
                this.cart = this.products.filter(p => cartIds.indexOf(String(p.id)) !== -1);
            }
        },

        removeFromCart: function(id) {
            this.cart = this.cart.filter(p => p.id !== id);
            var cartIds = this.cart.map(p => p.id);
            if (cartIds.length > 0) {
                localStorage.setItem('cart', cartIds.join());
            } else {
                localStorage.removeItem('cart');
            }
        },

        makeOrder: function() {
            this.orderMade = true;
            
            this.cart = [];
            localStorage.removeItem('cart');
            
            alert("Order placed successfully!");
        }
    }
});
