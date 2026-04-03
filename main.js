var app = new Vue({
    el: "#app",
    data: {
        products: [
            { id: 1, title: "TAG 2000 (TAG 710)", short_text: "Onion Yellow Bunching", image: "onion-1.jpg", desc: "Strong vigor, good leaf coverage, early matured." },
            { id: 2, title: "TAG 1001 (TAG 855)", short_text: "Onion Yellow Standard", image: "onion-2.jpg", desc: "High productivity, excellent fruit setting." },
            { id: 3, title: "TAG 1002 (TAG 809)", short_text: "Onion Red Standard", image: "onion-3.jpg", desc: "Attractive deep red color with excellent skin retention." },
            { id: 4, title: "TAG 1003 (TAG 834)", short_text: "Onion Dark Red", image: "onion-4.jpg", desc: "Dark red hybrid, perfect for salads." },
            { id: 5, title: "TAG 1004 (TAG 848)", short_text: "Onion Shallot Type", image: "onion-5.jpg", desc: "Brown elongated bulbs with high dry matter." }
        ],
        product: {},    
        btnVisible: 0,  
        cart: []        
    },
    computed: {
        cartItemsText: function() {
            var storageCart = window.localStorage.getItem('cart');
            if (!storageCart) return "Your cart is empty";
            
            var ids = storageCart.split(',');
            var names = this.products
                .filter(p => ids.includes(String(p.id)))
                .map(p => p.title);
            
            return "I am interested in: " + names.join(', ');
        }
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart();
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
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            
            if (cart.indexOf(String(id)) === -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible = 1;
                alert("Product added to cart!");
            }
        },
        
        checkInCart: function() {
            if (window.localStorage.getItem('cart') && this.product.id) {
                var cart = window.localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.product.id)) !== -1) {
                    this.btnVisible = 1;
                } else {
                    this.btnVisible = 0;
                }
            }
        }
    }
});
